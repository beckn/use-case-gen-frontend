const express = require('express');
const router = express.Router();
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');


passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
},
    async function (accessToken, refreshToken, profile, cb) {
        const user = await User.findOne({
            ProfileId: profile.id,
            issuer: 'facebook',
            scope: ["profile", "email"],
        });

        if (!user) {
            const userName =profile.username ? profile.username: profile.displayName
            const user = new User({
                ProfileId: profile.id,
                username: userName,
                email: `${userName.toLowerCase().split(" ").join("")}@${profile.provider}.com`,
                issuer: profile.provider,
            });
            await user.save();

        } else {
            console.log('Facebook User already exist in Db..')
        }
        return cb(null, profile);
    }

));



router.get('/auth/facebook', passport.authenticate('facebook'))

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: '/login/failed',
}))





module.exports = router;