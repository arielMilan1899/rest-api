//Gateway models.js
const {DoesNotExists} = require("../helpers/error");

//All stored gateways
let gateways = [];

//Gateway object
class Gateway {
    constructor(serialNumber, name, ipv4) {
        this.serialNumber = serialNumber;
        this.name = name;
        this.ipv4 = ipv4;
        this.peripherals = [];

        gateways.push(this);
    }

    //Update gateway
    update(name, ipv4) {
        this.name = name;
        this.ipv4 = ipv4;
    }

    //Remove gateway from storage
    remove() {
        gateways = gateways.filter(value => value.serialNumber !== this.serialNumber);

        for (let peripheral of this.peripherals) {
            peripheral.remove();
        }
    }

    //Get all stored gateways
    static all() {
        return gateways;
    }

    //Get a single gateway by serialNumber
    static get(serialNumber) {
        const gateway = gateways.find((gateway) => gateway.serialNumber === serialNumber);

        if (!gateway) {
            throw new DoesNotExists(Gateway.name)
        }

        return gateway;
    }
}


module.exports = {
    Gateway
};
