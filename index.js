const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const port = process.env.PORT || 5000

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})


const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.128dt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("make-web").collection("services");
  const adminsCollection = client.db("make-web").collection("admins");
  const reviewsCollection = client.db("make-web").collection("reviews");


// add admins
app.post('/addAdmin',(req, res)=>{
  const newAdmin = req.body;
  console.log(newAdmin)
  adminsCollection.insertOne(newAdmin)
  .then(result=>{
    res.send(result.insertedCount > 0)
  })
})

//admin check
app.post('/isAdmin',(req, res)=>{
  const email = req.body.email;
  adminsCollection.find({email: email})
  .toArray((err, admin) => {
    res.send(admin.length > 0);
  })
})
// get services info from database
    app.get('/services', (req, res) => {
        collection.find()
        .toArray((err, items)=>{
            res.send(items);
        })
    })

// add Services
  app.post('/addService', (req, res) => {
      const newService = req.body;
      collection.insertOne(newService)
      .then(result =>{
          res.send(result.insertedCount > 0)
      })
  })

// add reviews
    app.post('/addReviews', (req, res) =>{
      const newReview = req.body;
      reviewsCollection.insertOne(newReview)
      .then(result =>{
        res.send(result.insertedCount > 0);
      })
    })

  // get services info from database
    app.get('/reviews', (req, res) => {
      reviewsCollection.find()
      .toArray((err, items)=>{
          res.send(items);
      })

// delete Services
  app.delete('/delete/:id',(req, res) =>{
    collection.deleteOne({_id: ObjectId(req.params.id)})
    .then(result =>{
        console.log(result);
    })
})
  })
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})