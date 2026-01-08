const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/search/geocode/v6/forward?q=" +
    encodeURIComponent(address) +
    "&access_token=pk.eyJ1IjoibmlraXRhcGF0aWxsIiwiYSI6ImNtandtZzI3dTI2djYzZHFzaGY5MmZ2Z3IifQ.dAEi640tQNhM56W7jPAmDQ&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to API service", undefined);
    } else if (body.features.length === 0) {
      callback("Invalid location", undefined);
    } else {
      const { coordinates, name } = body.features[0].properties;
      callback(undefined, {
        ...coordinates,
        location: name,
      });
    }
  });
};

module.exports = geocode;
