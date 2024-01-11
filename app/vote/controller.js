'use strict';

'use strict';

const express = require('express');
const service = require('./service');
const { body, validationResult } = require('express-validator');


const createVoteValidation = [
    body('text').notEmpty().withMessage('Text is required'),
    body('user_id').notEmpty().withMessage('User ID is required'),
    body('mbti').notEmpty().withMessage('MBTI is required'),
    body('enneagram').notEmpty().withMessage('Enneagram is required'),
    body('zodiac').notEmpty().withMessage('Zodiac is required'),
];

const likeVoteValidation = [
    body('vote_id').notEmpty().withMessage('Vote ID is required'),
];

const createVote = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { text, user_id, mbti, enneagram, zodiac } = req.body;

    const data = await service.createVote(req.userId(), text, user_id, zodiac, enneagram, mbti);

    res.sendOK();
}

const getVotes = async (req, res, next) => {
    console.log("here")
    const userId = req.params.user_id;

    const data = await service.getVotes(userId);

    res.sendData(data);
}

const likeVote = async (req, res, next) => {
    console.log("user_id", req.userId())
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { vote_id } = req.body;

    const data = await service.likeVote(req.userId(), vote_id);

    res.sendData(data);
}

const unlikeVote = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { vote_id } = req.body;

    const data = await service.unlikeVote(req.userId(), vote_id);

    res.sendData(data);
}

module.exports = {
    createVote: {
        controller: createVote,
        validation: createVoteValidation,
    },
    getVotes: {
        controller: getVotes,
    },
    likeVote: {
        controller: likeVote,
        validation: likeVoteValidation,
    },
    unlikeVote: {
        controller: unlikeVote,
        validation: likeVoteValidation,
    }
}
