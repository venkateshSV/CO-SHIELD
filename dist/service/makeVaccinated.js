"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.confirmPurchase = void 0;

var _Web = _interopRequireDefault(require("../Web3"));

var _VaccineData = _interopRequireDefault(require("../../build/contracts/VaccineData.json"));

var _ConsumerData = _interopRequireDefault(require("../../build/contracts/ConsumerData.json"));

var _truffleContract = _interopRequireDefault(require("truffle-contract"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Contract = (0, _truffleContract.default)(_VaccineData.default);
const Contract2 = (0, _truffleContract.default)(_ConsumerData.default);
let ContractInstance = new _Web.default.eth.Contract(Contract.abi, Contract.networks[100].address);
let ContractInstance2 = new _Web.default.eth.Contract(Contract2.abi, Contract2.networks[100].address);

let confirmPurchase = async input => {
  try {
    const accounts = await _Web.default.eth.getAccounts();
    var res = 0;
    const check = await ContractInstance2.methods.GetConsumerData(input['aId']).send({
      from: accounts[1],
      gas: 1000000
    });
    console.log(check["events"]["ThrowConsumerData"]["returnValues"]["success"]);

    if (check["events"]["ThrowConsumerData"]["returnValues"]["success"] == 1) {
      res = await ContractInstance.methods.ConsumeVaccine(input['id'], input['aId']).send({
        from: accounts[1],
        gas: 1000000
      });
      await ContractInstance2.methods.toggleVaccinated(input['aId'], input['id']).send({
        from: accounts[1],
        gas: 1000000
      });
    }

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

exports.confirmPurchase = confirmPurchase;