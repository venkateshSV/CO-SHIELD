pragma solidity ^0.5.0;

contract ConsumerData {
    uint public consCount = 0;

    struct Consumer {
        uint id;
        string name;
        uint age;
        bool vaccinated;
    }

    mapping(uint => Consumer) public consumers;

    event ConsumerAdded(
        uint id,
        string name,
        uint age,
        bool vaccinated
    );

    function AddConsumer(string memory _name, uint _age) public {
        consCount ++;
        consumers[consCount] = Consumer(consCount, _name, _age, false);
        emit ConsumerAdded(consCount, _name, _age, false);
    }

    event ConsumerVaccinated(
        uint id,
        bool vaccinated
    );

    function toggleVaccinated(uint _id) public {
        Consumer memory _consumer = consumers[_id];
        _consumer.vaccinated = !_consumer.vaccinated;
        consumers[_id] = _consumer;
        emit ConsumerVaccinated(_id, _consumer.vaccinated);
    }
}