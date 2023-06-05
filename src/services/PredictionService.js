/* eslint-disable class-methods-use-this */
const tfjs = require('@tensorflow/tfjs');

class PredictionService {
  constructor(model) {
    if (typeof PredictionService.instance === 'object') {
      return PredictionService.instance;
    }
    this._model = model;
    PredictionService.instance = this;
  }

  imageToTensor(image) {
    const tensorImage = tfjs.browser.fromPixels(image).toFloat().div(255.0).expandDims();
    return tensorImage;
  }

  async predictImage(image) {
    const result = await this._model.predict(image);
    return result.data();
  }

  findLargestIndex(arr) {
    const largestProbability = arr.sort((a, b) => b.probability - a.probability);
    return largestProbability[0];
  }
}

module.exports = PredictionService;
