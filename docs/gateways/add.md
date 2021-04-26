# Add a Gateway
Used to add a single gateway

**URL** : `/gateways/add`

**Method** : `POST`

**Usage** : 
```bash
curl -X POST -H 'Content-Type: application/json' -d '{"serialNumber":"serialNumber","name":"name", "ipv4":"192.168.100.14"}' /gateways/add
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

**Code** : `400 Not found`

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
