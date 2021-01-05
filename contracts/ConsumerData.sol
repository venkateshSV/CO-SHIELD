pragma solidity ^0.5.0;

contract ConsumerData {
    uint public consCount = 0;
    bool success = true;

    struct Consumer {
        uint id;
        uint aId;
        string name;
        uint age;
        bool vaccinated;
        uint vacId;
    }

    function getStatus() view public returns (bool) {
        return success;
    }

    mapping(uint => Consumer) public consumers;

    constructor() public {
        AddConsumer(0, 'genesis', 0);
    }

    event ConsumerAdded(
        uint id,
        uint aId,
        string name,
        uint age,
        bool vaccinated,
        uint vacId
    );

    function AddConsumer(uint _aId, string memory _name, uint _age) public {
        bool proceed = true;
        for(uint i = 0; i <= consCount; i++) {
            if(_aId == consumers[i].aId) {
                proceed = false;
                break;
            }
        }
        if(proceed) {
            consCount ++;
            consumers[consCount] = Consumer(consCount, _aId, _name, _age, false, 0);
            emit ConsumerAdded(consCount, _aId, _name, _age, false, 0);
            success = true;
        }
        else
            success = false;
    }

    event ConsumerVaccinated(
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
            emit ConsumerVaccinated(_consumer.aId, _consumer.vacId, _consumer.vaccinated);
            success = true;
        }
        else
            success = false;
    }
}