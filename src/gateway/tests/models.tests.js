const test = require('ava');
const proxyquire = require('proxyquire');
const uuid = require('uuid');
const sinon = require('sinon');
const {Gateway} = require('../models');

function initStub() {
    const stubs = {};
    stubs.Peripheral = {filter: () => Promise.resolve(),}
    const indexStubs = {
        '../peripheral/models': {Peripheral: stubs.Peripheral},
    };
    stubs.index = proxyquire('../models', indexStubs);
    return stubs;
}

test('Create a Gateway', t => {
    const gateway = new Gateway('serialNumber', 'name', '0.0.0.0');

    t.is(gateway.serialNumber, 'serialNumber');
    t.is(gateway.name, 'name');
    t.is(gateway.ipv4, '0.0.0.0');
    t.is(gateway, Gateway.exists('serialNumber'));
});

test('Gateway peripherals', t => {
    const stubs = initStub();
    stubs.index.Gateway(stubs.event.data, stubs.event.context, () => {
        t.plan(1);

        t.true(stubs.rpStub.calledWith({
            method: 'POST',
            uri: CONFIG.production.servingUrlProvider,
            form: { key: `${stubs.gcsKey}_${MOCK_CONFIG.AD_IM_CONF.MASTER.SUFFIX}`, token: DEV_CONFIG.token },
            json: true,
        }));

        t.end();
    });
});

test('bar', async t => {
    const bar = Promise.resolve('bar');
    t.is(await bar, 'bar');
});