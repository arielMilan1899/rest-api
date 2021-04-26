# Get single Gateways
Used to get a single stored gateway providing their serialNumber

**URL** : `/gateways/:serialNumber`

**Method** : `GET`

### Success Responses

**Code** : `200 OK`

**Content** :
```json
{
   "status":200,
   "data":{
      "serialNumber":"serialNumber 1",
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

