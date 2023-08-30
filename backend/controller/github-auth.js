const express = require('express');
const router = express.Router();
const passport = require('passport')
const GithubStrategy = require('passport-github2').Strategy;
const User = require('../models/user');


passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
},
    async function (accessToken, refreshToken, profile, cb) {
        const user = await User.findOne({
            ProfileId: profile.id,
            issuer: 'Github',
        });

        if (!user) {
            const user = new User({
                ProfileId: profile.id,
                username: profile.username,
                email: profile.email ? profile.email : `${profile.username}@${profile.provider}.com`,
                issuer: profile.provider,
                scope: ["profile", "email"],
            });
            await user.save();

        } else {
            console.log('Github User already exist in Db..')
        }
        return cb(null, profile);
    }

));


router.get('/auth/github', passport.authenticate('github'))

router.get('/auth/github/callback', passport.authenticate('github', {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: '/login/failed',
}))





module.exports = router;