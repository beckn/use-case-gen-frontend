import express from 'express'
import { GoogleOAuth, GoogleOAuthCallback, FacebookOAuth, FacebookOAuthCallback, GitHubOAuth, GitHubOAuthCallback, Signup } from '../controllers/auth.js'
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Routes for authentication with each provider
router.get('/google', GoogleOAuth);
router.get('/google/callback', GoogleOAuthCallback, (req, res) => {
    // Successful authentication, redirect to dashboard or homepage
    res.redirect('http://localhost:3000/search');
});

router.get('/facebook', FacebookOAuth);
router.get('/facebook/callback', FacebookOAuthCallback, (req, res) => {
    // Successful authentication, redirect to dashboard or homepage
    res.redirect('http://localhost:3000/search');
});

router.get('/github', GitHubOAuth);
router.get('/github/callback', GitHubOAuthCallback, (req, res) => {
    // Successful authentication, redirect to dashboard or homepage
    res.redirect('http://localhost:3000/search');
});

router.post('/signup', Signup);

router.get('/login/success', (req, res) => {
    if(req.user) {
        res.status(200).json({
            success: true,
            message: 'Successfully loged In',
            user: req.user
        })
    } else {
        res.status(403).json({ success: false, message: 'Not Authorized' });
    }
});

router.get('/login/failed', (req, res) => {
    res.status(401).json({
        error: true,
        message: 'Login failed',
    })
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL);
})

export default router;