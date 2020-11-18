const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const { json } = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/weather/:lat/:log", async(req, res) => {
    var link = "https://api.openweathermap.org/data/2.5/onecall?lat=" + req.params.lat + "&lon=" + req.params.log + "&units=metric&appid=8ed570992ae0c1ecb5808ef76dd85ccd";
    console.log(link);
    await request(link, function(error, response, body) {
        console.error('error:', error);
        console.log('statusCode:', response && response.statusCode);
        var data = JSON.parse(body);
        res.render("weather", {
            hourly: data.hourly,
            daily: data.daily,
            current: data.current,
            lont: data.lon,
            lat: data.lat,
            timezone: data.timezone,
            timeshift: data.timezone_offset
        });
    });


});

app.listen(process.env.PORT || 3000, () => console.log('Server started on 3000!'));