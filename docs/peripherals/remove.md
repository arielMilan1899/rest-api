# Remove a Peripheral
Used to remove a single peripheral

**URL** : `/peripherals/remove`

**Parameters constrain** :

`id` : Must be a valid ID

**Method** : `DELETE`

**Usage** : 
```bash
curl -X DELETE -H 'Content-Type: application/json' -d {"id":0} /peripherals/remove
```

### Success Responses

**Code** : `200 OK`

**Content** :
```json
{
   "status":200,
   "data":"Peripheral was successful deleted"
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
