const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// Replace the placeholder with your Atlas connection string
const uri = "mongodb://localhost:27017";
const databaseName = 'task-manager'

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});


async function run() {
  // Connect the client to the server (optional starting in v4.7)
  await client.connect();

  const db = client.db(databaseName);
  const usersCollection = db.collection("users");
  const tasksCollection = db.collection("tasks");

  // const query = { age: 30 };

  // var cursor = await usersCollection.find(query).toArray();
  // console.log('Found records in users collection: ' + JSON.stringify(cursor))

  // var count = await usersCollection.countDocuments({ age: 20 })
  // console.log(`Found ${count} matching records`)

  // var findById = await tasksCollection.findOne({
  //   _id: new ObjectId("647baac87be2f0f393859c4a"),
  // });
  // console.log(`Found records with matching id: ${JSON.stringify(findById)}`)

  // var findAllTasksFilter = await tasksCollection.find({completed: false}).toArray()
  // console.log(`Found all incompleted tasks: ${JSON.stringify(findAllTasksFilter)}`)

  usersCollection.deleteMany({
    age: 30
  })
  .then(result => console.log(result))
  .catch(error => console.log(error))

  tasksCollection
    .deleteMany({ description: "Clean up poop" })
    .then((result) => console.log(result))
    .catch((error) => console.log(error));
}
run()
