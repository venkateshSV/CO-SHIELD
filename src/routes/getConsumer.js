import express from 'express';
import {  confirmPurchase } from '../service/getConsumer';


const router = express.Router({ mergeParams: true });

router.post('/getconsumer', async (req, res, next) => {
  try {
    const data = await confirmPurchase(req.body);

    var jsonData = data["events"]["ThrowConsumerData"]["returnValues"]
    delete jsonData[0]
    delete jsonData[1]
    delete jsonData[2]
    delete jsonData[3]
    delete jsonData[4]
    delete jsonData[5]

    res.send(jsonData)
  } catch (err) {
    res.status(500);
    next(err);
  }
});


export default router;