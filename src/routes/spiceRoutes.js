const express = require('express');
const multer = require('multer');
const { predict } = require('../controller/PredictionController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './upload');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${+new Date()}}`;
    cb(null, `image-${uniqueName}.${file.originalname}`);
  },
});

const upload = multer({
  storage,
});

const spiceRouter = express.Router();

spiceRouter.route('/spice')
  .post(upload.single('spice'), predict);

module.exports = spiceRouter;
