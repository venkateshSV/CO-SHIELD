import express from 'express';
import {  confirmPurchase } from '../service/getVaccine';


const router = express.Router({ mergeParams: true });

router.post('/getvaccine', async (req, res, next) => {
  try {
    const data = await confirmPurchase(req.body);

    var jsonData = data["events"]["ThrowVaccineData"]["returnValues"]
    delete jsonData[0]
    delete jsonData[1]
    delete jsonData[2]
    delete jsonData[3]
    delete jsonData[4]
    delete jsonData[5]
    delete jsonData[6]
    delete jsonData[7]
    delete jsonData[8]

    res.send(jsonData)
  } catch (err) {
    res.status(500);
    next(err);
  }
});


export default router;