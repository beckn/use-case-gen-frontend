import express from 'express'
import { GoogleOAuth, GoogleOAuthCallback, FacebookOAuth, FacebookOAuthCallback, GitHubOAuth, GitHubOAuthCallback } from '../controllers/auth.js'
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Routes for authentication with each provider
router.get('/google', GoogleOAuth);
router.get('/google/callback', GoogleOAuthCallback, (req, res) => {
    // Successful authentication, redirect to dashboard or homepage
    res.redirect('/');
});

router.get('/facebook', FacebookOAuth);
router.get('/facebook/callback', FacebookOAuthCallback, (req, res) => {
    // Successful authentication, redirect to dashboard or homepage
    res.redirect('/');
});

router.get('/github', GitHubOAuth);
router.get('/github/callback', GitHubOAuthCallback, (req, res) => {
    // Successful authentication, redirect to dashboard or homepage
    res.redirect('/');
});

export default router;