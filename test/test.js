let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../index");
let {Gateway} = require("../src/gateway/models");
let {Peripheral} = require("../src/peripheral/models");

// Assertion
chai.should();
chai.use(chaiHttp);

describe("Test Gateway endpoints", () => {
    beforeEach((done) => { //Before each test we empty the database
        Gateway.repository.removeAll();
        Peripheral.repository.removeAll();
        done();
    });

    describe("Test GET route /gateways", () => {
        it("It should return all gateways", (done) => {
            Gateway.repository.add('serialNumber', 'name', '192.168.100.1');
            Gateway.repository.add('serialNumber 2', 'name 2', '192.168.100.2');
            Peripheral.repository.add('vendor', 'online', 'serialNumber');
            chai.request(app)
                .get("/gateways/")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.data.should.be.a('array');
                    response.body.data.length.should.be.eq(2);
                    const gateway = response.body.data[0];
                    gateway.serialNumber.should.be.eq('serialNumber');
                    gateway.name.should.be.eq('name');
                    gateway.ipv4.should.be.eq('192.168.100.1');
                    gateway.peripherals.should.be.a('array');
                    gateway.peripherals.length.should.be.eq(1);
                    done();
                });
        });
        it("It should return the gateway", (done) => {
            Gateway.repository.add('serialNumber', 'name', '192.168.100.1');
            Peripheral.repository.add('vendor', 'online', 'serialNumber');
            const data = {
                serialNumber: 'serialNumber'
            };
            chai.request(app)
                .get("/gateways")
                .send(data)
                .end((err, response) => {
                    response.should.have.status(200);
                    const gateway = response.body.data;
                    gateway.serialNumber.should.be.eq('serialNumber');
                    gateway.name.should.be.eq('name');
                    gateway.ipv4.should.be.eq('192.168.100.1');
                    gateway.peripherals.should.be.a('array');
                    gateway.peripherals.length.should.be.eq(1);
                    done();
                });
        });
        it("It should return an error", (done) => {
            const data = {
                serialNumber: 'serialNumber'
            };
            chai.request(app)
                .get("/gateways")
                .send(data)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.errors.should.be.eq('Gateway does not exists');
                    done();
                });
        });
    });

    describe("Test POST route /gateways/add", () => {
        it("It should create a new gateway", (done) => {
            const data = {
                serialNumber: 'serialNumber',
                name: 'name',
                ipv4: '192.168.100.1'
            };
            chai.request(app)
                .post("/gateways/add")
                .send(data)
                .end((err, response) => {
                    response.should.have.status(200);
                    const gateway = response.body.data;
                    gateway.serialNumber.should.be.eq('serialNumber');
                    gateway.name.should.be.eq('name');
                    gateway.ipv4.should.be.eq('192.168.100.1');
                    gateway.peripherals.should.be.a('array');
                    gateway.peripherals.length.should.be.eq(0);
                    //Check that already exist the gateway
                    Gateway.repository.all().length.should.be.eq(1);
                    done();
                });
        });
        it("It should throw an error on serialNumber field", (done) => {
            Gateway.repository.add('serialNumber', 'name', '192.168.100.1');
            const data = {
                serialNumber: 'serialNumber',
                name: 'name 2',
                ipv4: '192.168.100.2'
            };
            chai.request(app)
                .post("/gateways/add")
                .send(data)
                .end((err, response) => {
                    response.should.have.status(400);
                    const errors = response.body.errors;
                    errors.length.should.be.eq(1);
                    const error = errors[0];
                    error.value.should.be.eq('serialNumber');
                    error.msg.should.be.eq('serialNumber field must be unique');
                    error.param.should.be.eq('serialNumber');
                    error.location.should.be.eq('body');
                    done();
                });
        });
        it("It should throw an error on name field", (done) => {
            const data = {
                serialNumber: 'serialNumber',
                ipv4: '192.168.100.2'
            };
            chai.request(app)
                .post("/gateways/add")
                .send(data)
                .end((err, response) => {
                    response.should.have.status(400);
                    const errors = response.body.errors;
                    errors.length.should.be.eq(1);
                    const error = errors[0];
                    error.msg.should.be.eq('name field must be a valid string');
                    error.param.should.be.eq('name');
                    error.location.should.be.eq('body');
                    done();
                });
        });
        it("It should throw an error on ipv4 field", (done) => {
            const data = {
                serialNumber: 'serialNumber',
                name: 'name',
                ipv4: '192.168.100.as2'
            };
            chai.request(app)
                .post("/gateways/add")
                .send(data)
                .end((err, response) => {
                    response.should.have.status(400);
                    const errors = response.body.errors;
                    errors.length.should.be.eq(1);
                    const error = errors[0];
                    error.msg.should.be.eq('invalid IP address');
                    error.param.should.be.eq('ipv4');
                    error.location.should.be.eq('body');
                    done();
                });
        });
    });

    describe("Test PUT route /gateways/update", () => {
        it("It should update a gateway", (done) => {
            Gateway.repository.add('serialNumber', 'name', '192.168.100.1');
            const data = {
                serialNumber: 'serialNumber',
                name: 'name',
                ipv4: '192.168.100.2'
            };
            chai.request(app)
                .put("/gateways/update")
                .send(data)
                .end((err, response) => {
                    response.should.have.status(200);
                    const gateway = response.body.data;
                    gateway.serialNumber.should.be.eq('serialNumber');
                    gateway.name.should.be.eq('name');
                    gateway.ipv4.should.be.eq('192.168.100.2');
                    gateway.peripherals.should.be.a('array');
                    gateway.peripherals.length.should.be.eq(0);
                    done();
                });
        });
        it("It should throw an error on serialNumber field", (done) => {
            Gateway.repository.add('serialNumber', 'name', '192.168.100.1');
            const data = {
                serialNumber: 'serialNumber 2',
                name: 'name',
                ipv4: '192.168.100.2'
            };
            chai.request(app)
                .put("/gateways/update")
                .send(data)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.errors.should.be.eq('Gateway does not exists');
                    done();
                });
        });
        it("It should throw an error on name field", (done) => {
            Gateway.repository.add('serialNumber', 'name', '192.168.100.1');
            const data = {
                serialNumber: 'serialNumber',
                ipv4: '192.168.100.2'
            };
            chai.request(app)
                .put("/gateways/update")
                .send(data)
                .end((err, response) => {
                    response.should.have.status(400);
                    const errors = response.body.errors;
                    errors.length.should.be.eq(1);
                    const error = errors[0];
                    error.msg.should.be.eq('name field must be a valid string');
                    error.param.should.be.eq('name');
                    error.location.should.be.eq('body');
                    done();
                });
        });
        it("It should throw an error on ipv4 field", (done) => {
            Gateway.repository.add('serialNumber', 'name', '192.168.100.1');
            const data = {
                serialNumber: 'serialNumber',
                name: 'name',
                ipv4: '192.168.100.as2'
            };
            chai.request(app)
                .put("/gateways/update")
                .send(data)
                .end((err, response) => {
                    response.should.have.status(400);
                    const errors = response.body.errors;
                    errors.length.should.be.eq(1);
                    const error = errors[0];
                    error.msg.should.be.eq('invalid IP address');
                    error.param.should.be.eq('ipv4');
                    error.location.should.be.eq('body');
                    done();
                });
        });
    });

    describe("Test DELETE route /gateways/remove", () => {
        it("It should remove a gateway", (done) => {
            Gateway.repository.add('serialNumber', 'name', '192.168.100.1');
            const data = {
                serialNumber: 'serialNumber'
            };

            //Check that already exist the gateway
            Gateway.repository.all().length.should.be.eq(1);

            chai.request(app)
                .delete("/gateways/remove")
                .send(data)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.data.should.be.eq('Gateway was successful deleted');
                    //Check that already not exist the gateway and their peripheral
                    Gateway.repository.all().length.should.be.eq(0);
                    done();
                });
        });
        it("It should remove a gateway and their peripherals", (done) => {
            Gateway.repository.add('serialNumber', 'name', '192.168.100.1');
            Peripheral.repository.add('vendor', 'online', 'serialNumber');
            const data = {
                serialNumber: 'serialNumber'
            };

            //Check that already exist the gateway and their peripheral
            Gateway.repository.all().length.should.be.eq(1);
            Peripheral.repository.all().length.should.be.eq(1);

            chai.request(app)
                .delete("/gateways/remove")
                .send(data)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.data.should.be.eq('Gateway was successful deleted');

                    //Check that already not exist the gateway and their peripheral
                    Gateway.repository.all().length.should.be.eq(0);
                    Peripheral.repository.all().length.should.be.eq(0);

                    done();
                });
        });
        it("It should throw an error on serialNumber field", (done) => {
            const data = {
                serialNumber: 'serialNumber'
            };
            chai.request(app)
                .delete("/gateways/remove")
                .send(data)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.errors.should.be.eq('Gateway does not exists');
                    done();
                });
        });
    });
});

