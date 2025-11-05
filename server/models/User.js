const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  provider: {
    type: String,
    required: true,
  },
  providerId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a compound index to ensure providerId is unique per provider
UserSchema.index({ provider: 1, providerId: 1 }, { unique: true });

module.exports = mongoose.model('User', UserSchema);