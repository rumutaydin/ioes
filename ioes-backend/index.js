const express = require("express");
const cors = require('cors');
const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const { ObjectId } = require('mongodb');
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
        const token = jwt.sign({ deptNo: student.deptNo, id: student._id}, secretKey); // Create a JWT with the username as the payload
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
    //const pics = candidates.map((candidate) => candidate.pic);

    // Send the candidate data as a response
    res.status(200).json({ candidates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/checkVotingStat', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, secretKey);
    const id = decodedToken.id;

    // Use the connected database instance
    const db = client.db("election");
    const collection = db.collection("students");

    const userId = new ObjectId(id);

    const user = await collection.findOne({_id: userId});
    const votingStatus = user.votingStat
    console.log(votingStatus)

    // Send the candidate data as a response
    res.status(200).json({ votingStatus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/setVoteStat', async(req, res) => {
  try{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, secretKey);
    const id = decodedToken.id;
    console.log(id, 'ben token id');

    const db = client.db('election');
    const collection = db.collection('students');
    

    const userId = new ObjectId(id);
    // const student = await collection.findOne({_id: userId});
    const result = await collection.updateOne(
      { _id: userId },
      { $set: { votingStat: true } }
    );
    // if (student.votingStat) {
    //   console.log("222222222")
    //   res.status(400).json({ message: 'You have already voted' });
    // }

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'Voting status updated' });
      console.log("dfhfdhfdsh")
    } 
    else {
      res.status(404).json({ message: 'You have already voted' });
      console.log("you already voted buggggggg", result.modifiedCount)
    }
    
  } catch (error) {
    console.error('Error updating voting status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.post('/api/vote', async (req, res) => {
  try {
    const selectedCandidateId = req.body.selectedCandidateId;

    if (!selectedCandidateId) {
      return res.status(400).json({ message: 'No candidate selected' });
    }


    // Get a reference to the candidates collection
    const db = client.db('election');
    const collection = db.collection('candidates');

    // Update the count_vote field for the selected candidate
    const candidateId = new ObjectId(selectedCandidateId);
    const result = await collection.updateOne(
      { _id: candidateId },
      { $inc: { countVote: 1 } }
    );

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'Vote count updated' });
    } else {
      res.status(500).json({ message: 'Failed to update vote count' });
    }
  } catch (error) {
    console.error('Error updating vote count:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

  
app.listen(8080, () => {
    console.log('Server is running on port 8080');
});


