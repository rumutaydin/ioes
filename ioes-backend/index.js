const express = require("express");
const cors = require('cors');
const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;
var path = require('path');
const multer = require('multer');

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
      const collection = db.collection("students");
  
      // Find the user with the provided username and password
      const student = await collection.findOne({ username, password });
  
      if (student) {
        // Successful login
        const token = jwt.sign({ deptNo: student.deptNo, username: student.username }, secretKey); // Create a JWT with the username as the payload
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

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  const filetypes = /pdf/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Only PDF files are allowed');
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

app.post('/api/becomecandidate', upload.array('file', 3), async (req, res) => {
  const files = req.files;
  if (!files || files.length !== 3) {
    return res.status(400).json({ error: 'Exactly 3 files must be selected!' });
  }
  try {  
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, secretKey);
    const username = decodedToken.username;

    // Extract validDocs array from req.files
    const validDocs = files.map(file => file.buffer);

    // Update the relevant user in the database
    const db = client.db("election");
    const collection = db.collection("students");

    const check = await collection.findOne({ username: username });
    if (check && check.validDocs.length === 3) {
      return res.status(400).json({ error: 'You have already uploaded 3 files!' });
    }

    const user = await collection.findOneAndUpdate(
      { username: username },
      { $push: { validDocs: { $each: validDocs } } }
    );
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'PDF files successfully uploaded!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  } 
});

app.delete('/api/deletecandidate', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, secretKey);
    const username = decodedToken.username;

    const db = client.db("election");
    const collection = db.collection("students");

    const user = await collection.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.validDocs || user.validDocs.length === 0) {
      return res.status(400).json({ error: 'No files to delete' });
    }

    // Delete all files associated with the user
    const deletedFiles = await collection.findOneAndUpdate(
      { username: username },
      { $set: { validDocs: [] } } 
    );

    res.status(200).json({ message: 'PDF files successfully deleted!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


  
app.listen(8080, () => {
    console.log('Server is running on port 8080');
});


