"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _addConsumer = _interopRequireDefault(require("./routes/addConsumer"));

var _addDistributor = _interopRequireDefault(require("./routes/addDistributor"));

var _addVaccine = _interopRequireDefault(require("./routes/addVaccine"));

var _getConsumer = _interopRequireDefault(require("./routes/getConsumer"));

var _getDistributor = _interopRequireDefault(require("./routes/getDistributor"));

var _getDistributorByIndex = _interopRequireDefault(require("./routes/getDistributorByIndex"));

var _getVaccine = _interopRequireDefault(require("./routes/getVaccine"));

var _makeVaccinated = _interopRequireDefault(require("./routes/makeVaccinated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use(_express.default.json());
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use((0, _cors.default)({
  origin: '*',
  credentials: true
}));
app.get('/checkserver', (req, res) => res.sendStatus(200));
app.use(_addConsumer.default);
app.use(_addDistributor.default);
app.use(_addVaccine.default);
app.use(_getConsumer.default);
app.use(_getDistributor.default);
app.use(_getDistributorByIndex.default);
app.use(_getVaccine.default);
app.use(_makeVaccinated.default);
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error(err);
  return res.status(res.statusCode || 500).send({
    message: err.message
  });
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