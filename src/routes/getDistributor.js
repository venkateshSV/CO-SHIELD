import express from 'express';
import {  confirmPurchase } from '../service/getDistributor';


const router = express.Router({ mergeParams: true });

router.post('/getdistributor', async (req, res, next) => {
  try {
    const data = await confirmPurchase(req.body);

    var jsonData = data["events"]["ThrowDistributorData"]["returnValues"]
    delete jsonData[0]
    delete jsonData[1]
    delete jsonData[2]
    delete jsonData[3]

    res.send(jsonData)
  } catch (err) {
    res.status(500);
    next(err);
  }
});


export default router;