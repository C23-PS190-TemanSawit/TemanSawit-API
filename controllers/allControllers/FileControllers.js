import processFile from '../../middleware/image.js';
import { format } from 'util';
import gcs from '../../config/gcs.js';
import model from '../../models/index.js';

const controller = {};
const storage = gcs;
const bucketName = 'teman-sawit-tes';
const bucket = storage.bucket(bucketName);

controller.uploadFile = async (req, res) => {
  const userId = req.userId;
  let { newImage } = req.body;
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
      newImage = publicUrl
      res.status(200).send({
        message: 'Uploaded the file successfully: ' + req.file.originalname,
        url: publicUrl,
      });
    });

    await model.Users.update(
      { image: newImage },
      {
        where: {
          userId: userId,
        },
      }
    );

    blobStream.end(req.file.buffer);
  } catch (err) {
    if (err.code == 'LIMIT_FILE_SIZE') {
      return res.status(500).send({
        message: 'File tidak dapat lebih besar 5MB!',
      });
    }
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

controller.getListFiles = async (req, res) => {
  try {
    const [files] = await bucket.getFiles();
    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file.name,
        url: file.metadata.mediaLink,
      });
    });
    res.status(200).send(fileInfos);
  } catch (err) {
    console.log(err);

    res.status(500).send({
      message: 'Unable to read list of files!',
    });
  }
};

export default controller;
