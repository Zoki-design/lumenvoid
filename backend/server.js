require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI configuration missing. Check your .env file.');
  process.exit(1);
}

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Schemas
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  hasAnsweredQuestions: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const MoodSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  mood: { type: String, required: true },
  journalEntry: { type: String, default: '' },
  affirmation: { type: String, default: '' },
  sleepQuality: { type: Number, default: 0 },
  selectedHour: { type: Number, default: 0 },
  selectedFocus: { type: Number, default: null },
  date: { type: Date, default: Date.now },
});

const User = mongoose.model('User', UserSchema);
const Mood = mongoose.model('Mood', MoodSchema);

// Routes
app.get('/', (req, res) => {
  res.send('🚀 Server is running successfully.');
});

// Signup
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('❌ Signup error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Signin
app.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Email not registered.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password.' });
    }

    res.json({
      message: 'Successfully logged in',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        hasAnsweredQuestions: user.hasAnsweredQuestions
      }
    });
  } catch (err) {
    console.error('❌ Signin error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET: Fetch all moods
app.get('/moods', async (req, res) => {
  try {
    const moods = await Mood.find().sort({ date: -1 });
    res.json(moods);
  } catch (error) {
    res.status(500).json({ error: 'Error reading moods' });
  }
});

// POST: Save mood
app.post('/moods', async (req, res) => {
  try {
    const {
      mood,
      journalEntry = '',
      affirmation = '',
      sleepQuality = 0,
      selectedHour = 0,
      selectedFocus = null
    } = req.body;

    if (!mood) {
      return res.status(400).json({ error: 'Mood is required.' });
    }

    const newMood = new Mood({
      mood,
      journalEntry,
      affirmation,
      sleepQuality,
      selectedHour,
      selectedFocus
    });

    await newMood.save();
    res.status(201).json({ message: 'Mood saved successfully', mood: newMood });
  } catch (error) {
    console.error('Error saving mood:', error);
    res.status(500).json({ error: 'Error saving mood' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT} at 0.0.0.0`);
});