describe("Test Peripherals endpoints", () => {
    beforeEach((done) => { //Before each test we empty the database
        Gateway.repository.removeAll();
        Peripheral.repository.removeAll();
        Gateway.repository.add('serialNumber', 'name', '192.168.100.1');
        done();
    });

    describe("Test POST route /peripherals/add", () => {
        it("It should create a new peripherals", (done) => {
            const data = {
                gatewaySerialNumber: 'serialNumber',
                vendor: 'vendor',
                status: 'online'
            };
            chai.request(app)
                .post("/peripherals/add")
                .send(data)
                .end((err, response) => {
                    response.should.have.status(200);
                    const gateway = response.body.data;
                    gateway.gatewaySerialNumber.should.be.eq('serialNumber');
                    gateway.vendor.should.be.eq('vendor');
                    gateway.status.should.be.eq('online');
                    gateway.id.should.be.eq(0);
                    //Check that already exist the peripheral
                    Peripheral.repository.all().length.should.be.eq(1);
                    Gateway.repository.get('serialNumber').peripherals.length.should.be.eq(1);
                    done();
                });
        });
        it("It should throw an error", (done) => {
            //Create 10 peripherals for serialNumber gateway
            for (let i = 0; i < 10; i++) {
                Peripheral.repository.add('vendor', 'online', 'serialNumber');
            }
            const data = {
                gatewaySerialNumber: 'serialNumber',
                vendor: 'vendor 2',
                status: 'offline'
            };
            chai.request(app)
            //Create another peripheral
                .post("/peripherals/add")
                .send(data)
                .end((err, response) => {
                    response.should.have.status(400);
                    const errors = response.body.errors;
                    errors.length.should.be.eq(1);
                    const error = errors[0];
                    error.msg.should.be.eq('A gateway must not have more than 10 peripherals');
                    error.param.should.be.eq('gatewaySerialNumber');
                    error.location.should.be.eq('body');
                    done();
                });
        });
        it("It should throw an error on gatewaySerialNumber field", (done) => {
            const data = {
                gatewaySerialNumber: 'serialNumber 2',
                vendor: 'vendor',
                status: 'online'
            };
            chai.request(app)
                .post("/peripherals/add")
                .send(data)
                .end((err, response) => {
                    response.should.have.status(400);
                    const errors = response.body.errors;
                    errors.length.should.be.eq(1);
                    const error = errors[0];
                    error.msg.should.be.eq('Gateway does not exists');
                    error.param.should.be.eq('gatewaySerialNumber');
                    error.location.should.be.eq('body');
                    done();
                });
        });
        it("It should throw an error on vendor field", (done) => {
            const data = {
                gatewaySerialNumber: 'serialNumber',
                status: 'online'
            };
            chai.request(app)
                .post("/peripherals/add")
                .send(data)
                .end((err, response) => {
                    response.should.have.status(400);
                    const errors = response.body.errors;
                    errors.length.should.be.eq(1);
                    const error = errors[0];
                    error.msg.should.be.eq('vendor field must be a valid string');
                    error.param.should.be.eq('vendor');
                    error.location.should.be.eq('body');
                    done();
                });
        });
        it("It should throw an error on status field", (done) => {
            const data = {
                gatewaySerialNumber: 'serialNumber',
                vendor: 'vendor',
                status: 'on'
            };
            chai.request(app)
                .post("/peripherals/add")
                .send(data)
                .end((err, response) => {
                    response.should.have.status(400);
                    const errors = response.body.errors;
                    errors.length.should.be.eq(1);
                    const error = errors[0];
                    error.msg.should.be.eq('Invalid value');
                    error.param.should.be.eq('status');
                    error.location.should.be.eq('body');
                    done();
                });
        });
    });

    describe("Test PUT route /peripherals/update", () => {
        it("It should update a gateway", (done) => {
            Peripheral.repository.add('vendor', 'online', 'serialNumber');
            Gateway.repository.add('serialNumber 2', 'name 2', '192.168.100.1');
            const data = {
                id: 0,
                gatewaySerialNumber: 'serialNumber 2',
                vendor: 'vendor 2',
                status: 'offline'
            };
            chai.request(app)
                .put("/peripherals/update")
                .send(data)
                .end((err, response) => {
                    response.should.have.status(200);
                    const gateway = response.body.data;
                    gateway.gatewaySerialNumber.should.be.eq('serialNumber 2');
                    gateway.vendor.should.be.eq('vendor 2');
                    gateway.status.should.be.eq('offline');
                    //Check that already exist the peripheral
                    Peripheral.repository.all().length.should.be.eq(1);
                    Gateway.repository.get('serialNumber').peripherals.length.should.be.eq(0);
                    Gateway.repository.get('serialNumber 2').peripherals.length.should.be.eq(1);
                    done();
                });
        });
        it("It should throw an error", (done) => {
            //Create 10 peripherals for serialNumber gateway
            for (let i = 0; i < 10; i++) {
                Peripheral.repository.add('vendor', 'online', 'serialNumber');
            }
            Gateway.repository.add('serialNumber 2', 'name', '192.168.100.1');
            const peripheral = Peripheral.repository
                .add('vendor 2', 'online', 'serialNumber 2');
            const data = {
                id: peripheral.id,
                gatewaySerialNumber: 'serialNumber',
                vendor: 'vendor 2',
                status: 'offline'
            };
            chai.request(app)
            //Update the last peripheral and the serialNumber gateway will be more than 10 peripherals
                .put("/peripherals/update")
                .send(data)
                .end((err, response) => {
                    response.should.have.status(400);
                    const errors = response.body.errors;
                    errors.length.should.be.eq(1);
                    const error = errors[0];
                    error.msg.should.be.eq('A gateway must not have more than 10 peripherals');
                    error.param.should.be.eq('gatewaySerialNumber');
                    error.location.should.be.eq('body');
                    done();
                });
        });
        it("It should throw an error on id field", (done) => {
            const data = {
                id: 0,
                gatewaySerialNumber: 'serialNumber',
                vendor: 'vendor 2',
                status: 'offline'
            };
            chai.request(app)
                .put("/peripherals/update")
                .send(data)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.errors.should.be.eq('Peripheral does not exists');
                    done();
                });
        });
        it("It should throw an error on gatewaySerialNumber field", (done) => {
            Peripheral.repository.add('vendor', 'online', 'serialNumber');
            const data = {
                id: 0,
                gatewaySerialNumber: 'serialNumber 2',
                vendor: 'vendor 2',
                status: 'offline'
            };
            chai.request(app)
                .put("/peripherals/update")
                .send(data)
                .end((err, response) => {
                    response.should.have.status(400);
                    const errors = response.body.errors;
                    errors.length.should.be.eq(1);
                    const error = errors[0];
                    error.msg.should.be.eq('Gateway does not exists');
                    error.param.should.be.eq('gatewaySerialNumber');
                    error.location.should.be.eq('body');
                    done();
                });
        });
        it("It should throw an error on vendor field", (done) => {
            Peripheral.repository.add('vendor', 'online', 'serialNumber');
            const data = {
                id: 0,
                gatewaySerialNumber: 'serialNumber',
                status: 'offline'
            };
            chai.request(app)
                .put("/peripherals/update")
                .send(data)
                .end((err, response) => {
                    response.should.have.status(400);
                    const errors = response.body.errors;
                    errors.length.should.be.eq(1);
                    const error = errors[0];
                    error.msg.should.be.eq('vendor field must be a valid string');
                    error.param.should.be.eq('vendor');
                    error.location.should.be.eq('body');
                    done();
                });
        });
        it("It should throw an error on status field", (done) => {
            Peripheral.repository.add('vendor', 'online', 'serialNumber');
            const data = {
                id: 0,
                gatewaySerialNumber: 'serialNumber',
                vendor: 'vendor 2',
                status: 'on'
            };
            chai.request(app)
                .put("/peripherals/update")
                .send(data)
                .end((err, response) => {
                    response.should.have.status(400);
                    const errors = response.body.errors;
                    errors.length.should.be.eq(1);
                    const error = errors[0];
                    error.msg.should.be.eq('Invalid value');
                    error.param.should.be.eq('status');
                    error.location.should.be.eq('body');
                    done();
                });
        });
    });

    describe("Test DELETE route /peripherals/remove", () => {
        it("It should remove a peripheral", (done) => {
            Peripheral.repository.add('vendor', 'online', 'serialNumber');
            const data = {
                id: 0
            };

            //Check that already exist the gateway
            Peripheral.repository.all().length.should.be.eq(1);

            chai.request(app)
                .delete("/peripherals/remove")
                .send(data)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.data.should.be.eq('Peripheral was successful deleted');
                    //Check that already not exist the gateway and their peripheral
                    Peripheral.repository.all().length.should.be.eq(0);
                    done();
                });
        });
        it("It should throw an error on id field", (done) => {
            const data = {
                id: 0
            };
            chai.request(app)
                .delete("/peripherals/remove")
                .send(data)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.errors.should.be.eq('Peripheral does not exists');
                    done();
                });
        });
    });
});