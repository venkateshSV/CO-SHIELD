"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _makeVaccinated = require("../service/makeVaccinated");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router({
  mergeParams: true
});

router.post('/makevaccinated', async (req, res, next) => {
  try {
    const data = await (0, _makeVaccinated.confirmPurchase)(req.body);
    var jsonData = JSON.stringify({
      success: 0,
      consumedVaccine: 0,
      consumedBy: 0
    });

    if (data != 0) {
      jsonData = data["events"]["VaccineConsumed"]["returnValues"];
      delete jsonData[0];
      delete jsonData[1];
      delete jsonData[2];
    }

    res.send(jsonData);
  } catch (err) {
    res.status(500);
    next(err);
  }
});
var _default = router;
exports.default = _default;