const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const profileSchema = new mongoose.Schema({
    email: String,
    //password: String,
    name: String,
    date: { type: Date, default: Date.now },
    //hobby: [String]
});

const Profile = mongoose.model('Profiles', profileSchema);

router.get('/', async (req, res) => {
    const profile = await Profile.find();
    res.send(profile);
});

router.get('/:name', async (req, res) => {
    const profile = await Profile.find({name:req.body.name});
    res.send(profile);
});
//
router.post('/', async (req, res) => {
    let profile = new Profile({ email: req.body.email, name: req.body.name });
    profile = await profile.save();

    res.send(profile);
});

module.exports = router;
