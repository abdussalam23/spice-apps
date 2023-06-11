const express = require('express');
const spiceRouter = require('./routes/spiceRoutes');
require('dotenv').config();
const PredictionService = require('./services/PredictionService');
const tfjs = require('@tensorflow/tfjs');

const main = async () => {
  const app = express();
  const model = await tfjs.loadLayersModel('https://storage.googleapis.com/masaala-stream-bq/masaala-model/tfjs/model.json');
  const predictionService = new PredictionService(model);
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use('/image', express.static('./upload'));
  app.use(spiceRouter);

  const port = Number(process.env.SERVER_PORT) || 8080;
  app.listen(port, () => {
    console.log(`serve
    r running on ${port}`);
  });
};
main();
