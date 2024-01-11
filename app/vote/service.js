'use strict';

const model = require('../../engine/model')
const mongoose = require('mongoose');

const createVote = async (voter_id, text, user_id, zodiac, enneagram, mbti) => {
    const vote = new model.vote({
        text: text,
        user_id: new mongoose.Types.ObjectId(user_id),
        voter_id: new mongoose.Types.ObjectId(voter_id),
        zodiac: zodiac,
        enneagram: enneagram,
        mbti: mbti,
    });

    try {
        const u = await vote.save();
        return u
    } catch (error) {
        throw error
    }
}

const getVotes = async (user_id) => {
    const data = await model.vote.find({user_id: new mongoose.Types.ObjectId(user_id)});

    return data
}

const likeVote = async(actor_id, vote_id) => {
    const vote = await model.vote.findById(vote_id)
    const liked = vote.likes.find(id => id.toString() === actor_id);
    if(liked === undefined) {
        vote.likes.push(new mongoose.Types.ObjectId(actor_id))
        vote.save()
    }
}

const unlikeVote = async(actor_id, vote_id) => {
    const vote = await model.vote.findById(vote_id);
    const liked = vote.likes.find(id => id.toString() == actor_id);
    if(liked !== undefined) {
        vote.likes = vote.likes.filter(id => id.toString() !== actor_id);
        vote.save();
    }
}

module.exports = {
    createVote: createVote,
    getVotes: getVotes,
    likeVote: likeVote,
    unlikeVote: unlikeVote,
}