'use strict'

const mongoose = require('mongoose');
const dbLib = require('./db')

// Define the User schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    mbti: { type: String, required: true },
    enneagram: { type: String, required: true },
    variant: { type: String, required: true },
    tritype: { type: Number, required: true },
    socionics: { type: String, required: true },
    sloan: { type: String, required: true },
    psyche: { type: String, required: true },
    image: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

// Create the User model
const User = mongoose.model('User', userSchema);

const voteSchema = new mongoose.Schema({
    text: { type: String, required: true },
    mbti: { type: String, required: true },
    enneagram: { type: String, required: true },
    zodiac: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    voter_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Vote = mongoose.model('Vote', voteSchema);

async function connectModel() {
    // Connect to MongoDB
    await mongoose.connect(dbLib.getDB(), { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.set('debug', true);
}

const _exports = {
    user: User,
    vote: Vote,
    connectModel: connectModel,
}

module.exports = _exports;