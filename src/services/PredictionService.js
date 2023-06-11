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

  imageToTensor(imageData) {
    const tensorImage = tfjs.tensor3d(imageData.data, [224, 224, 4], 'float32');
    console.log(imageData.data);
    const normalizedTensorImage = tensorImage.slice([0, 0, 0], [224, 224, 3]).div(tfjs.scalar(255));

    // Mengubah dimensi tensor menjadi bentuk yang sesuai dengan input model
    const reshapedTensorImage = normalizedTensorImage.expandDims();

    return reshapedTensorImage;
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
