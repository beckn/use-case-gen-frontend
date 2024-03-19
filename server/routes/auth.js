import express from 'express'
import { GoogleOAuth, GoogleOAuthCallback } from '../controllers/auth.js'
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Routes for authentication with each provider
router.get('/google', GoogleOAuth);
router.get('/google/callback', GoogleOAuthCallback, (req, res) => {
    // Successful authentication, redirect to dashboard or homepage

    res.redirect('/');
});

// app.get('/metamask', MetaMaskOAuth);
// app.get('/metamask/callback', MetaMaskOAuthCallback, (req, res) => {
//     // Successful authentication, redirect to dashboard or homepage
//     res.redirect('/');
// });

// app.get('/github', GitHubOAuth);
// app.get('/github/callback', GitHubOAuthCallback, (req, res) => {
//     // Successful authentication, redirect to dashboard or homepage
//     res.redirect('/');
// });

export default router;