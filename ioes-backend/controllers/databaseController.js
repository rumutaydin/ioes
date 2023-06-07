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
      console.log("getCandidates function in dbcontroller")
      console.log(candidates);
      return candidates;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch candidates');
    }
  }



// UPDATESİZ HALİ ON NUMARA EKLİYO

async function createElectionDocument(collection, startDate, endDate, startTime, endTime) {
  try {
    const startDateTime = new Date(startDate + 'T' + startTime);
    const endDateTime = new Date(endDate + 'T' + endTime);

    const electionDocument = {
      startDate: startDateTime,
      endDate: endDateTime,
      startTime: startTime,
      endTime: endTime,
    };

    // Insert the election document into the collection
    const result = await collection.insertOne(electionDocument);

    console.log(`Created Election Document with ID: ${result.insertedId}`);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create election document');
  }
}

module.exports = { connectDatabase, getCandidates, createElectionDocument };




