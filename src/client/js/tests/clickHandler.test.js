import clickHandler from "../clickHandler";
import { enableFetchMocks } from "jest-fetch-mock";
import { responseCurrentWeather } from "../../mock/responseCurrentWeather";
import { responseForcasted } from "../../mock/responseForecastedWeather";

beforeEach(() => {
  enableFetchMocks();
  fetch.resetMocks();
});

test("verify clickHandler function throws correct validation errors", () => {
  const event = { preventDefault: () => {} };

  jest.spyOn(event, "preventDefault");

  document.body.innerHTML = `
          <div class="trip-form">
          <div class="form-container">
              <div class="form-item">
                  <label for="destination">My trip to:</label>
                  <input type="text" id="destination" placeholder="Enter Location">
              </div>
              <div class="form-item">
                  <label for="start-date">Departing:</label>
                  <input type="text" id="start-date" placeholder="DD/MM/YYYY" class="flatpickr-input active" readonly="readonly">
              </div>
              <button class="trip-form-button">
                  Let's Go!!
              </button>
          </div>
          <div class="my-trips">
          </div>
        </div>  
    `;

  return clickHandler(event).then(() => {
    //verify that preventDefault is called
    expect(event.preventDefault).toBeCalled();

    //Verify that portion of response data is in DOM
    expect(document.body).toMatchSnapshot();
  });
});

test("verify clickHandler function displays the loader while waiting for the result from api", () => {
  const event = { preventDefault: () => {} };

  jest.spyOn(event, "preventDefault");

  document.body.innerHTML = `
          <div class="trip-form">
          <div class="form-container">
              <div class="form-item">
                  <label for="destination">My trip to:</label>
                  <input type="text" id="destination" placeholder="Enter Location">
              </div>
              <div class="form-item">
                  <label for="start-date">Departing:</label>
                  <input type="text" id="start-date" placeholder="DD/MM/YYYY" class="flatpickr-input active" readonly="readonly">
              </div>
              <button class="trip-form-button">
                  Let's Go!!
              </button>
          </div>
          <div class="my-trips">
          </div>
        </div>  
    `;

  document.getElementById("destination").value = "sydney";
  document.getElementById("start-date").value = "29/09/2020";

  fetch.mockResponse(() => {
    //Verify that portion of response data is in DOM
    expect(document.body).toMatchSnapshot();
    return new Promise((resolve) => {
      resolve(JSON.stringify(responseCurrentWeather));
    });
  });

  return clickHandler(event).then(() => {
    //verify that preventDefault is called
    expect(event.preventDefault).toBeCalled();
  });
});

test("verify current weather response", () => {
  const event = { preventDefault: () => {} };

  jest.spyOn(event, "preventDefault");

  document.body.innerHTML = `
          <div class="trip-form">
          <div class="form-container">
              <div class="form-item">
                  <label for="destination">My trip to:</label>
                  <input type="text" id="destination" placeholder="Enter Location">
              </div>
              <div class="form-item">
                  <label for="start-date">Departing:</label>
                  <input type="text" id="start-date" placeholder="DD/MM/YYYY" class="flatpickr-input active" readonly="readonly">
              </div>
              <button class="trip-form-button">
                  Let's Go!!
              </button>
          </div>
          <div class="my-trips">
          </div>
        </div>  
    `;

  document.getElementById("destination").value = "sydney";
  document.getElementById("start-date").value = "29/09/2020";

  fetch.mockResponse(() => {
    return new Promise((resolve) => {
      resolve(JSON.stringify(responseCurrentWeather));
    });
  });

  return clickHandler(event).then(() => {
    //verify that preventDefault is called
    expect(event.preventDefault).toBeCalled();
    //Verify that portion of response data is in DOM
    expect(document.body).toMatchSnapshot();
  });
});

test("verify forecasted weather response", () => {
  const event = { preventDefault: () => {} };

  jest.spyOn(event, "preventDefault");

  document.body.innerHTML = `
          <div class="trip-form">
          <div class="form-container">
              <div class="form-item">
                  <label for="destination">My trip to:</label>
                  <input type="text" id="destination" placeholder="Enter Location">
              </div>
              <div class="form-item">
                  <label for="start-date">Departing:</label>
                  <input type="text" id="start-date" placeholder="DD/MM/YYYY" class="flatpickr-input active" readonly="readonly">
              </div>
              <button class="trip-form-button">
                  Let's Go!!
              </button>
          </div>
          <div class="my-trips">
          </div>
        </div>  
    `;

  document.getElementById("destination").value = "sydney";
  document.getElementById("start-date").value = "29/09/2020";

  fetch.mockResponse(() => {
    return new Promise((resolve) => {
      resolve(JSON.stringify(responseForcasted));
    });
  });

  return clickHandler(event).then(() => {
    //verify that preventDefault is called
    expect(event.preventDefault).toBeCalled();
    //Verify that portion of response data is in DOM
    expect(document.body).toMatchSnapshot();
  });
});
