import express from 'express';
import {  confirmPurchase } from '../service/makeVaccinated';


const router = express.Router({ mergeParams: true });

router.post('/makevaccinated', async (req, res, next) => {
  try {
    const data = await confirmPurchase(req.body);
    var jsonData = JSON.stringify({success: 0, consumedVaccine: 0, consumedBy: 0})

    if(data!=0) {
        jsonData = data["events"]["VaccineConsumed"]["returnValues"]
        delete jsonData[0]
        delete jsonData[1]
        delete jsonData[2]
    }

    res.send(jsonData)
  } catch (err) {
    res.status(500);
    next(err);
  }
});


export default router;