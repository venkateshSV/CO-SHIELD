import Web3 from '../Web3';
import ContractData from '../../build/contracts/ConsumerData.json'
import contract from 'truffle-contract';

const Contract = contract(ContractData);
let ContractInstance = new Web3.eth.Contract(Contract.abi, Contract.networks[100].address);

let confirmPurchase = async (input) => {
    try {
        const accounts = await Web3.eth.getAccounts();
        const res = await ContractInstance.methods.AddConsumer(input['aId'], input['name'], input['age'], input['password']).send({
            from: accounts[1], gas: 1000000
        })
        console.log(res)

        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject(err);
    }
};

export {
     confirmPurchase,
};