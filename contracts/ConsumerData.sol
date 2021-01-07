pragma solidity ^0.5.0;

contract ConsumerData {
    uint public consCount = 0;

    struct Consumer {
        uint aId;
        string name;
        uint age;
        bool vaccinated;
        uint vacId;
        string password;
    }

    mapping(uint => Consumer) public consumers;

    constructor() public {
        AddConsumer(0, 'genesis', 0, '');
    }

    event ConsumerAdded(
        uint success,
        uint aId,
        string name,
        uint age,
        bool vaccinated,
        uint vacId
    );

    function AddConsumer(uint _aId, string memory _name, uint _age, string memory _password) public {
        bool proceed = true;
        for(uint i = 0; i <= consCount; i++) {
            if(_aId == consumers[i].aId) {
                proceed = false;
                break;
            }
        }
        if(proceed) {
            consCount ++;
            consumers[consCount] = Consumer(_aId, _name, _age, false, 0, _password);
            emit ConsumerAdded(1, _aId, _name, _age, false, 0);
        }
        else
            emit ConsumerAdded(0, 0, '', 0, false, 0);
    }

    event ThrowConsumerData(
        uint success,
        uint aId,
        string name,
        uint age,
        bool vaccinated,
        uint vacId
    );

    function GetConsumerData(uint _aId, string memory _password) public {
        bool proceed = false;
        uint i = 0;
        for(i = 0; i <= consCount; i++) {
            if(_aId == consumers[i].aId && keccak256(abi.encodePacked(_password)) == keccak256(abi.encodePacked(consumers[i].password))) {
                proceed = true;
                break;
            }
        }

        if(proceed)
            emit ThrowConsumerData(1, consumers[i].aId, consumers[i].name, consumers[i].age, consumers[i].vaccinated, consumers[i].vacId);
        else
            emit ThrowConsumerData(0, 0, '', 0, false, 0);
    }

    event ConsumerVaccinated(
        uint success,
        uint aId,
        uint vacId,
        bool vaccinated
    );

    function toggleVaccinated(uint _aId, uint _vacId) public {
        bool present = false;
        uint _id = 0;
        for(uint i = 1; i <= consCount; i++) {
            if(_aId == consumers[i].aId){
                present = true;
                _id = i;
                break;
            }
        }
        if(present) {
            Consumer memory _consumer = consumers[_id];
            _consumer.vaccinated = true;
            _consumer.vacId = _vacId;
            consumers[_id] = _consumer;
            emit ConsumerVaccinated(1, _consumer.aId, _consumer.vacId, _consumer.vaccinated);
        }
        else
            emit ConsumerVaccinated(0, 0, 0, false);
    }
}