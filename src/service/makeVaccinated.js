import Web3 from '../Web3';
import ContractData from '../../build/contracts/VaccineData.json'
import ContractData2 from '../../build/contracts/ConsumerData.json'
import contract from 'truffle-contract';

const Contract = contract(ContractData);
const Contract2 = contract(ContractData2);
let ContractInstance = new Web3.eth.Contract(Contract.abi, Contract.networks[100].address);
let ContractInstance2 = new Web3.eth.Contract(Contract2.abi, Contract2.networks[100].address);

let confirmPurchase = async (input) => {
    try {
        const accounts = await Web3.eth.getAccounts();
        var res=0
        const check = await ContractInstance2.methods.GetConsumerData(input['aId']).send({
            from: accounts[1], gas: 1000000
        })

        console.log(check["events"]["ThrowConsumerData"]["returnValues"]["success"])

        if(check["events"]["ThrowConsumerData"]["returnValues"]["success"]==1) {
            res = await ContractInstance.methods.ConsumeVaccine(input['id'], input['aId']).send({
                from: accounts[1], gas: 1000000
            })
            await ContractInstance2.methods.toggleVaccinated(input['aId'], input['id']).send({
                from: accounts[1], gas: 1000000
            })
        }

        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject(err);
    }
};

export {
     confirmPurchase,
};