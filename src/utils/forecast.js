const request = require("request");

const forecast = ({ latitude, longitude }, callback) => {
  const url =
    "https://api.weatherstack.com/current?access_key=dd955fd10e449920b951c504cf913f04&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to API", undefined);
    } else if (body.error) {
      callback("unable to find location");
    } else {
      const {
        weather_descriptions: weather,
        temperature,
        feelslike,
      } = body.current;
      callback(
        undefined,
        weather[0] +
          "- It is currently " +
          temperature +
          " degrees out. It feels like " +
          feelslike +
          " degrees out"
      );
    }
  });
};

module.exports = forecast;
