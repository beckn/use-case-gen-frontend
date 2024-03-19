import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import { Strategy as MetaMaskStrategy } from 'passport-metamask';
// import { Strategy as GitHubStrategy } from 'passport-github';
import findOrCreate from 'mongoose-findorcreate';
import passport from 'passport';
import User from '../models/user.js';

import dotenv from 'dotenv';
dotenv.config();

// Configure Google OAuth 2.0 strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/v1/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    // Verify user and store information
    const user = User.findOrCreate({
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
    });

    done(null, user);
}));

// Configure MetaMask OAuth 2.0 strategy
// passport.use(new MetaMaskStrategy({
//     clientID: METAMASK_CLIENT_ID,
//     clientSecret: METAMASK_CLIENT_SECRET,
//     callbackURL: "/auth/metamask/callback"
// }, (accessToken, refreshToken, profile, done) => {
//     // Verify user and store information
//     done(null, profile);
// }));

// Configure GitHub OAuth 2.0 strategy
// passport.use(new GitHubStrategy({
//     clientID: GITHUB_CLIENT_ID,
//     clientSecret: GITHUB_CLIENT_SECRET,
//     callbackURL: "/auth/github/callback"
// }, (accessToken, refreshToken, profile, done) => {
//     // Verify user and store information
//     done(null, profile);
// }));

export const GoogleOAuth = passport.authenticate('google', { scope: ['profile', 'email'] });
export const GoogleOAuthCallback = passport.authenticate('google', { failureRedirect: '/' });

// export const MetaMaskOAuth = passport.authenticate('metamask');
// export const MetaMaskOAuthCallback = passport.authenticate('metamask', { failureRedirect: '/' });

// export const GitHubOAuth = passport.authenticate('github');
// export const GitHubOAuthCallback = passport.authenticate('github', { failureRedirect: '/' });