const tripItemHeader = (props) => {
    return `<div class="trip-item-header">
                <div class="flag">
                    <img src=${props.flagUrl} alt="">
                </div>
                <div class="taglines">
                    <h2 class="header1"><span class="static">My trip to: </span>${props.placeName}, ${props.countryName}</h2>
                    <h2 class="header2"><span class="static">Departing: </span>${props.departingDate}</h2>
                </div>
            </div>
        `
}

const countryImage = (props) => {
     return `<div class="location-image">
            <img src="${props.imageURL}" alt="">
        </div>
    `
}

const placeFunFacts = (props) => {
    return `
        <ul class="fun-facts">
            <li>${props.placeName} is located in ${props.name} within the region of ${props.region} and subregion of ${props.subregion}</li>
            <li>Its capital is ${props.capital}</li>
            <li>Its total population is ${props.population}</li>
            <li>Its currency is ${props.currency.name} and its symbol is ${props.currency.symbol}</li>
            <li>Local language spoken is ${props.language.name} and its native name is ${props.language.nativeName}</li>
        </ul>
    `
}

const currentWeatherItem = (props) => {
    if(props.high_temp && props.low_temp && props.date && props.description)
    {
        return `
            <div class="weather-item">
                <div class="weather-item-data">
                    <div class="temp">
                        <div class="label">High</div>
                        <div class="value">${props.high_temp} <span class="celcius">&#8451;</span></div>
                    </div>
                    <div class="temp">
                        <div class="label">Low</div>
                        <div class="value">${props.low_temp} <span class="celcius">&#8451;</span></div>
                    </div>
                </div>
                <div class="weather-item-desc">
                    <span>${props.description}</span>
                </div>
            </div>
        `
    }else{
        return `
        <div class="weather-item">
            <div class="weather-item-data">
                <div class="temp">
                    <div class="label">Temperature</div>
                    <div class="value">${props.temp} <span class="celcius">&#8451;</span></div>
                </div>
                <div class="temp">
                    <div class="label">Feels like</div>
                    <div class="value">${props.app_temp} <span class="celcius">&#8451;</span></div>
                </div>
            </div>
            <div class="weather-item-desc">
                <span>${props.description}</span>
            </div>
        </div>
    `
    }
}

const forecastedWeatherItem = (weatherData) => {
    
    return weatherData.map((item) => {
        return `
            <div class="weather-item">
            <div class="weather-item-desc">
                <span>${item.date}</span>
            </div>                            
            <div class="weather-item-data">
                <div class="temp">
                    <div class="label">High</div>
                    <div class="value">${item.high_temp} <span class="celcius">&#8451;</span></div>
                </div>
                <div class="temp">
                    <div class="label">Low</div>
                    <div class="value">${item.low_temp} <span class="celcius">&#8451;</span></div>
                </div>
            </div>
            <div class="weather-item-desc">
                <span>${item.description}</span>
            </div>
        </div>
        `
    }).join(' ')
}

const tripItem = (data) => {
    const currentWeatherData = data.weatherBitData.forecast ? data.weatherBitData.forecast[0]: data.weatherBitData.current
    
    const forecastedWeather = data.weatherBitData.forecast ? `<h2 class="forecasted-weather-header">Forecasted Weather for next 16 days</h2>
    <div class="forecasted-weather">
        ${forecastedWeatherItem(data.weatherBitData.forecast)}
    </div> ` : ''

    return `
        <div class="trip-item-container">
            ${tripItemHeader({
                departingDate: data.departingDate,
                countryCode: data.geoNamesData.countryCode,
                countryName: data.geoNamesData.countryName,
                placeName: data.geoNamesData.placeName,
                flagUrl: data.countryInfo.flag
            })}
            <div class="trip-item">
                ${countryImage({
                    imageURL: data.pixaBayData.imageURL
                })}
                <div class="location-info">
                    <h2 class="header-with-background">Fun Facts about ${data.geoNamesData.placeName}</h2>
                    ${placeFunFacts({
                        placeName: data.geoNamesData.placeName,
                        ...data.countryInfo})}
                    <h2 class="header-with-background">Today's weather at ${data.geoNamesData.placeName}</h2>
                    ${currentWeatherItem(currentWeatherData)}
                </div>
            </div>
            ${forecastedWeather}
        </div>
    `
}

export default tripItem