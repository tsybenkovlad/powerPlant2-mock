import express from "express"
import { format } from 'date-fns'
const app = express();
app.use(express.json());
app.get("/powerPlant", (request, response) => {
    function getRandomIntInclusive(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    }
    let first = getRandomIntInclusive(0, 356)
    let formatFirst;
    if (String(first).length === 1) {
        formatFirst = "00" + first
    }else if(String(first).length === 2) {
        formatFirst = "0" + first
    }else  {
        formatFirst = first
    }
    let second = getRandomIntInclusive(0, 23)
    let formatSecond;
    if (String(second).length === 1) {
        formatSecond = "0" + second
    }else {
        formatSecond = second
    }
    let third = getRandomIntInclusive(0, 59)
    let formatThird;
    if (String(third).length === 1) {
        formatThird = "0" + third
    }else {
        formatThird = third
    }
    response.send({"appVersion": getRandomIntInclusive(0, 500),
        "espVersion": "v5.2.2-dirty",
        "uptime": formatFirst + "." + formatSecond + ":" + formatThird,
        "heapPercent": getRandomIntInclusive(0, 100),
        "heapBytes": getRandomIntInclusive(0, 35000),
        "rtc": {
            "year": Number(format(new Date(),"yyyy")),
            "month": Number(format(new Date(),"MM")),
            "day": Number(format(new Date(),"d")),
            "hour": Number(format(new Date(),"HH")),
            "minute": Number(format(new Date(),"mm")),
            "second": Number(format(new Date(),"ss"))
        }});
});
app.listen(8080, () => {
    console.log("Server started");
});