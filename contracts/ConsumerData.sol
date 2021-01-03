pragma solidity ^0.5.0;

contract ConsumerData {
    uint public consCount = 0;

    struct Consumer {
        uint id;
        uint aId;
        string name;
        uint age;
        bool vaccinated;
    }

    mapping(uint => Consumer) public consumers;

    event ConsumerAdded(
        uint id,
        uint aId,
        string name,
        uint age,
        bool vaccinated
    );

    constructor() public {
        AddConsumer(0, 'genesis', 0);
    }

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
            consumers[consCount] = Consumer(consCount, _aId, _name, _age, false);
            emit ConsumerAdded(consCount, _aId, _name, _age, false);
        }
    }

    // function getCustomer(uint _aId) public {
    //     uint isPresent = 0;
    //     for(uint i = 0; i <= consCount; i++) {
    //         if(_aId == consumers[i].aId) {
    //             isPresent = i;
    //             break;
    //         }
    //     }
    // }

    event ConsumerVaccinated(
        uint aId,
        bool vaccinated
    );

    function toggleVaccinated(uint _id) public {
        Consumer memory _consumer = consumers[_id];
        _consumer.vaccinated = true;
        consumers[_id] = _consumer;
        emit ConsumerVaccinated(_consumer.aId, _consumer.vaccinated);
    }
}