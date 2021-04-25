//Gateway models.js
const {Peripheral} = require("../peripheral/models");
const {DoesNotExists} = require("../helpers/error");

//Gateway object
class Gateway {
    //All stored gateways
    static #gateways = [];

    constructor(serialNumber, name, ipv4) {
        this.serialNumber = serialNumber;
        this.name = name;
        this.ipv4 = ipv4;

        //push the new gateway to storage
        Gateway.#gateways.push(this);
    }

    get peripherals() {
        return Peripheral.filter(this.serialNumber);
    };


    //Update gateway
    update(name, ipv4) {
        this.name = name;
        this.ipv4 = ipv4;
    }

    //Remove gateway from storage
    remove() {
        Gateway.#gateways = Gateway.#gateways.filter(value => value.serialNumber !== this.serialNumber);

        for (let peripheral of this.peripherals) {
            peripheral.remove();
        }
    }

    //Get all stored gateways
    static all() {
        return Gateway.#gateways;
    }

    //Get a single gateway by serialNumber
    static get(serialNumber) {
        const gateway = Gateway.#gateways.find((gateway) => gateway.serialNumber === serialNumber);

        if (!gateway) {
            throw new DoesNotExists(Gateway.name)
        }

        return gateway;
    }

    //Check if exists a gateway by the passed serialNumber
    static exists(serialNumber) {
        return Gateway.#gateways.find((gateway) => gateway.serialNumber === serialNumber);
    }
}


module.exports = {
    Gateway
};
