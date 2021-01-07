"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.confirmPurchase = void 0;

var _Web = _interopRequireDefault(require("../Web3"));

var _ConsumerData = _interopRequireDefault(require("../../build/contracts/ConsumerData.json"));

var _truffleContract = _interopRequireDefault(require("truffle-contract"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Contract = (0, _truffleContract.default)(_ConsumerData.default);
let ContractInstance = new _Web.default.eth.Contract(Contract.abi, Contract.networks[100].address);

let confirmPurchase = async input => {
  try {
    const accounts = await _Web.default.eth.getAccounts();
    const res = await ContractInstance.methods.AddConsumer(input['aId'], input['name'], input['age'], input['password']).send({
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