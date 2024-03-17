import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as MetaMaskStrategy } from 'passport-metamask';
import { Strategy as GitHubStrategy } from 'passport-github';

// Configure Google OAuth 2.0 strategy
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    // Verify user and store information
    done(null, profile);
}));

// Configure MetaMask OAuth 2.0 strategy
passport.use(new MetaMaskStrategy({
    clientID: METAMASK_CLIENT_ID,
    clientSecret: METAMASK_CLIENT_SECRET,
    callbackURL: "/auth/metamask/callback"
}, (accessToken, refreshToken, profile, done) => {
    // Verify user and store information
    done(null, profile);
}));

// Configure GitHub OAuth 2.0 strategy
passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
}, (accessToken, refreshToken, profile, done) => {
    // Verify user and store information
    done(null, profile);
}));

// Routes for authentication with each provider
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    // Successful authentication, redirect to dashboard or homepage
    res.redirect('/');
});

app.get('/auth/metamask', passport.authenticate('metamask'));
app.get('/auth/metamask/callback', passport.authenticate('metamask', { failureRedirect: '/' }), (req, res) => {
    // Successful authentication, redirect to dashboard or homepage
    res.redirect('/');
});

app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
    // Successful authentication, redirect to dashboard or homepage
    res.redirect('/');
});

// Protected route example
app.get('/dashboard', isAuthenticated, (req, res) => {
    // Render dashboard
    res.render('dashboard');
});

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
