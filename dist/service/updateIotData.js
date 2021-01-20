"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.confirmPurchase = void 0;

var _Web = _interopRequireDefault(require("../Web3"));

var _VaccineData = _interopRequireDefault(require("../../build/contracts/VaccineData.json"));

var _truffleContract = _interopRequireDefault(require("truffle-contract"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Contract = (0, _truffleContract.default)(_VaccineData.default);
let ContractInstance = new _Web.default.eth.Contract(Contract.abi, Contract.networks[100].address);

let confirmPurchase = async input => {
  try {
    const accounts = await _Web.default.eth.getAccounts();
    const res = await ContractInstance.methods.UpdateIotData(input['id'], input['temp'], input['location'], input['password']).send({
      from: accounts[1],
      gas: 1000000
    });
    console.log(res);
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

exports.confirmPurchase = confirmPurchase;