# rest-api

This sample project is managing gateways - master devices that control multiple peripheral
devices.

## Software Requirements

**Programming language**: JavaScript

**Framework** : Node.js/JavaScript + Express.js

**Database** : in-memory

**Automated build** : Solution of choice


## Open Endpoints

### Gateway endpoints
* [Get all gateways](docs/gateways/getAll.md) : `GET /gateways/`
* [Get single gateway](docs/gateways/get.md) : `GET /gateways/:serialNumber`
* [Add a gateway](docs/gateways/add.md) : `POST /gateways/add`
* [Update a gateway](docs/gateways/update.md) : `PUT /gateways/update/:serialNumber`
* [Remove a gateway](docs/gateways/remove.md) : `PUT /gateways/remove/:serialNumber`

### Peripheral endpoints
* [Add a peripheral](docs/peripherals/add.md) : `POST /peripherals/add`
* [Update a peripheral](docs/peripherals/update.md) : `PUT /peripherals/update/:id`
* [Remove a peripheral](docs/peripherals/remove.md) : `PUT /peripherals/remove/:id`


