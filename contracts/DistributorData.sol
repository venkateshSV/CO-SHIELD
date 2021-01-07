pragma solidity ^0.5.0;

contract DistributorData {
    uint public distCount = 0;

    struct Distributor {
        uint index;
        uint id;
        string name;
        string vaccineName;
    }

    mapping(uint => Distributor) public distributors;

    constructor() public {
        AddDistributor(0, 'genesis', 'N/A');
        AddDistributor(1, 'Sun Pharmaceutical', 'VacSafe');
        AddDistributor(2, 'Bharat Biotech', 'NoVirus');
        AddDistributor(3, 'Serum Institute', 'CoviShield');
        AddDistributor(4, 'Zydus Cadila', 'GoCorona');
        AddDistributor(5, 'Panacea Biotec', 'CoronaGo');
        AddDistributor(6, 'Indian Immunologicals', 'Covaxin');
        AddDistributor(7, 'Mynvax', 'VaxCov');
        AddDistributor(8, 'Biological E', 'NoCorona');
    }

    event DistributorAdded (
        uint success,
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
            distributors[distCount] = Distributor(distCount, _id, _name, _vaccineName);
            emit DistributorAdded(1, _id, _name, _vaccineName);
        }
        else
            emit DistributorAdded(0, 0, '', '');
    }

    event ThrowDistributorData (
        uint success,
        uint id,
        string name,
        string vaccineName
    );

    function GetDistributorData(uint _id) public {
        bool proceed = false;
        uint i = 0;
        for(i = 0; i <= distCount; i++) {
            if(_id == distributors[i].id) {
                proceed = true;
                break;
            }
        }
        if(proceed)
            emit ThrowDistributorData(1, distributors[i].id, distributors[i].name, distributors[i].vaccineName);
        else
            emit ThrowDistributorData(0, 0, '', '');
    }

    function GetDistributorThroughIndex(uint _index) public  {
        uint i = _index;
        if(distCount >= _index )
            emit ThrowDistributorData(1, distributors[i].id, distributors[i].name, distributors[i].vaccineName);
        else
            emit ThrowDistributorData(0, 0, '', '');
    }
}