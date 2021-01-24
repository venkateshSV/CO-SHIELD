import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import AddConsumer from './routes/addConsumer'
import AddDistributor from './routes/addDistributor'
import AddVaccine from './routes/addVaccine'
import GetConsumer from './routes/getConsumer'
import GetDistributor from './routes/getDistributor'
import GetDistributorByIndex from './routes/getDistributorByIndex'
import GetVaccine from './routes/getVaccine'
import MakeVaccinated from './routes/makeVaccinated'
import UpdateIotData from './routes/updateIotData'
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1/covid_database');
mongoose.connection.on('error', (error) => {
  console.log(error);
});
mongoose.connection.on("connected", () => {
  console.log("Database connected!");
});
const ReviewData = require("./models/ReviewModel")
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({ origin: '*', credentials: true }));
app.get('/checkserver', (req, res) => res.sendStatus(200));
app.post('/addReview',(req,res)=>{
  var newitem;
  newitem = req.body;
  newitem._id = new mongoose.Types.ObjectId;
  var data = ReviewData(newitem);
  data.save(function(err){
      if(err)
      {
          res.sendStatus(400);
      }
      else
      {
        res.sendStatus(200);
      }
  });
})
app.get('/getReview/:id',(req,res)=>{
ReviewData.findById(req.params.id).exec().then(function (doc){
  console.log(doc);
  res.send(doc);
}).catch((err)=>{
  res.send(err);
});
})
app.use(AddConsumer);
app.use(AddDistributor);
app.use(AddVaccine);
app.use(GetConsumer);
app.use(GetDistributor);
app.use(GetDistributorByIndex);
app.use(GetVaccine);
app.use(MakeVaccinated);
app.use(UpdateIotData);


app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error(err);
  return res.status(res.statusCode || 500).send({ message: err.message });
});

const main = async () => {
    try {
      app.listen(8545);
      console.log("Application started on port 8545");
    } catch (err) {
      process.exit(1);
    }
  };
  
main().catch(console.error);