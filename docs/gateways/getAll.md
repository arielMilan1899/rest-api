# Get all Gateways
Used to get all stored gateways

**URL** : `/gateways/`

**Method** : `GET`

## Success Responses

**Code** : `200 OK`

**Content** :
```json
{
   "status":200,
   "data":[
      {
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
      },
      {
         "serialNumber":"serialNumber 2",
         "name":"name 2",
         "ipv4":"192.168.100.14",
         "peripherals":[
            {
               "id":1,
               "vendor":"vendor 2",
               "status":"offline",
               "gatewaySerialNumber":"serialNumber 2",
               "createdOn":1619444742865
            }
         ]
      }
   ]
}
```
