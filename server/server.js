const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');

// Load env config
dotenv.config();

// Passport config
require('./config/passport');

// Connect to Database
connectDB();

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS - Allow credentials (cookies)
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Allow client to access
    credentials: true,
  })
);

// Trust the Render proxy
app.set('trust proxy', 1); 

// Express session (UPDATED FOR PRODUCTION)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: 'none', // Required for cross-site cookies
      secure: true,     // Required for sameSite: 'none'
      httpOnly: true,   // Good practice
      maxAge: 1000 * 60 * 60 * 24 * 7 // e.g., 7 days
    },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/api', require('./routes/api'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);