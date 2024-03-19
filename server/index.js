import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import authRoute from './routes/auth.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'SECRET'
}));

app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
const connectMongoDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
    
      if (conn) {
          console.log(`MongoDB Connected: ${conn.connection.host}`);
      } else {
          console.log('Unable to connect to MongoDB.');
          process.exit(1);
      }
    
    } catch (error) {
      console.log(`Error: ${error.message}`);
      process.exit();
    }
}
  
connectMongoDB();

// middleware
app.use('/api/v1/auth', authRoute);

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(cookieParser());

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

// checking server status
app.get('/', (req, res) => {
    res.send('Hello World');
});

// start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});