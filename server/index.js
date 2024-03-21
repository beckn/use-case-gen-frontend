import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import authRoute from './routes/auth.js';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import logger from 'morgan';

dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: 'keyboard cat',
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  store: new MongoStore({ mongooseConnection: mongoose.connection, mongoUrl: process.env.MONGO_URI})
}));

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
})); 

app.use(passport.authenticate('session'));
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