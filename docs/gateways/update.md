# Update a Gateway
Used to update a single gateway

**URL** : `/gateways/update`

**Method** : `PUT`

**Usage** : 
```bash
curl -X PUT -H 'Content-Type: application/json' -d '{"name":"name", "ipv4":"192.168.100.14"}' /gateways/update
```

**Parameters constrain** :

`serialNumber` : Must be an unique not empty string

`name` : Must be a not empty string

`ipv4` : Must be a valid IP address v4

### Success Responses

**Code** : `200 OK`

**Content** :
```json
{
   "status":200,
   "data":{
      "serialNumber":"serialNumber",
      "name":"name",
      "ipv4":"192.168.100.14",
      "peripherals":[]
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
         "value":"",
         "msg":"name field must not be empty",
         "param":"name",
         "location":"body"
      },
      {
         "value":"192.168.100.1a4",
         "msg":"invalid IP address",
         "param":"ipv4",
         "location":"body"
      },
      {
         "value":"serialNumber",
         "msg":"serialNumber field must be unique",
         "param":"serialNumber",
         "location":"body"
      }
   ]
}
```

**Code** : `404 Not found`

**Content** :
```json
{
   "status":404,
   "errors":"Gateway does not exists"
}
```
