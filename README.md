# Door Key Button Presser #MagigFinger

```
curl http://10.100.100.5/rpc/OpenArm (-90 degree)
curl http://10.100.100.5/rpc/CloseArm (+90 degree)
````

## Set degree manually
```
curl -d '{"angle": 95}' http://10.100.100.5/rpc/MoveArm
````
## Set Wi-Fi if neccessary
mos wifi WIFISSID WIFIPASS
mos config-set wifi.sta.ssid="WIFISSID" wifi.sta.pass="WIFIPASS"

## TODO
* Move wifi creds to .env file for conf9.json. make an env.sh
* Create setOpen and setClosed methods to modify degrees

