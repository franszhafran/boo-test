'use strict';

const model = require('../../engine/model')
const mongoose = require('mongoose');

const createProfile = async (name, description, mbti, enneagram, variant, tritype, socionics, sloan, psyche, image) => {
    const user = new model.user({
        name: name,
        description: description,
        mbti: mbti,
        enneagram: enneagram,
        variant: variant,
        tritype: tritype,
        socionics: socionics,
        sloan: sloan,
        psyche: psyche,
        image: image,
    });

    try {
        const u = await user.save();
        return u
    } catch (error) {
        throw error
    }
}

const showProfile = async(user_id) => {
    const profile = await model.user.findById(user_id);
    return profile;
}

module.exports = {
    createProfile: createProfile,
    showProfile: showProfile,
}