require('dotenv').config(); // .env файлыг ачааллах
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');

const Todo = require('./models/Todo');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());         
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB URI
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB холбогдлоо'))
  .catch(err => console.error('❌ MongoDB алдаа:', err));

// Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model('User', UserSchema);

// Signup route
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Бүх талбарыг бөглөнө үү.' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();

    res.status(201).json({ message: 'Хэрэглэгч амжилттай бүртгэгдлээ' });
  } catch (err) {
    console.error('❌ Signup алдаа:', err);
    res.status(500).json({ error: 'Серверийн алдаа' });
  }
});

// ✅ Signin route
app.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Имэйл болон нууц үг шаардлагатай.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Имэйл бүртгэлгүй байна.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Нууц үг буруу байна.' });
    }

    res.json({ message: 'Амжилттай нэвтэрлээ', user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error('❌ Signin алдаа:', err);
    res.status(500).json({ error: 'Серверийн алдаа' });
  }
});


app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Серверийн алдаа' });
  }
});

// 🔹 POST /todos - todo нэмэх
app.post('/todos', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Todo хоосон байна' });
    }

    const newTodo = new Todo({ text });
    await newTodo.save();
    res.status(201).json({ message: 'Todo нэмэгдлээ', todo: newTodo });
  } catch (err) {
    res.status(500).json({ error: 'Серверийн алдаа' });
  }
});




// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Сервер порт ${PORT} дээр аслаа`));
