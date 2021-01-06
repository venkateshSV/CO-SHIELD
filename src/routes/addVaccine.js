import express from 'express';
import {  confirmPurchase } from '../service/addVaccine';


const router = express.Router({ mergeParams: true });

router.post('/addvaccine', async (req, res, next) => {
  try {
    const data = await confirmPurchase(req.body);

    var jsonData = data["events"]["VaccineAdded"]["returnValues"]
    delete jsonData[0]
    delete jsonData[1]
    delete jsonData[2]
    delete jsonData[3]
    delete jsonData[4]

    res.send(jsonData)
  } catch (err) {
    res.status(500);
    next(err);
  }
});


export default router;