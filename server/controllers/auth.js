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
    callbackURL: "/api/v1/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    // Verify user and store information
    const user = User.findOrCreate({
        id: profile.id,
        name: profile.displayName,
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
        name: profile.displayName, 
    });

    done(null, user);
}));

// Configure GitHub OAuth 2.0 strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/api/v1/auth/github/callback"
}, (accessToken, refreshToken, profile, done) => {
    // Verify user and store information
    const user = User.findOrCreate({ 
        id: profile.id,
        name: profile.displayName, 
    });

    done(null, user);
}));

export const GoogleOAuth = passport.authenticate('google', { scope: ['profile', 'email'] });
export const GoogleOAuthCallback = passport.authenticate('google', { failureRedirect: '/' });

export const FacebookOAuth = passport.authenticate('facebook');
export const FacebookOAuthCallback = passport.authenticate('facebook', { failureRedirect: '/' });

export const GitHubOAuth = passport.authenticate('github');
export const GitHubOAuthCallback = passport.authenticate('github', { failureRedirect: '/' });