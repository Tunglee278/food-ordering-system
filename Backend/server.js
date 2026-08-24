const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error('MONGO_URI is required. Copy .env.example to .env and add your connection string.');
}

mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB Atlas.'))
  .catch((error) => console.error('MongoDB connection failed:', error.message));

const Product = mongoose.model('Product', new mongoose.Schema({
  id: Number,
  name: String,
  category: String,
  price: Number,
  img: String,
  description: String,
}));

const Order = mongoose.model('Order', new mongoose.Schema({
  customerName: String,
  phone: String,
  address: String,
  cartItems: mongoose.Schema.Types.Mixed,
  totalPrice: Number,
  status: { type: String, default: 'Chờ xử lý' },
  createdAt: { type: Date, default: Date.now },
}));

app.get('/api/products', async (_request, response) => {
  try {
    response.json(await Product.find());
  } catch (_error) {
    response.status(500).json({ message: 'Unable to load products.' });
  }
});

app.post('/api/products', async (request, response) => {
  try {
    const product = await Product.create(request.body);
    response.status(201).json({ message: 'Product created.', data: product });
  } catch (_error) {
    response.status(500).json({ message: 'Unable to create product.' });
  }
});

app.post('/api/orders', async (request, response) => {
  try {
    const order = await Order.create(request.body);
    response.status(201).json({ message: 'Order created.', orderId: order._id });
  } catch (_error) {
    response.status(500).json({ message: 'Unable to create order.' });
  }
});

app.put('/api/orders/:id/status', async (request, response) => {
  try {
    const order = await Order.findByIdAndUpdate(
      request.params.id,
      { status: request.body.status || 'Đã xử lý' },
      { new: true },
    );
    response.json(order);
  } catch (_error) {
    response.status(500).json({ message: 'Unable to update order.' });
  }
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log(`Backend running at http://localhost:${port}`));
