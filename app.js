if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

function ready () {
  const searchBtn = document.getElementById('searchBtn')
  searchBtn.addEventListener('click', getWeatherData)
}
function getWeatherData () {
  const cityName = document.getElementById('inputCity').value
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=d9f1104fac626d3e297c8a76ce06864e`)
    .then(res => {
      if (res.status !== 200) {
        return
      }
      res.json()
        .then(data => {
          const Result = `
            <div class="weather-card">
                <div class="card-field city-text-color">${data.city.name}</div>
                <div class="card-field">
                    ${getWeatherTime(data.list[0].dt)} <br/>
                    <img class="weather-icon" src="${'https://openweathermap.org/img/w/' + data.list[0].weather[0].icon + '.png'}" />
                    ${((data.list[0].main.temp) - 273.15) | 0} <b>°C</b> <br/>
                </div>
                <div class="card-field">
                    ${getWeatherTime(data.list[1].dt)} <br/>
                    <img class="weather-icon" src="${'https://openweathermap.org/img/w/' + data.list[1].weather[0].icon + '.png'}" />
                    ${((data.list[1].main.temp) - 273.15) | 0} <b>°C</b>  <br />
                </div>
                <div class="card-field">
                    ${getWeatherTime(data.list[2].dt)} <br/>
                    <img class="weather-icon" src="${'https://openweathermap.org/img/w/' + data.list[2].weather[0].icon + '.png'}" />
                    ${((data.list[2].main.temp) - 273.15) | 0} <b>°C</b>  <br />
                </div>
                <div class="card-field">
                    ${getWeatherTime(data.list[3].dt)} <br/>
                    <img class="weather-icon" src="${'https://openweathermap.org/img/w/' + data.list[3].weather[0].icon + '.png'}" />
                    ${((data.list[3].main.temp) - 273.15) | 0} <b>°C</b> <br />
                </div>
            </div>
                    `
          document.getElementById('weather-list').insertAdjacentHTML('afterbegin', Result)
        })
    })
}
function getWeatherTime (t) {
  const date = new Date(t * 1000)
  let hours = date.getHours()
  const ampm = hours >= 12 ? 'pm' : 'am'
  hours = hours % 12
  hours = hours || 12
  const strTime = hours + ' ' + ampm
  return strTime
}
