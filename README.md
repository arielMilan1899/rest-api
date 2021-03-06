# rest-api

This sample project is managing gateways - master devices that control multiple peripheral
devices.

## Software Requirements

**Programming language**: JavaScript

**Framework** : Node.js/JavaScript + Express.js

**Database** : in-memory

**Testing** : Testing the REST API using Mocha and Chai

**Automated build and Demo Basic Web**  : [Vercel](https://web-phi-lovat.vercel.app/)

## Download & Run on local

### Clone the repository, install node packages and run the api
```bash
//on local
git clone https://github.com/arielMilan1899/rest-api.git
cd rest-api
npm install
npm start
```

### Run Tests
```bash
npm test
```

## Continuous integration (CI) 

* [Pipelines](https://github.com/arielMilan1899/rest-api/actions)

## Online build

Vercel will generate a specific build for each commit/push.

This is the production build:
* [rest-api](https://rest-api-theta.vercel.app/)

## Usage Guide

### Gateway endpoints
* [Get all gateways](docs/gateways/getAll.md) : `GET /gateways`
* [Get single gateway](docs/gateways/get.md) : `GET /gateways/:serialNumber`
* [Add a gateway](docs/gateways/add.md) : `POST /gateways/add`
* [Update a gateway](docs/gateways/update.md) : `PUT /gateways/update`
* [Remove a gateway](docs/gateways/remove.md) : `DELETE /gateways/remove`

### Peripheral endpoints
* [Get single peripheral](docs/peripherals/get.md) : `GET /peripherals/:id`
* [Add a peripheral](docs/peripherals/add.md) : `POST /peripherals/add`
* [Update a peripheral](docs/peripherals/update.md) : `PUT /peripherals/update`
* [Remove a peripheral](docs/peripherals/remove.md) : `DELETE /peripherals/remove`
