const main = document.querySelector('[data-main]')
const form = document.querySelector('[data-form]')
const errorDisplay = document.querySelector('[data-erro-display]')
const countryInfoContainer = document.querySelector('[data-country-info-container]')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const countryName = e.target.elements["searchCountry"].value
    if (countryName == '') {
        countryInfoContainer.innerHTML = ''
        errorDisplay.innerHTML = 'Please enter a country name.'
        main.classList.add('erro-animation')
    } else {
        getCountryInfo(countryName)
    }
})


async function getCountryInfo(name) {
    errorDisplay.innerHTML = ''
    main.classList.remove('erro-animation')
    try {
        const api = await fetch(`https://restcountries.com/v3.1/name/${name}`)
        const apiObj = await api.json()
        if(apiObj.message) {
            throw Error('Country not Found')
        }

        renderCountryInfo(apiObj[0])

    } catch (error) {
        errorDisplay.innerHTML = 'Country not found'
        countryInfoContainer.innerHTML = ''
        main.classList.add('erro-animation')
    }
}

function renderCountryInfo(obj) {
    const languageString = Object.values(obj.languages).join(', ')

    countryInfoContainer.innerHTML = `
        <h2 class="country-info__country-name">${obj.name.common}</h2>
        <h3 class="country-info__country-name">${obj.name.common}</h2>
        <div class="country-info__country-datas">
            <p><strong>Capital:</strong> ${obj.capital}</p>
            <p><strong>Continents:</strong> ${obj.continents}</p>
            <p><strong>Demonyms:</strong> ${obj.demonyms.eng.m}</p>
            <p><strong>Language:</strong> ${languageString}</p>
        </div>
        <img src="${obj.flags.svg}" alt="" class="country-info__flag">
        <a href="${obj.maps.googleMaps}" target="_blank" class="country-info__map">Google Maps</a>
    `
}