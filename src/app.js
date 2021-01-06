import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import AddConsumer from './routes/addConsumer'
import AddDistributor from './routes/addDistributor'
import AddVaccine from './routes/addVaccine'
import GetConsumer from './routes/getConsumer'
import GetDistributor from './routes/getDistributor'
import GetVaccine from './routes/getVaccine'
import MakeVaccinated from './routes/makeVaccinated'

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({ origin: '*', credentials: true }));
app.get('/checkserver', (req, res) => res.sendStatus(200));
app.use(AddConsumer);
app.use(AddDistributor);
app.use(AddVaccine);
app.use(GetConsumer);
app.use(GetDistributor);
app.use(GetVaccine);
app.use(MakeVaccinated);


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