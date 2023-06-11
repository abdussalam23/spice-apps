/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
/**
Black Pepper
Candlenut
Chili
Cinnamon
Garlic
Rosemary
Star Anise
Turmeric
White Pepper
*/

const TARGET_CLASSES = {
  0: 'Bay Leaves',
  1: 'Black Pepper',
  2: 'Candlenut',
  3: 'Cardamom',
  4: 'Cinnamon',
  5: 'Coriander',
  6: 'Garlic',
  7: 'Gojiberry',
  8: 'Star Anise',
  9: 'Turmeric',
};

const { createCanvas, loadImage } = require('canvas');
const PredictionService = require('../services/PredictionService');

const predict = async (req, res) => {
  const predictionService = new PredictionService();
  const canvas = createCanvas(224, 224);
  const ctx = canvas.getContext('2d');

  // Load image
  const image = await loadImage(req.file.path);

  // Resize image to target size
  ctx.drawImage(image, 0, 0, 224, 224);

  // Get image data from canvas
  const imageData = ctx.getImageData(0, 0, 224, 224);

  // Mengirimkan tensor gambar ke fungsi imageToTensor
  const imageToPredict = predictionService.imageToTensor(imageData);

  const result = await predictionService.predictImage(imageToPredict);
  console.log(result);
  const mapToExpectedValue = Array.from(result).map((value, i) => ({
    probability: value,
    className: TARGET_CLASSES[i],
  }));
  const largestProbability = predictionService.findLargestIndex(mapToExpectedValue);
  console.log(largestProbability);

  res.status(200).json({
    image: req.file,
    result: largestProbability,
  });
};

module.exports = {
  predict,
};
