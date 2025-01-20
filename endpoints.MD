### Check update
POST /upgrade/check
response:
```json
{}
```

POST /upgrade
response:
```json
{}
```

### Upgrade status
POST /upgrade/status  
request body:
```json
{
    "status": 2
}
```

GET /upgrade/status  
response:
```json
{
    "status": 1
}
```

### System
POST /system  
request body:
```json
{
  "appVersion":	5,
  "upgradeCheck":	0,
  "remoteVersion":	6
}
```

GET /system  
response:
```json
{
  "imageUrl":	"https://pwr2.s.fc0.org/image",
  "wwwPartitionIndex":	0,
  "appVersion":	5,
  "upgradeCheck":	0,
  "remoteVersion":	6,
  "otaRunning":	"ota_1",
  "otaConfigured":	"ota_1",
  "otaUpgrade":	"ota_0",
  "pushMetrics": false,
  "pushDelayS":	15,
  "pushGatewayUrl":	"https://gw.s.fc0.org/metrics/job/pwr2/instance/home",
  "authGateway":	false,
  "gwUser":	"",
  "gwPassword":	""
}
```