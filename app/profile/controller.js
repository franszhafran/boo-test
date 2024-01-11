'use strict';

'use strict';

const express = require('express');
const service = require('./service');
const { body, validationResult } = require('express-validator');


const createProfileValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('mbti').notEmpty().withMessage('MBTI is required'),
    body('enneagram').notEmpty().withMessage('Enneagram is required'),
    body('variant').notEmpty().withMessage('Variant is required'),
    body('tritype').notEmpty().withMessage('Tritype is required').isNumeric().withMessage('Tritype must be a number'),
    body('socionics').notEmpty().withMessage('Socionics is required'),
    body('sloan').notEmpty().withMessage('Sloan is required'),
    body('psyche').notEmpty().withMessage('Psyche is required'),
    body('image').notEmpty().withMessage('Image is required'),
];

const createProfile = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, mbti, enneagram, variant, tritype, socionics, sloan, psyche, image } = req.body;

    const data = await service.createProfile(name, description, mbti, enneagram, variant, tritype, socionics, sloan, psyche, image);

    res.sendData(data);
}

const showProfile = async (req, res, next) => {
    const userId = req.params.user_id;

    const data = await service.showProfile(userId);

    res.render('profile_template', {
        profile: data,
    });
}

module.exports = {
    createProfile: {
        controller: createProfile,
        validation: createProfileValidation,
    },
    showProfile: {
        controller: showProfile,
    },
}
