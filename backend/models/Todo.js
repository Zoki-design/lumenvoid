const mongoose = require('mongoose');

// Define the Todo schema
const TodoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,  // Ensure that text is always required
  },
  createdAt: {
    type: Date,
    default: Date.now,  // Automatically set the creation date
  },
});

// Create a model from the schema
const Todo = mongoose.model('Todo', TodoSchema);

// Export the model to use it in server.js
module.exports = Todo;
