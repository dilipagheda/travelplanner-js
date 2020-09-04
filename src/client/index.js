import flatpickr from "flatpickr";
import clickHandler from "./js/clickHandler";

//import scss files
import "./styles/resets.scss";
import "./styles/base.scss";
import "./styles/loader.scss";
import "./styles/error.scss";

flatpickr("#start-date", {
  dateFormat: "d/m/Y",
});

const button = document.querySelector(".trip-form-button");
button.addEventListener("click", clickHandler);

if ("serviceWorker" in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}
