//Peripheral models.js
const {DoesNotExists, MaxGatewayPeripheralsError} = require("../helpers/error");
const {MAX_GATEWAY_PERIPHERALS} = require('../../config');

//Peripheral object
class Peripheral {

    constructor(id, vendor, status, gatewaySerialNumber) {
        this.id = id;
        this.vendor = vendor;
        this.status = status;
        //Foreign key to gateway
        this.gatewaySerialNumber = gatewaySerialNumber;
        this.createdOn = Date.now();
    }

    static get repository() {
        return PeripheralRepository
    }
}

class Storage {
    //All stored peripherals
    static data = [];
    //Current id for peripherals
    static currentId = 0;
}

class PeripheralRepository {

    //Get a single peripheral by id
    static get(id) {
        const peripheral = Storage.data.find((peripheral) => peripheral.id === id);

        if (!peripheral) {
            throw new DoesNotExists(Peripheral.name)
        }

        return peripheral;
    }

    //Get all stored peripherals by a gatewaySerialNumber
    static filter(gatewaySerialNumber) {
        return Storage.data.filter(value => value.gatewaySerialNumber === gatewaySerialNumber);
    }

    //Add peripheral
    static add(vendor, status, gatewaySerialNumber) {

        const gateway = Gateway.repository.get(gatewaySerialNumber);

        if (gateway.peripherals.length === MAX_GATEWAY_PERIPHERALS) {
            throw new MaxGatewayPeripheralsError();
        }

        const peripheral = new Peripheral(Storage.currentId++, vendor, status, gatewaySerialNumber);

        Storage.data.push(peripheral);

        return peripheral;
    }

    //Update peripheral
    static update(peripheral, vendor, status, gatewaySerialNumber) {
        peripheral.vendor = vendor;
        peripheral.status = status;
        peripheral.gatewaySerialNumber = gatewaySerialNumber;
    }

    //Remove peripheral from storage
    static remove(peripheral) {
        Storage.data = Storage.data.filter(value => value.id !== peripheral.id);
    }


}

module.exports = {
    Peripheral
};
