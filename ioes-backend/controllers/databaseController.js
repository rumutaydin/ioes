// dataBaseController.js

async function connectDatabase(client) {
    try {
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
      console.error(error);
    }
  }

  async function getCandidates(collection, department) {
    try {
      // Fetch the candidate data based on the department number
      const candidates = await collection.find({ deptNo: department }).toArray();
      return candidates;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch candidates');
    }
  }
  
  module.exports = { connectDatabase, getCandidates };
  