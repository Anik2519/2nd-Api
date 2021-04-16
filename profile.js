const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
//const validator = require('express-joi-validation').createValidator({});

const profileSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 4
    },
    name: {
        type: String,
        required: true,
        minlength: 4
    },
    date: { type: Date, default: Date.now },
    //hobby: [String]
});

const Profile = mongoose.model('Profiles', profileSchema);

router.get('/', async (req, res) => {
    const profile = await Profile.find();
    res.send(profile);
});

router.get('/:name', async (req, res) => {
    const profile = await Profile.find('name');
    res.send(profile);
});
//
router.post('/', async (req, res) => {   
    const result = profileValidator(req.body);
    if (result.error) {
        res.status(400).send(result.error)
    }
    let profile = new Profile({ email: req.body.email, name: req.body.name });
    profile = await profile.save();
    res.send(profile);
});

module.exports = router;

function profileValidator(profile){
    const schema = Joi.object({  // for newer versions
        name: Joi.string().min(3).required(),
        email: Joi.string().required()
    });
    return schema.validate(profile);
}


// async function createProfile() {
//     const profile = new Profile({
//         email: 'anik@gmail.com',
//         password: '1234',
//         name: 'anik',
//         hobby: ['photography', 'reading books']
//     });
//     const newp = await profile.save();
//     console.log(newp);
// }

//createProfile();

