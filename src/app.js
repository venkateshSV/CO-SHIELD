App = {

    contracts:{},

    load: async () => {
        await App.loadWeb3()
        await App.loadAccount()
        await App.loadContract()
        // await App.giveOutput()
    },

    loadWeb3: async () => {
        if (typeof web3 !== 'undefined') {
          App.web3Provider = web3.currentProvider
          web3 = new Web3(web3.currentProvider)
        } else {
          window.alert("Please connect to Metamask.")
        }
        // Modern dapp browsers...
        if (window.ethereum) {
          window.web3 = new Web3(ethereum)
          try {
            // Request account access if needed
            await ethereum.enable()
            // Acccounts now exposed
            web3.eth.sendTransaction({/* ... */})
          } catch (error) {
            // User denied account access...
          }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
          App.web3Provider = web3.currentProvider
          window.web3 = new Web3(web3.currentProvider)
          // Acccounts always exposed
          web3.eth.sendTransaction({/* ... */})
        }
        // Non-dapp browsers...
        else {
          console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    
    },

    loadAccount: async () => {
        App.account = web3.eth.accounts[0]
        console.log(App.account)
    },

    loadContract: async () => {
        const consumerData = await $.getJSON('ConsumerData.json')
        App.contracts.ConsumerData = TruffleContract(consumerData)
        App.contracts.ConsumerData.setProvider(App.web3Provider)
        
        App.consumerData = await App.contracts.ConsumerData.deployed()
    },

    giveOutput: (Out) => {
        const _out = $('#output')
        _out.val(Out)
    },

    addConsumer: async () => {
        const name = $('#name').val()
        const aId = $('#unique-id').val()
        const age = $('#age').val()
        await App.consumerData.AddConsumer(aId, name, age)
        App.giveOutput(1)
    },

    toggleVaccinated: async () => {
        var aId = $('#vaccinated-aId').val()
        const consCount = await App.consumerData.consCount()
        var isThere=0

        for(var i=1; i<=consCount; i++) {
            var _consumers = await App.consumerData.consumers(i)
            var _aId = _consumers[1].toNumber();
            if(aId==_aId) {
                isThere=1
                var obj = { name: _consumers[2], age: _consumers[3].toNumber(), uniqueId: _consumers[1].toNumber(), vaccinated: _consumers[4] };
                var consumerJSON = JSON.stringify(obj);
                break;
            }
        }
        
        if(isThere==1)
            App.giveOutput(consumerJSON)    //Gives JSON of person if exists
        else   
            App.giveOutput(0)               //Gives 0 output if person doesnt exists
    }

}

$(() => {
    $(window).load(() => {
        App.load()
    })
})