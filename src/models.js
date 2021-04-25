//models.js
const {DoesNotExists} = require("./helpers/error");

let gateways = [];
let peripherals = [];

class Gateway {
    constructor(id, name, ipv4) {
        this.id = id;
        this.name = name;
        this.ipv4 = ipv4;
        this.peripherals = [];
    }

    static all() {
        return gateways;
    }

    static get(id) {
        const gateway = gateways.find((gateway) => gateway.id === id);

        if (!gateway) {
            throw new DoesNotExists(Gateway.name)
        }

        return gateway;
    }
}

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
    Gateway,
    Peripheral,
    gateways,
    peripherals
};
