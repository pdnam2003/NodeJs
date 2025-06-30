const mongoose = require('mongoose');

async function connectMongo() {
    const url = process.env.MONGO_URL || 'mongodb://localhost:27017/studentdb';
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('Connected to MongoDB:', url);
}

module.exports = connectMongo; 