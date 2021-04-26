# Update a Peripheral
Used to add a single peripheral

**URL** : `/peripherals/add/:id`

**Method** : `POST`

**Usage** : 
```bash
curl -X POST -H 'Content-Type: application/json' -d '{"vendor":"vendor", "status":"online", "gatewaySerialNumber":"serialNumber"}' /peripherals/add/:id
```

**Parameters constrain** :

`vendor` : Must be a not empty string

`status` : Must be 'online' or 'offline'

`gatewaySerialNumber` : Must be a valid gateway serialNumber

### Success Responses

**Code** : `200 OK`

**Content** :
```json
{
   "status":200,
   "data":{
      "id":0,
      "vendor":"vendor",
      "status":"online",
      "gatewaySerialNumber":"serialNumber",
      "createdOn":1619453661053
   }
}
```

### Error Responses

**Code** : `400 Bad Request`

**Content** :
```json
{
   "status":400,
   "errors":[
      {
         "value":"serialNumber 1",
         "msg":"Gateway does not exists",
         "param":"gatewaySerialNumber",
         "location":"body"
      },
      {
         "value":"",
         "msg":"vendor field must not be empty",
         "param":"vendor",
         "location":"body"
      },
      {
         "value":"off",
         "msg":"Invalid value",
         "param":"status",
         "location":"body"
      }
   ]
}
```
