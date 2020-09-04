var moment = require('moment'); // require
const fetch = require("node-fetch");
const BadRequest = require("./bad-request")
const dotenv = require("dotenv");
dotenv.config();

const GEONAMES_USERNAME = process.env.GEONAMES_USERNAME
const WEATHERBIT_APIKEY = process.env.WEATHERBIT_APIKEY
const PIXABAY_APIKEY = process.env.PIXABAY_APIKEY

const GEONAMES_BASEURL = 'http://api.geonames.org/searchJSON'
const WEATHERBIT_CURRENT_URL = 'http://api.weatherbit.io/v2.0/current'
const WEATHERBIT_FORECAST_URL = 'http://api.weatherbit.io/v2.0/forecast/daily'
const PIXABAY_BASEURL = 'https://pixabay.com/api'

async function getData(placeName, date) {

  if(!placeName || !date) {
    throw new BadRequest(400, "Please provide place name and date values")
  }
  var momentDate = moment(date);
  if(!momentDate.isValid()) {
    throw new BadRequest(400, "Invalid date. Please send date in format YYYY-MM-DD")
  }  
  const isTravelDateWithin7Days = momentDate.isBefore(moment().add(7,'days'))

  //first get geo names data for the place name (city name)
  const geoNamesData = await getGeoNamesData(placeName)
  const weatherBitData = {};
  if(isTravelDateWithin7Days) {
    weatherBitData.current = await getWeatherBitDataCurrent(placeName, geoNamesData.countryCode)
  }else {
    weatherBitData.forecast = await getWeatherBitDataForecast(placeName, geoNamesData.countryCode)
  }

  let pixaBayData = await getPixaBayData(placeName)
  if(pixaBayData.length === 0) {
    // make another call with countryName
    pixaBayData = await getPixaBayData(geoNamesData.countryName)
  }

  //make a call to rest countries API
  let countryInfo = await getCountryInfo(geoNamesData.countryCode)
  
  return {
    departingDate: momentDate.format('dddd, MMMM Do YYYY'),
    geoNamesData: geoNamesData,
    weatherBitData: {
      ...weatherBitData
    },
    pixaBayData: pixaBayData,
    countryInfo: countryInfo
  }
}

async function getGeoNamesData(placeName) {

    const params = {
        username: GEONAMES_USERNAME,
        q: placeName,
        maxRows: 1
      };
    
    const geoData = await fetch(`${GEONAMES_BASEURL}?q=${placeName}&maxRows=1&username=${GEONAMES_USERNAME}`)
        .then(response => {
          if(!response.ok) {
            throw new Error("sorry! something went wrong from geo names API")
          }
          return response.json()
        })
        .then((jsonData) => {
            return {
              countryCode: jsonData.geonames[0].countryCode,
              countryName: jsonData.geonames[0].countryName,
              placeName: jsonData.geonames[0].name
            };
        })
    return geoData
}

async function getWeatherBitDataCurrent(placeName, countryCode) {
    const url = `${WEATHERBIT_CURRENT_URL}?key=${WEATHERBIT_APIKEY}&city=${placeName}&country=${countryCode}`
    console.log(url)
    const weatherBitData = fetch(url)
            .then(response => {
              if(!response.ok) {
                throw new Error("sorry! something went wrong from weatherbit current API")
              }
              return response.json()
            })
            .then((jsonData) => {
            return {
              temp: jsonData.data[0].temp,
              app_temp: jsonData.data[0].app_temp,
              date:jsonData.data[0].datetime,
              description:jsonData.data[0].weather.description
            };
        })
    return weatherBitData
}

async function getWeatherBitDataForecast(placeName,countryCode) {
  const url = `${WEATHERBIT_FORECAST_URL}?key=${WEATHERBIT_APIKEY}&city=${placeName}&country=${countryCode}`
  console.log(url)
  const weatherBitData = fetch(url)
          .then(response => {
            if(!response.ok) {
              throw new Error("sorry! something went wrong from weatherbit forecast API")
            }
            return response.json()
          })
          .then((jsonData) => {
          return jsonData.data.map(item => ({high_temp: item.high_temp, low_temp: item.low_temp, date: item.valid_date, description: item.weather.description}));
      })
  return weatherBitData
}

async function getPixaBayData(searchText) {
  const url = `${PIXABAY_BASEURL}?key=${PIXABAY_APIKEY}&q=${searchText}`
  const pixaBayData = fetch(url)
    .then(response => {
      if(!response.ok) {
        throw new Error("sorry! something went wrong from pixabay API")
      }
      return response.json()
    })
    .then((jsonData) => {
        if(jsonData.hits.length > 0) {
          return {
            imageURL: jsonData.hits[0].webformatURL
          }
        }else {
          return []
        }
    })
  return pixaBayData

}

async function getCountryInfo(countryCode) {
  const url = `https://restcountries.eu/rest/v2/alpha/${countryCode}`
  const countryInfo = fetch(url)
    .then(response => {
      if(!response.ok) {
        throw new Error("sorry! something went wrong from RestCountries API")
      }
      return response.json()
    })
    .then((jsonData) => {
      return {
        name: jsonData.name,
        alpha2Code: jsonData.alpha2Code,
        capital: jsonData.capital,
        region: jsonData.region,
        subregion: jsonData.subregion,
        population: jsonData.population,
        currency: {
          name: jsonData.currencies[0].name,
          symbol:jsonData.currencies[0].symbol,
        },
        language: {
          name: jsonData.languages[0].name,
          nativeName: jsonData.languages[0].nativeName
        },
        flag: jsonData.flag
      }
    })
  return countryInfo

}


module.exports = {
    getData: getData,
    getPixaBayData: getPixaBayData
}