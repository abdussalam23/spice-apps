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
  0: 'White Papper',
  1: 'Turmeric',
  2: 'Star Anise',
  3: 'Rosemary',
  4: 'Garlic',
  5: 'Cinnamon',
  6: 'Chilli',
  7: 'Candlenut',
  8: 'Black Pepper',
  9: 'Baby Leaves',
};

const { createCanvas, loadImage } = require('canvas');
const PredictionService = require('../services/PredictionService');

const predict = async (req, res) => {
  const predictionService = new PredictionService();
  const canvas = createCanvas(224, 224);
  const ctx = canvas.getContext('2d');
  const image = await loadImage(req.file.path);
  console.log(image.width, image.height);
  ctx.drawImage(image, (canvas.width - 244) / 2, (canvas.height - 244) / 2, 224, 224);
  const tensorImage = predictionService.imageToTensor(canvas);

  const result = await predictionService.predictImage(tensorImage);
  const mapToExpectedValue = Array.from(result).map((value, i) => ({
    probability: value,
    className: TARGET_CLASSES[i],
  }));
  const largestProbability = predictionService.findLargestIndex(mapToExpectedValue);

  res.status(200).json({
    image: req.file,
    result: largestProbability,
  });
};

module.exports = {
  predict,
};
