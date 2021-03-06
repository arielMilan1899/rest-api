# Remove a Gateway
Used to remove a single gateway and their peripherals

**URL** : `/gateways/remove`

**Parameters constrain** :

`serialNumber` : Must be an unique not empty string

**Method** : `DELETE`

**Usage** : 
```bash
curl -X DELETE -H 'Content-Type: application/json' -d {"serialNumber":"serialNumber"} /gateways/remove
```

### Success Responses

**Code** : `200 OK`

**Content** :
```json
{
   "status":200,
   "data":"Gateway was successful deleted"
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
