import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GitHubStrategy } from 'passport-github2';
import passport from 'passport';
import User from '../models/user.js';

import dotenv from 'dotenv';
dotenv.config();

// Configure Google OAuth 2.0 strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/v1/auth/google/callback",
    scope: ['profile', 'email'],
}, (accessToken, refreshToken, profile, done) => {
    // Verify user and store information
    const user = User.findOrCreate({
        id: profile.id,
        user: profile.displayName,
    });

    done(null, user);
}));

// Configure Facebook OAuth 2.0 strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/api/v1/auth/facebook/callback",
    profileFields: ['id', 'displayName'],
}, (accessToken, refreshToken, profile, done) => {
    // Verify user and store information
    const user = User.findOrCreate({ 
        id: profile.id,
        user: profile.displayName, 
    });

    done(null, user);
}));

// Configure GitHub OAuth 2.0 strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/api/v1/auth/github/callback",
    scope: ['user:email'],
}, (accessToken, refreshToken, profile, done) => {
    // Verify user and store information
    const user = User.findOrCreate({ 
        id: profile.id,
        user: profile.displayName, 
    });

    done(null, user);
}));

export const GoogleOAuth = passport.authenticate('google', { scope: ['profile', 'email'] }, { session: true });
export const GoogleOAuthCallback = passport.authenticate('google', { 
    successRedirect: 'http://localhost:3000/search', 
    failureRedirect: '/login/failed',
    session: true,
});

export const FacebookOAuth = passport.authenticate('facebook', { scope: ['email'] });
export const FacebookOAuthCallback = passport.authenticate('facebook', { 
    successRedirect: 'http://localhost:3000/search',
    failureRedirect: '/' 
});

export const GitHubOAuth = passport.authenticate('github', { scope: ['user:email'] });
export const GitHubOAuthCallback = passport.authenticate('github', { 
    successRedirect: 'http://localhost:3000/search',
    failureRedirect: '/' 
});

export const Signup = async (req, res) => {
    try {
        const user = await User.findOrCreate({
            user: req.body.user, 
            name_role_timestamp: req.body.name_role_timestamp,
            name_org: req.body.name_org,
            agree: req.body.agree,
        });

        res.status(200).json({ success: true, message: 'User created successfully', data: user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error', error: error });
    }
};