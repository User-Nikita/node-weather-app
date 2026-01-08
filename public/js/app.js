// fetch("https://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

// fetch("http://localhost:3000/weather?address=!").then((response) => {
//   response.json().then((res) => {
//     if (res.error) {
//       console.log(res.error);
//     } else {
//       console.log(res);
//     }
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector("#message1");
const message2 = document.querySelector("#message2");

message1.textContent = "Loading...";
message2.textContent = "";
weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = search.value;

  const URL = "/weather?address=" + location;
  fetch(URL).then((response) => {
    response.json().then((res) => {
      if (res.error) {
        message1.textContent = res.error;
      } else {
        message1.textContent = res.location;
        message2.textContent = res.forecast;
      }
    });
  });
});
