import express, {request, response} from "express"
import {format} from 'date-fns'
import fs from "node:fs";

const app = express();
app.use(express.json());

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

function fill(str, char, n) {
    let m = n - str.length;
    let f = "";
    for (let i = 0; i < m; i++) {
        f += char
    }
    return f + str
}

app.get("/info", (request, response) => {
    let first = getRandomIntInclusive(0, 356)
    let formatFirst = fill(String(first), "0", 3);
    let second = getRandomIntInclusive(0, 23)
    let formatSecond = fill(String(second), "0", 2);
    let third = getRandomIntInclusive(0, 59)
    let formatThird = fill(String(third), "0", 2);
    let date = new Date();
    response.send({
        "appVersion": getRandomIntInclusive(0, 500),
        "espVersion": "v5.2.2-dirty",
        "uptime": formatFirst + "." + formatSecond + ":" + formatThird,
        "heapPercent": getRandomIntInclusive(0, 100),
        "heapBytes": getRandomIntInclusive(0, 35000),
        "rtc": {
            "year": Number(format(date, "yyyy")),
            "month": Number(format(date, "MM")),
            "day": Number(format(date, "d")),
            "hour": Number(format(date, "HH")),
            "minute": Number(format(date, "mm")),
            "second": Number(format(date, "ss"))
        }
    });
});
const WIFI_FILE_NAME = "wifi.json"
const SYSTEM_FILE_NAME = "system.json"
app.post("/system", (request, response) => {
    let obj = request.body
    console.log(obj)
    fs.writeFileSync(SYSTEM_FILE_NAME, JSON.stringify(obj, null, "   "))
    response.send({})
});
app.get("/system", (request, response) => {
    let obj = {
        "imageUrl": "https://pwr2.s.fc0.org/image",
        "wwwPartitionIndex": 0,
        "appVersion": 5,
        "upgradeCheck": 0,
        "remoteVersion": 6,
        "otaRunning": "ota_1",
        "otaConfigured": "ota_1",
        "otaUpgrade": "ota_0",
        "pushMetrics": false,
        "pushDelayS": 15,
        "pushGatewayUrl": "https://gw.s.fc0.org/metrics/job/pwr2/instance/home",
        "authGateway": false,
        "gwUser": "",
        "gwPassword": ""
    }
    if (fs.existsSync(SYSTEM_FILE_NAME)) {
        let systemObj = JSON.parse(fs.readFileSync(SYSTEM_FILE_NAME, "utf8"))
        Object.assign(obj, systemObj)
    }
    response.send(obj)
});
app.post("/upgrade/check", (request, response) => {
    function f() {
        response.send({})
    }
    setTimeout(f, 3000)
});
app.post("/upgrade", (request, response) => {
    function f() {
        response.send({})
    }
    setTimeout(f, 1000)
});
app.post("/wifi", (request, response) => {
    let obj = request.body
    console.log(obj)
    fs.writeFileSync(WIFI_FILE_NAME, JSON.stringify(obj, null, "   "))
});
app.get("/wifi", (request, response) => {
    let dataWifi = JSON.parse(fs.readFileSync(WIFI_FILE_NAME, "utf8"));
    delete dataWifi.stationPassword
    delete dataWifi.apPassword
    response.send(dataWifi)
});
app.listen(8080, () => {
    console.log("Server started");
});
