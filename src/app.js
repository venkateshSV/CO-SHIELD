App = {

    contracts:{},

    load: async () => {
        await App.loadWeb3()
        await App.loadAccount()
        await App.loadContract()
        // console.clear()                 //CLEARING CONSOLE FOR EASE; REMOVE THIS IF ERROR APPEARS TO HAPPEN
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
        const distributorData = await $.getJSON('DistributorData.json')
        const vaccineData = await $.getJSON('VaccineData.json')

        App.contracts.ConsumerData = TruffleContract(consumerData)
        App.contracts.DistributorData = TruffleContract(distributorData)
        App.contracts.VaccineData = TruffleContract(vaccineData)

        App.contracts.ConsumerData.setProvider(App.web3Provider)
        App.contracts.DistributorData.setProvider(App.web3Provider)
        App.contracts.VaccineData.setProvider(App.web3Provider)

        App.consumerData = await App.contracts.ConsumerData.deployed()
        App.distributorData = await App.contracts.DistributorData.deployed()
        App.vaccineData = await App.contracts.VaccineData.deployed()
    },

    giveOutput: (Out) => {
        const _out = $('#output')
        _out.val(Out)
    },

    addConsumer: async () => {
        const name = $('#consumer-name').val()
        const aId = $('#consumer-unique-id').val()
        const age = $('#consumer-age').val()
        await App.consumerData.AddConsumer(aId, name, age)

        status = await App.consumerData.getStatus()
        $('input').val('')
        if(status=='true')
          App.giveOutput(1)
        else
          App.giveOutput(0)
    },

    getConsumer: async () => {
        var aId = $('#get-consumer-unique-id').val()
        const consCount = await App.consumerData.consCount()
        var isThere=0

        for(var i=1; i<=consCount; i++) {
            var _consumers = await App.consumerData.consumers(i)
            var _aId = _consumers[1].toNumber();
            if(aId==_aId) {
                isThere=1
                var obj = { name: _consumers[2], age: _consumers[3].toNumber(), uniqueId: _consumers[1].toNumber(), vaccinated: _consumers[4], vaccineId: _consumers[5]};
                var consumerJSON = JSON.stringify(obj);
                break;
            }
        }
        
        $('input').val('')
        if(isThere==1)
            App.giveOutput(consumerJSON)    //Gives JSON of person if exists
        else   
            App.giveOutput(0)               //Gives 0 output if person doesnt exists
    },

    toggleVaccinated: async () => {
      const aId = $('#vaccinated-aId').val()
      const appliedVaccineId = $('#applied-vaccine-id').val()
      await App.consumerData.toggleVaccinated(aId, appliedVaccineId)
      await App.vaccineData.ConsumeVaccine(appliedVaccineId, aId)

      $('input').val('')
      const status1 = await App.consumerData.getStatus()
      const status2 = await App.vaccineData.getStatus()

      if(status1=='true' & status2=='true')
        App.giveOutput(1)
      else
        App.giveOutput(0)
    },

    addDistributor: async () => {
        const id = $('#distributor-id').val()
        const name = $('#distributor-name').val()
        const vaccineName = $('#distributor-vaccine-name').val()
        await App.distributorData.AddDistributor(id, name, vaccineName)

        status = await App.distributorData.getStatus()
        $('input').val('')
        if(status=='true')
          App.giveOutput(1)
        else
          App.giveOutput(0)
    },

    getVaccineData: async () => {
        const vaccineId = $('#vaccine-id').val()
        const vaccineCount = await App.vaccineData.vaccineCount()
        var isThere=false

        for(var i=1; i<=vaccineCount; i++) {
          var _vaccines = await App.vaccineData.vaccines(i)
          var _id = _vaccines[0].toNumber();
          if(_id==vaccineId) {
              isThere=true
              var obj = {"id": _vaccines[0], "vaccineName": _vaccines[1], "distributorName":_vaccines[2], "transporter":_vaccines[3], "temp":_vaccines[4], "loc":_vaccines[5], "consumed":_vaccines[6], "consumedBy":_vaccines[7]};
              var vaccineJSON = JSON.stringify(obj);
              break;
          }
        }

        $('input').val('')
        if(isThere==1)
            App.giveOutput(vaccineJSON)    //Gives JSON of person if exists
        else   
            App.giveOutput(0)               //Gives 0 output if person doesnt exists
    },

    addVaccine: async () => {
        const vaccineId = $('#add-vaccine-id').val()
        const vaccineName = $('#add-vaccine-name').val()
        const vaccineDistributor = $('#add-vaccine-dist-name').val()
        const vaccineTransporter = $('#add-vaccine-transporter-code').val()

        await App.vaccineData.AddVaccine(vaccineId, vaccineName, vaccineDistributor, vaccineTransporter)

        $('input').val('')
        const status = await App.vaccineData.getStatus()
        if(status=='true')
          App.giveOutput(1)
        else
          App.giveOutput(0)
    }

}

$(() => {
    $(window).load(() => {
      // var express = require("express")
      // var app = express()
      // app.listen(3000, () => {
      //   console.log("Server running on port 3000");
      // });
        App.load()
    })
})