//Peripheral models.js

//All stored peripherals
let peripherals = [];

//Peripheral object
class Peripheral {
    constructor(id, vendor, status, gatewaySerialNumber) {
        this.id = id;
        this.vendor = vendor;
        this.status = status;
        this.gatewaySerialNumber = gatewaySerialNumber;
        this.createdOn = Date.now();
    }

    //Update gateway
    update(vendor, status, gatewaySerialNumber) {
        this.vendor = vendor;
        this.status = status;
        this.gatewaySerialNumber = gatewaySerialNumber;
    }

    //Remove gateway from storage
    remove() {
        peripherals = peripherals.filter(value => value.id !== this.id);
    }

    //Get all stored peripherals by a gatewaySerialNumber
    static filter(gatewaySerialNumber) {
        return peripherals.filter(value => value.gatewaySerialNumber === gatewaySerialNumber);
    }
}

module.exports = {
    Peripheral
};
