import moment from "moment";
import tripItem from "./components/tripItem";
import loader from "./components/loader";
import showError from "./components/showError";

const baseUrl = "http://localhost:3000";

const clickHandler = async (event) => {
  event.preventDefault();
  const placeName = document.getElementById("destination").value;
  const date = document.getElementById("start-date").value;

  if (!placeName || !date) {
    document.querySelector(".my-trips").innerHTML = showError(
      "Please enter valid values!"
    );
    return;
  }

  const momentDate = moment(date, "DD-MM-YYYY");

  const fullUrl = `${baseUrl}/travel?placeName=${placeName}&date=${momentDate.format(
    "YYYY-MM-DD"
  )}`;
  document.querySelector(".my-trips").innerHTML = loader();

  try {
    const response = await fetch(fullUrl).then((response) => response.json());
    document.querySelector(".my-trips").innerHTML = tripItem(response);
  } catch (error) {
    document.querySelector(".my-trips").innerHTML = showError();
  }
};

export default clickHandler;
