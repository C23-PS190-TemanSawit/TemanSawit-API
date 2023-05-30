import processFile from '../../middleware/image.js';
import { format } from 'util';
import gcs from '../../config/gcs.js';
import model from '../../models/index.js';

const controller = {};
const storage = gcs;
const bucketName = 'testing-bucket-00';
const bucket = storage.bucket(bucketName);

controller.uploadFile = async (req, res) => {
  const userId = req.userId;
  try {
    await model.Users.findOne({
      id: userId,
    });
    await processFile(req, res);
    // Create a new blob in the bucket and upload the file data.
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on('error', (err) => {
      res.status(500).send({ message: err.message });
    });

    blobStream.on('finish', async (data) => {
      // Create URL for directly file access via HTTP.
      const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
      await model.Users.update(
        { image: publicUrl },
        {
          where: {
            userId: userId,
          },
        }
      );
      res.status(200).send({
        message: 'File berhasil diupload ' + req.file.originalname,
        url: publicUrl,
      });
    });

    blobStream.end(req.file.buffer);
  } catch (err) {
    if (err.code == 'LIMIT_FILE_SIZE') {
      return res.status(500).send({
        message: 'File tidak dapat lebih besar 5MB!',
      });
    }
    res.status(500).send({
      message: `Tidak dapat mengupload file: ${req.file.originalname}. ${err}`,
    });
  }
};

// Get user profile image from databases
controller.getUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const profileImage = req.body.image;
    const img = await model.Users.findOne({
      image: profileImage,
      attributes: ['userId', 'username', 'email','image'],
      where: {
        userId: userId,
      },
    });
    res.status(200).json(img);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'File tidak ditemukan',
    });
  }
};

export default controller;
