# Get single Gateway
Used to get a single stored gateway providing their serialNumber

**URL** : `/gateways/:serialNumber`

**Parameters constrain** :

`serialNumber` : Must be an unique not empty string

**Method** : `GET`

**Usage** : 
```bash
curl -X GET -H 'Content-Type: application/json' -d '{"serialNumber":"serialNumber"}' /gateways/:serialNumber
```

### Success Responses

**Code** : `200 OK`

**Content** :
```json
{
   "status":200,
   "data":{
      "serialNumber":"serialNumber",
      "name":"name 1",
      "ipv4":"192.168.100.13",
      "peripherals":[
         {
            "id":0,
            "vendor":"vendor 1",
            "status":"online",
            "gatewaySerialNumber":"serialNumber 1",
            "createdOn":1619444739757
         }
      ]
   }
}
```

### Error Responses

**Code** : `404 Not found`

**Content** :
```json
{
   "status":404,
   "errors":"Gateway does not exists"
}
```
