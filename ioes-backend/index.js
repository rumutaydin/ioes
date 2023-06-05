const express = require("express");
const cors = require('cors');
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';

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

app.post('/api/student/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Connect to the MongoDB database
      
      const db = client.db("election");
      const collection = db.collection("users");
  
      // Find the user with the provided username and password
      const student = await collection.findOne({ username, password });
  
      if (student) {
        // Successful login
        const token = jwt.sign({ username, deptNo: student.deptNo }, secretKey); // Create a JWT with the username as the payload
        localStorage.setItem('token', token);
        res.status(200).json({ message: 'Login successful', token });
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

app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Connect to the MongoDB database
    
    const db = client.db("election");
    const collection = db.collection("admins");

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

app.get('/api/student/deptNo', (req, res) => {
  try {
    // Extract the logged-in student's department number from the authentication token
    // Replace this with your actual implementation to extract and verify the token
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, secretKey);
    const deptNo = decodedToken.deptNo;
    // Assuming you have extracted the department number successfully
    //const deptNo = req.user.deptNo; // Assuming the department number is stored in the `deptNo` property of the authenticated user object

    res.status(200).json({ deptNo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/candidates', async (req, res) => {
    try {

        const { department } = req.query;
        // Use the connected database instance
        const db = client.db("election");
        const collection = db.collection("candidates");

        // Fetch the candidate data
        const candidates = await getCandidates(collection, department);

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


