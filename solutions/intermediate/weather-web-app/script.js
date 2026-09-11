import params from './params.json' with {type: 'json'};
import Geonames from './js/geonames.js';
import Visualcrossing from './js/visuacrossing.js';
import Icon from './js/icon.js';
import Uvindex from './js/uvindex.js';
import Moonphase from './js/moonphase.js';
import Favlist from './js/favlist.js';

//////////////////////////////////////////////////////////////////////////////////////

const MOCK_RESPONSES = true;

//////////////////////////////////////////////////////////////////////////////////////

const geonames = new Geonames(params.geonames.username, MOCK_RESPONSES);
const visualcrossing = new Visualcrossing(params.visualcrossing.apiKey, MOCK_RESPONSES)
const favlist = new Favlist();

//////////////////////////////////////////////////////////////////////////////////////

const searchInput = document.getElementById('wwa-search-form-input');
const searchResult = document.getElementById('wwa-search-result');
const searchResultList = document.getElementById('wwa-search-result-list');
searchResult.close = function () {
    this.hidden = true;
}

const nowSection = {

    local: document.getElementById('wwa-weather-now-local-value'),
    icon: document.getElementById('wwa-weather-now-icon-value'),
    temp: document.getElementById('wwa-weather-now-temp-value'),
    date: document.getElementById('wwa-weather-now-date-value'),
    weekday: document.getElementById('wwa-weather-now-weekday-value'),
    hour: document.getElementById('wwa-weather-now-hour-value'),
    conditions: document.getElementById('wwa-weather-now-conditions-value'),
    feelslike: document.getElementById('wwa-weather-now-feelslike-value'),
    precipprob: document.getElementById('wwa-weather-now-precipprob-value'),
    humidity: document.getElementById('wwa-weather-now-humidity-value'),
    uvindex: document.getElementById('wwa-weather-now-uvindex-value'),
    windspeed: document.getElementById('wwa-weather-now-windspeed-value'),
    moonphaseIcon: document.getElementById('wwa-weather-now-moonphase-icon'),
    moonphaseLabel: document.getElementById('wwa-weather-now-moonphase-label'),

    fetch(city, weather) {
        this.fetchIcon(weather.now.icon);
        this.fetchConditions(weather.now.conditions);
        this.fetchLocal(city.name, city.region, city.country);
        this.fetchTemp(weather.now.temp);
        this.fetchHour(weather.now.hour);
        this.fetchFeelslike(weather.now.feelslike);
        this.fetchPrecipprob(weather.now.precipprob);
        this.fetchHumidity(weather.now.humidity);
        this.fetchDate(weather.now.date);
        this.fetchWeekday(weather.now.date);
        this.fetchUvindex(weather.now.uvindex);
        this.fetchWindspeed(weather.now.windspeed);
        this.fetchMoonphase(weather.now.moonphase);
    },

    fetchIcon(icon) {
        this.icon.innerHTML = '';
        this.icon.appendChild(Icon.build(icon));
    },

    fetchConditions(conditions) {
        this.conditions.textContent = conditions;
    },

    fetchLocal(localName, region, country) {
        this.local.textContent = `${localName}, ${region}, ${country}`;
    },

    fetchTemp(temp) {
        this.temp.textContent = temp;
    },

    fetchHour(hour) {
        this.hour.textContent = hour;
    },

    fetchFeelslike(feelslike) {
        this.feelslike.textContent = feelslike;
    },

    fetchPrecipprob(precipprob) {
        this.precipprob.textContent = precipprob;
    },

    fetchHumidity(humidity) {
        this.humidity.textContent = humidity;
    },

    fetchDate(date) {
        this.date.textContent = date.toLocaleDateString('pt-BR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    },

    fetchWeekday(date) {
        this.weekday.textContent = date.toLocaleDateString('pt-BR', {
            weekday: 'long',
        });
    },

    fetchUvindex(uvindex) {
        const uvParams = Uvindex.getParams(uvindex);
        const badge = document.createElement('span');
        badge.className = `badge mx-1 text-bg-${uvParams.badgeClass}`;
        badge.title = uvParams.recomendation;
        badge.textContent = `UV ${uvParams.label}`;
        this.uvindex.innerHTML = '';
        this.uvindex.textContent = uvindex;
        this.uvindex.appendChild(badge);
    },

    fetchWindspeed(windspeed) {
        this.windspeed.textContent = windspeed;
    },

    fetchMoonphase(fract) {
        const phase = Moonphase.get(fract);
        const icon = document.createElement('i');
        icon.className = phase.icon.className;
        icon.style = phase.icon.style;
        this.moonphaseIcon.textContent = '';
        this.moonphaseIcon.appendChild(icon);
        this.moonphaseLabel.textContent = phase.name.pt;

    }
};

const favToggle = {

    element: document.getElementById('wwa-weather-now-local-fav'),
    SAVED_CLASS: 'bi-star-fill',
    UNSAVED_CLASS: 'bi-star',

    fetch(city) {
        this.setState(favlist.isFav(city));
        const newElement = this.element.cloneNode(true);
        this.element.parentNode.replaceChild(newElement, this.element);
        this.element = newElement;
        this.element.addEventListener('click', e => {
            e.stopPropagation();
            this.toggle(city);
        });
    },

    toggle(city) {
        if (!favlist.isFav(city)) {
            favlist.add(city);
            this.setState(true);
            return;
        }
        favlist.remove(city);
        this.setState(false);
    },

    setState(saved) {
        if (saved) {
            this.element.classList.add(this.SAVED_CLASS);
            this.element.classList.remove(this.UNSAVED_CLASS);
            return;
        }
        this.element.classList.remove(this.SAVED_CLASS);
        this.element.classList.add(this.UNSAVED_CLASS);
    },
}

//////////////////////////////////////////////////////////////////////////////////////

function fetchSearchResultList(cities) {
    searchResultList.innerHTML = '';
    if (!cities) {
        searchResult.hidden = true;
        return;
    }
    searchResult.hidden = false;
    for (const city of cities) {
        const btn = document.createElement('button');
        btn.textContent = `${city.name}, ${city.region}, ${city.country}`;
        btn.className = 'btn btn-sm btn-light m-1';
        btn.addEventListener('click', e => {
            e.stopPropagation();
            fetchWeather(city);
        });
        searchResultList.appendChild(btn);
    }
}

const fetchWeather = async (city) => {
    const weather = await visualcrossing.loadWeather(city.lat, city.lng);
    searchResult.close();
    nowSection.fetch(city, weather);
    favToggle.fetch(city);
}

//////////////////////////////////////////////////////////////////////////////////////

searchInput.addEventListener('keydown', async e => {
    const searchText = searchInput.value.trim();
    if (searchText === '') {
        fetchSearchResultList();
        return;
    };
    fetchSearchResultList(await geonames.find(searchText));
})

window.addEventListener('load', e => {
    fetchSearchResultList();
})