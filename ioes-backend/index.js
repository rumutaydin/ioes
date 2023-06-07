const express = require("express");
const cors = require('cors');
const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const uri = "mongodb+srv://eren:eren@ioesdb.12eqtdm.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


// ÇALIŞAN KISIM

const { connectDatabase, getCandidates, createElectionDocument } = require('./controllers/databaseController');

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
        const token = jwt.sign({ deptNo: student.deptNo }, secretKey); // Create a JWT with the username as the payload
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
    const admin = await collection.findOne({ username, password });

    if (admin) {
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

// app.get('/api/student/deptNo', (req, res) => {
//   try {
//     // Extract the token from the request headers
//     const token = req.headers.authorization.split(' ')[1];

//     // Verify and decode the token
//     const decodedToken = jwt.verify(token, secretKey);

//     // Extract the department number from the decoded token
//     const deptNo = decodedToken.deptNo;

//     res.status(200).json({ deptNo });
//     console.log("deptno!!");
//     console.log(deptNo);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

app.get('/api/candidates', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, secretKey);
    const department = decodedToken.deptNo;

    // Use the connected database instance
    const db = client.db("election");
    const collection = db.collection("candidates");

    // Fetch the candidate data
    const candidates = await getCandidates(collection, department);

    // Send the candidate data as a response
    res.status(200).json(candidates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


///////////////////////
app.post('/api/election', async (req, res) => {
  try {
    // Use the connected database instance
    const db = client.db('election');
    const collection = db.collection('elections');

    const { startDate, endDate, startTime, endTime } = req.body;

    // Create the election document
    await createElectionDocument(collection, startDate, endDate, startTime, endTime);

    res.status(200).json({ message: 'Election document created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/////////////////////////////////


  
app.listen(8080, () => {
    console.log('Server is running on port 8080');
});

