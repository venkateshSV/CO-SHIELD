pragma solidity ^0.5.0;

contract VaccineData {
    uint public vaccineCount = 0;

    struct Vaccine {
        uint id;
        string vaccineName;
        string distributorName;
        string transporter;
        int temp;
        string loc;
        bool consumed;
        uint consumedBy;
    }

    constructor() public {
        AddVaccine(0, 'genesis', 'N/A', 'N/A');
        AddVaccine(1, 'VacSafe', 'Sun Pharmaceutical', 'VacSafeTransporter');
        AddVaccine(2, 'NoVirus', 'Bharat Biotech', 'NoVirusTransporter');
        AddVaccine(3, 'CoviShield', 'Serum Institute', 'CoviShieldTransporter');
        AddVaccine(4, 'GoCorona', 'Zydus Cadila', 'GoCoronaTransporter');
        AddVaccine(5, 'CoronaGo', 'Panacea Biotec', 'CoronaGoTransporter');
        AddVaccine(6, 'Covaxin', 'Indian Immunologicals', 'CovaxinTransporter');
        AddVaccine(7, 'VaxCov', 'Mynvax', 'VaxCovTransporter');
        AddVaccine(8, 'NoCorona', 'Biological E', 'NoCoronaTransporter');
    }

    mapping(uint => Vaccine) public vaccines;

    event IotDataUpdated(
        uint success,
        uint id,
        int temp,
        string loc
    );

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
            emit IotDataUpdated(1, _id, _temp, _loc);
        }
        else
            emit IotDataUpdated(0, 0, 0, '');
    }

    event VaccineAdded(
        uint success,
        uint id,
        string vaccineName,
        string distributorName,
        string transporter
    );

    function AddVaccine(uint _id, string memory _vaccineName, string memory _distributorName, string memory _transporter) public {
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
            emit VaccineAdded(1, _id, _vaccineName, _distributorName, _transporter);
        }
        else
            emit VaccineAdded(0, 0, '', '', '');
    }

    event VaccineConsumed(
        uint success,
        uint consumedVaccine,
        uint consumedBy
    );

    function ConsumeVaccine(uint _id, uint _aId) public {
        bool present = false;
        uint i = 1;

        for(i = 1;i<=vaccineCount;i++) {
            if(_id == vaccines[i].id) {
                present = true;
                break;
            }
        }

        if(present && !vaccines[i].consumed) {
            Vaccine memory _vaccine = vaccines[i];
            _vaccine.consumed = true;
            _vaccine.consumedBy = _aId;
            vaccines[i] = _vaccine;
            emit VaccineConsumed(1, _id, _aId);
        }
        else
            emit VaccineConsumed(0, 0, 0);
    }

    event ThrowVaccineData(
        uint success,
        uint id,
        string vaccineName,
        string distributorName,
        string transporter,
        int temp,
        string loc,
        bool consumed,
        uint consumedBy
    );

    function GetVaccineData(uint _id) public {
        bool present = false;
        uint i = 1;

        for(i = 1;i<=vaccineCount;i++) {
            if(_id == vaccines[i].id) {
                present = true;
                break;
            }
        }

        if(present)
            emit ThrowVaccineData(1, vaccines[i].id, vaccines[i].vaccineName, vaccines[i].distributorName, vaccines[i].transporter, vaccines[i].temp, vaccines[i].loc, vaccines[i].consumed, vaccines[i].consumedBy);
        else
            emit ThrowVaccineData(0, 0, '', '', '', 0, '', false, 0);
    }

}