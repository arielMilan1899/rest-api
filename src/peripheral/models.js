//Peripheral models.js

//All stored peripherals
let peripherals = [];

//Peripheral object
class Peripheral {
    constructor(id, vendor, status, gatewayID) {
        this.id = id;
        this.vendor = vendor;
        this.status = status;
        this.gatewayID = gatewayID;
        this.createdOn = Date.now();
    }
}

module.exports = {
    Peripheral,
    peripherals
};
