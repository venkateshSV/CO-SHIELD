# Co-Shield

![Alt text](src/images/Co-Shield.png?raw=true"")

Co-Shield is a Blockchain-powered software system for smooth and secure distribution of any vaccine at the time of the Global Pandemic.

## Installation

Download [node.js](https://nodejs.org/en/download/) to install Co-Shield.

Download the whole code, and in the project folder, run the following command to install all the necessary packages for this project.

```bash
npm install
```

Next, start the ganache application with the following command and keep the terminal live. This will start Ganache with 10 accounts at the Network ID 100. Gas Limit is set to high to prevent any out of gas errors.

```bash
ganache-cli --networkId 100 -a 10 --gasPrice 1 --gasLimit 8000000
```

Now, in a new terminal, (keeping the previous one live) enter the following command to deploy Truffle Smart Contracts.

```bash
truffle migrate
```

Finally, to run the project, type the following command

```bash
npm start
```

Now, if all the steps are successfully executed, the project is ready to listen at port 8545 of localhost:

```
http://127.0.0.1:8545
```

## Usage

After successfully starting the project, you may make the post requests on the following routes. Post requests should be made in JSON format as mentioned below.

### Add Consumer Data

Listening at- /addconsumer

Input:

```JSON
{"aId": 1, "name": "Consumer1", "age": 1}
```

Output:

```JSON
{"success":"1","aId":"1","name":"Consumer1","age":"1","vaccinated":false,"vacId":"0"}
```

### Get Consumer Data

Listening at- /getconsumer

Input:

```JSON
{"aId": 1}
```

Output:

```JSON
{"success":"1","aId":"1","name":"Consumer1","age":"1","vaccinated":false,"vacId":"0"}
```

### Add Manufacturer/Distributor Data

Listening at- /adddistributor

Input:

```JSON
{"id": 1, "name": "name1", "vaccineName": "vaccine1"}
```

Output:

```JSON
{"success":"1","id":"1","name":"name1","vaccineName":"vaccine1"}
```

### Get Manufacturer/Distributor Data

Listening at- /getdistributor

Input:

```JSON
{"id": 1}
```

Output:

```JSON
{"success":"1","id":"1","name":"name1","vaccineName":"vaccine1"}
```

### Add Vaccine Data

Listening at- /addvaccine

Input:

```JSON
{"id": 1, "vaccineName": "vaccine1", "distributorName": "distributorname1", "transporter": "transporter1"}
```

Output:

```JSON
{"success":"1","id":"1","vaccineName":"vaccine1","distributorName":"distributorname1","transporter":"transporter1"}
```

### Get Vaccine Data

Listening at- /getvaccine

Input:

```JSON
{"id": 1}
```

Output:

```JSON
{"success":"1","id":"1","vaccineName":"vaccine1","distributorName":"distributorname1","transporter":"transporter1","temp":"100","loc":"N/A","consumed":false,"consumedBy":"0"}
```

### Consume Vaccine

Listening at- /makevaccinated

Input:

```JSON
{"id": 1, "aId": 1}
```

Output:

```JSON
{"success":"1","consumedVaccine":"1","consumedBy":"1"}
```

### Wrong/Invalid Inputs

If the user provides an invalid input, the success value will be 0, else, it will remain 1.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
