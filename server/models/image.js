const mongoose = require('mongoose');

// Define the schema for the image collection
const imageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  size: { type: Number, required: true },
  mimeType: { type: String, required: true },
  data: { type: Buffer, required: true },
});

// Create a model for the image collection
const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
