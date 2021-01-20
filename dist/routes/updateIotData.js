"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _updateIotData = require("../service/updateIotData");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router({
  mergeParams: true
});

router.post('/updateIotData', async (req, res, next) => {
  try {
    const data = await (0, _updateIotData.confirmPurchase)(req.body);
    console.log(data);
    var jsonData = data["events"]["IotDataUpdated"]["returnValues"];
    delete jsonData[0];
    delete jsonData[1];
    delete jsonData[2];
    delete jsonData[3];
    delete jsonData[4];
    delete jsonData[5];
    res.send(jsonData);
  } catch (err) {
    res.status(500);
    next(err);
  }
});
var _default = router;
exports.default = _default;