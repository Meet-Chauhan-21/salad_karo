const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/saladkaro';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  membership: String,
  active: { type: Boolean, default: true },
});

const orderSchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  saladItems: [{ title: String, quantity: Number, price: Number }],
  total: Number,
  status: { type: String, enum: ['Pending', 'Delivered', 'Cancelled'], default: 'Pending' },
}, { timestamps: true });

const saladSchema = new mongoose.Schema({
  image: String,
  title: String,
  description: String,
  price: Number,
});

const User = mongoose.model('User', userSchema);
const Order = mongoose.model('Order', orderSchema);
const Salad = mongoose.model('Salad', saladSchema);

app.get('/api/salads/public', async (req, res) => {
  try {
    const salads = await Salad.find().lean();
    res.json({ ok: true, data: salads });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.post('/api/orders/public', async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.json({ ok: true, data: order });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.post('/api/users/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json({ ok: true, data: user });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log('Server listening on http://localhost:' + PORT));
  })
  .catch(err => {
    console.error('Mongo connection error', err);
    process.exit(1);
  });
