//Gateway models.js
const {DoesNotExists} = require("../helpers/error");

//All stored gateways
let gateways = [];

//Gateway object
class Gateway {
    constructor(id, name, ipv4) {
        this.id = id;
        this.name = name;
        this.ipv4 = ipv4;
        this.peripherals = [];
    }

    //Get all stored gateways
    static all() {
        return gateways;
    }

    //Get a single gateway by id
    static get(id) {
        const gateway = gateways.find((gateway) => gateway.id === id);

        if (!gateway) {
            throw new DoesNotExists(Gateway.name)
        }

        return gateway;
    }
}


module.exports = {
    Gateway,
    gateways
};
