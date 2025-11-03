
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());

// Initialize SQLite database
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_STORAGE || 'egwelet.db',
    logging: false
});

// Models
const User = sequelize.define('User', {
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING }
});

const Product = sequelize.define('Product', {
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    price: { type: DataTypes.FLOAT },
    image: { type: DataTypes.STRING }
});

// Routes
app.get('/', (req, res) => res.send('Egwelet Online API running'));

app.get('/api/products', async (req, res) => {
    const products = await Product.findAll();
    res.json(products);
});

app.get('/api/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

// Seed function
async function seed() {
    await sequelize.sync({ force: true });
    await User.create({
        name: 'Admin',
        email: process.env.ADMIN_EMAIL || 'admin@egwelet.com',
        password: process.env.ADMIN_PASSWORD || 'password'
    });
    await Product.bulkCreate([
        { name: 'Sample Product 1', description: 'Description 1', price: 10, image: '/images/product1.jpg' },
        { name: 'Sample Product 2', description: 'Description 2', price: 20, image: '/images/product2.jpg' },
        { name: 'Sample Product 3', description: 'Description 3', price: 30, image: '/images/product3.jpg' }
    ]);
    console.log('Database seeded');
}

// Start server
const PORT = process.env.PORT || 5000;
sequelize.authenticate().then(() => {
    console.log('Database connected');
    seed();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
