//Gateway models.js
const {Peripheral} = require("../peripheral/models");
const {DoesNotExists, UniqueConstrainError} = require("../helpers/error");

//Gateway object
class Gateway {
    constructor(serialNumber, name, ipv4) {
        this.serialNumber = serialNumber;
        this.name = name;
        this.ipv4 = ipv4;
    }

    get peripherals() {
        return Peripheral.repository.filter(this.serialNumber);
    };

    static get repository() {
        return GatewayRepository
    }
}

class Storage {
    static data = [];
}


class GatewayRepository {

    //Get all stored gateways
    static all() {
        return Storage.data;
    }

    //Get a single gateway by serialNumber
    static get(serialNumber) {
        const gateway = Storage.data.find((gateway) => gateway.serialNumber === serialNumber);

        if (!gateway) {
            throw new DoesNotExists(Gateway.name)
        }

        return gateway;
    }

    //Check if exists a gateway by the passed serialNumber
    static exists(serialNumber) {
        return Storage.data.find((gateway) => gateway.serialNumber === serialNumber);
    }

    //Add gateway
    static add(serialNumber, name, ipv4) {

        if (this.exists(serialNumber)) {
            throw new UniqueConstrainError('serialNumber');
        }

        const gateway = new Gateway(serialNumber, name, ipv4);

        Storage.data.push(gateway);

        return gateway;
    }

    //Update gateway
    static update(gateway, newName, newIpv4) {
        gateway.name = newName;
        gateway.ipv4 = newIpv4;
    }

    //Remove gateway from storage
    static remove(gateway) {
        Storage.data = Storage.data.filter(value => value.serialNumber !== gateway.serialNumber);

        for (let peripheral of gateway.peripherals) {
            Peripheral.repository.remove(peripheral);
        }
    }

    //Remove all gateways
    static removeAll() {
        for (let gateway of Storage.data) {
            for (let peripheral of gateway.peripherals) {
                Peripheral.repository.remove(peripheral);
            }
        }
        Storage.data = [];
    }
}


module.exports = {
    Gateway
};
