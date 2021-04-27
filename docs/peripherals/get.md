# Get single Peripheral
Used to get a single stored peripheral providing their id

**URL** : `/peripherals/:id`

**Parameters constrain** :

`id` : Must be a valid ID

**Method** : `GET`

**Usage** : 
```bash
curl -X GET -H 'Content-Type: application/json' /peripherals/:id
```

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

**Code** : `404 Not found`

**Content** :
```json
{
   "status":404,
   "errors":"Peripheral does not exists"
}
```
