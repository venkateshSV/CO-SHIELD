pragma solidity ^0.5.0;

contract DistributorData {
    uint public distCount = 0;
    bool success = true;

    struct Distributor {
        uint id;
        string name;
        string vaccineName;
    }

    function getStatus() view public returns (bool) {
        return success;
    }

    mapping(uint => Distributor) public distributors;

    constructor() public {
        AddDistributor(0, 'genesis', 'N/A');
    }

    event DistributorAdded (
        uint id,
        string name,
        string vaccineName
    );

    function AddDistributor(uint _id, string memory _name, string memory _vaccineName) public {
        bool proceed = true;
        for(uint i = 0; i <= distCount; i++) {
            if(_id == distributors[i].id) {
                proceed = false;
                break;
            }
        }
        if(proceed) {
            distCount ++;
            distributors[distCount] = Distributor(_id, _name, _vaccineName);
            emit DistributorAdded(_id, _name, _vaccineName);
            success = true;
        }
        else
            success = false;
    }
}