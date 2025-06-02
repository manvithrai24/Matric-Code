const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection URI
const uri = process.env.MONGODB_URI;
const DB_NAME = 'code-analyzer';  // Replace with your actual DB name

let db;

// Connect to MongoDB
async function connectToDatabase() {
  try {
    const client = new MongoClient(uri);

    db = client.db(DB_NAME);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

// API Routes

// Get all analyses
app.get('/api/analyses', async (req, res) => {
  try {
    const analyses = await db.collection('analyses').find({}).sort({ timestamp: -1 }).toArray();
    res.json(analyses);
  } catch (error) {
    console.error('Error fetching analyses:', error);
    res.status(500).json({ error: 'Failed to fetch analyses' });
  }
});

// Get a specific analysis by ID
app.get('/api/analyses/:id', async (req, res) => {
  try {
    const analysis = await db.collection('analyses').findOne({ _id: new ObjectId(req.params.id) });
    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }
    res.json(analysis);
  } catch (error) {
    console.error('Error fetching analysis:', error);
    res.status(500).json({ error: 'Failed to fetch analysis' });
  }
});

// Create a new analysis
app.post('/api/analyses', async (req, res) => {
  try {
    const { code, score, issues } = req.body;
    const result = await db.collection('analyses').insertOne({
      code,
      score,
      issues,
      timestamp: new Date()
    });
    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    console.error('Error saving analysis:', error);
    res.status(500).json({ error: 'Failed to save analysis' });
  }
});

// Start the server
app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`🚀 Server running on port ${PORT}`);
});
