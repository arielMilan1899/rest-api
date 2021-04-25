//Gateway models.js
const {Peripheral} = require("../peripheral/models");
const {DoesNotExists} = require("../helpers/error");

//All stored gateways
let gateways = [];

//Gateway object
class Gateway {
    constructor(serialNumber, name, ipv4) {
        this.serialNumber = serialNumber;
        this.name = name;
        this.ipv4 = ipv4;

        //push the new gateway to storage
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

        const peripherals = Peripheral.filter(gateway.serialNumber);
        for (let peripheral of peripherals) {
            peripheral.remove();
        }
    }

    //Get all stored gateways
    static all() {
        return gateways.map(gateway => {
            gateway.peripherals = Peripheral.filter(gateway.serialNumber);
            return gateway;
        });
    }

    //Get a single gateway by serialNumber
    static get(serialNumber) {
        const gateway = gateways.find((gateway) => gateway.serialNumber === serialNumber);

        if (!gateway) {
            throw new DoesNotExists(Gateway.name)
        }

        gateway.peripherals = Peripheral.filter(gateway.serialNumber);

        return gateway;
    }
}


module.exports = {
    Gateway
};
