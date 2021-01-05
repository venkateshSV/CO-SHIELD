pragma solidity ^0.5.0;

contract VaccineData {
    uint public vaccineCount = 0;
    bool success = true;

    struct Vaccine {
        uint id;
        string vaccineName;
        string distributorName;
        uint transporter;
        int temp;
        string loc;
        bool consumed;
        uint consumedBy;
    }

    function getStatus() view public returns (bool) {
        return success;
    }

    mapping(uint => Vaccine) public vaccines;

    function UpdateIotData(uint _id, int _temp, string memory _loc) public {
        bool present = false;
        for(uint i = 1;i<=vaccineCount;i++) {
            if(_id == vaccines[i].id) {
                present = true;
                break;
            }
        }

        if(present) {
            Vaccine memory _vaccine = vaccines[_id];
            _vaccine.temp = _temp;
            _vaccine.loc = _loc;
            vaccines[_id] = _vaccine;
            success = true;
        }
        else
            success = false;
    }

    function AddVaccine(uint _id, string memory _vaccineName, string memory _distributorName, uint _transporter) public {
        bool proceed = true;
        for(uint i = 0; i <= vaccineCount; i++) {
            if(_id == vaccines[i].id) {
                proceed = false;
                break;
            }
        }
        
        if(proceed) {
            vaccineCount ++;
            vaccines[vaccineCount] = Vaccine(_id, _vaccineName, _distributorName, _transporter, 100, 'N/A', false, 0);
            success = true;
        }
        else
            success = false;
    }

    function ConsumeVaccine(uint _id, uint _aId) public {
        bool present = false;
        uint i = 1;

        for(i = 1;i<=vaccineCount;i++) {
            if(_id == vaccines[i].id) {
                present = true;
                break;
            }
        }

        if(present) {
            Vaccine memory _vaccine = vaccines[i];
            _vaccine.consumedBy = _aId;
            vaccines[i] = _vaccine;
            success = true;
        }
        else
            success = false;
    }

}