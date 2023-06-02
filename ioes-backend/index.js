const express = require("express");
const cors = require('cors');
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://eren:eren@ioesdb.12eqtdm.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const { connectDatabase, getCandidates } = require('./controllers/databaseController');

connectDatabase(client);

app.use(cors());

app.use(express.static('../ioes/ioes/build'));
app.use(express.json());

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Connect to the MongoDB database
      
      const db = client.db("election");
      const collection = db.collection("users");
  
      // Find the user with the provided username and password
      const user = await collection.findOne({ username, password });
  
      if (user) {
        // Successful login
        res.status(200).json({ message: 'Login successful' });
      } else {
        // Invalid credentials
        res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Close the database connection
      
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});



app.get('/api/candidates', async (req, res) => {
    try {
        // Use the connected database instance
        const db = client.db("election");
        const collection = db.collection("candidates");

        // Fetch the candidate data
        const candidates = await getCandidates(collection);

        // Send the candidate data as a response
        res.status(200).json(candidates);
        
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


  
app.listen(8080, () => {
    console.log('Server is running on port 8080');
});


