require('dotenv').config(); // Load .env file

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const Todo = require('./models/Todo');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For JSON bodies
app.use(express.urlencoded({ extended: true })); // For form-encoded bodies

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI тохиргоо байхгүй байна. .env файлыг шалгана уу.');
  process.exit(1);
}

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB холбогдлоо'))
.catch(err => {
  console.error('❌ MongoDB алдаа:', err);
  process.exit(1);
});

// Schemas
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model('User', UserSchema);

// Routes
app.get('/', (req, res) => {
  res.send('🚀 Сервер амжилттай ажиллаж байна.');
});

// Signup
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

// Signin
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

// Todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Серверийн алдаа' });
  }
});

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

// DELETE Todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    console.error('❌ Delete Todo error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT Todo (Edit)
app.put('/todos/:id', async (req, res) => {
  const { text } = req.body;
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, { text }, { new: true });
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json({ message: 'Todo updated', todo });
  } catch (err) {
    console.error('❌ Edit Todo error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Сервер порт ${PORT} дээр 0.0.0.0 дээр аслаа`);
});
