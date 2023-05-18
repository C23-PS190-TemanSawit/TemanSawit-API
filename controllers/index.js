import access from './allControllers/Login.js';
import register from './allControllers/Register.js';
import user from './allControllers/Users.js';
import token from './allControllers/refreshToken.js';
const controller = {};

controller.access = access;
controller.reg = register;
controller.user = user;
controller.token = token;
export default controller;
