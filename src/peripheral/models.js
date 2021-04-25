//Peripheral models.js
const {DoesNotExists} = require("../helpers/error");

//Peripheral object
class Peripheral {
    //All stored peripherals
    static #peripherals = [];
    //Current id for peripherals
    static #currentId = 0;

    constructor(vendor, status, gatewaySerialNumber) {
        this.id = Peripheral.#currentId;
        this.vendor = vendor;
        this.status = status;
        this.gatewaySerialNumber = gatewaySerialNumber;
        this.createdOn = Date.now();

        //push the new gateway to storage and increment currentId
        Peripheral.#peripherals.push(this);
        Peripheral.#currentId += 1;
    }

    //Update gateway
    update(vendor, status, gatewaySerialNumber) {
        this.vendor = vendor;
        this.status = status;
        this.gatewaySerialNumber = gatewaySerialNumber;
    }

    //Remove gateway from storage
    remove() {
        Peripheral.#peripherals = Peripheral.#peripherals.filter(value => value.id !== this.id);
    }

    //Get all stored peripherals by a gatewaySerialNumber
    static filter(gatewaySerialNumber) {
        return Peripheral.#peripherals.filter(value => value.gatewaySerialNumber === gatewaySerialNumber);
    }

    //Get a single peripheral by id
    static get(id) {
        const peripheral = Peripheral.#peripherals.find((peripheral) => peripheral.id === id);

        if (!peripheral) {
            throw new DoesNotExists(Peripheral.name)
        }

        return peripheral;
    }
}

module.exports = {
    Peripheral
};
