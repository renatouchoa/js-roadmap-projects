import params from '../params.json' with {type: 'json'};
import Geonames from './geonames.js';
import Visualcrossing from './visuacrossing.js';
import Icon from './icon.js';
import Uvindex from './uvindex.js';
import Moonphase from './moonphase.js';
import Favlist from './favlist.js';
import MyDOM from './mydom.js';

//////////////////////////////////////////////////////////////////////////////////////

const MOCK_RESPONSES = false;

//////////////////////////////////////////////////////////////////////////////////////

const geonames = new Geonames({ ...params.geonames, mockResponses: MOCK_RESPONSES });
const visualcrossing = new Visualcrossing({ ...params.visualcrossing, mockResponses: MOCK_RESPONSES })
const favlist = new Favlist();

//////////////////////////////////////////////////////////////////////////////////////

var weatherSection = {

    parent: document.getElementById('wwa-weather'),

    show() {
        this.parent.hidden = false;
    },

    hide() {
        this.parent.hidden = true;
    }
}

//////////////////////////////////////////////////////////////////////////////////////

var cityOption = {

    build(city) {
        const btn = document.createElement('button');
        btn.textContent = `${city.name}, ${city.region}, ${city.country}`;
        btn.className = 'btn btn-sm btn-light m-1';
        btn.addEventListener('click', e => {
            e.stopPropagation();
            fetchWeather(city);
        });
        return btn;
    }

};

//////////////////////////////////////////////////////////////////////////////////////

var searchResult = {

    parent: document.getElementById('wwa-search-result'),
    list: document.getElementById('wwa-search-result-list'),

    fetch(cities) {
        if (!cities) {
            this.hide()
            return;
        }
        this.list.innerHTML = '';
        cities.forEach(city => {
            this.list.appendChild(cityOption.build(city));
        });
        this.show();
    },

    show() {
        this.parent.hidden = false;
    },

    hide() {
        this.parent.hidden = true;
    },

};

//////////////////////////////////////////////////////////////////////////////////////

var searchFav = {

    parent: document.getElementById('wwa-search-fav'),
    list: document.getElementById('wwa-search-fav-list'),

    fetch() {
        this.list.innerHTML = '';
        const cities = favlist.getList();
        console.log(cities);
        if (cities.size === 0) {
            this.fetchEmpty();
            return;
        }
        cities.forEach(city => {
            this.list.appendChild(cityOption.build(city));
        });
    },

    fetchEmpty() {
        this.list.innerHTML = '';
        const emptyMessage = document.createElement('p');
        emptyMessage.className = 'empty';
        emptyMessage.textContent = 'Nenhum local favoritado.';
        this.list.appendChild(emptyMessage);
    }

}

//////////////////////////////////////////////////////////////////////////////////////

var search = {

    parent: document.getElementById('wwa-search'),

    fetch() {
        searchResult.fetch();
        searchFav.fetch();
        this.parent.addEventListener('focusout', e => {
            this.hide();
        });
    },

    hide() {
        this.parent.hidden = true;
    },

    show() {
        this.parent.hidden = false;
    }

};

//////////////////////////////////////////////////////////////////////////////////////

var searchForm = {

    input: document.getElementById('wwa-form-input'),

    fetch() {

        this.input.addEventListener('input', async e => {
            const searchText = this.input.value.trim();
            if (searchText === '' || searchText.length < 3) {
                searchResult.fetch();
                return;
            };
            searchResult.fetch(await geonames.find(searchText));
            setTimeout(() => { this.waiting = false; }, 2000);
            this.waiting = true;
            return;
        });

        this.input.addEventListener('focus', e => {
            search.show();
        });
    },
};

//////////////////////////////////////////////////////////////////////////////////////

var nowSection = {

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
        const icon = Moonphase.buildIcon(fract);
        this.moonphaseIcon.textContent = '';
        this.moonphaseIcon.appendChild(icon);
        this.moonphaseLabel.textContent = phase.name.pt;

    }
};

//////////////////////////////////////////////////////////////////////////////////////

var hourly = {

    element: document.getElementById('wwa-weather-hourly-container'),

    fetch(hourly) {
        this.element.innerHTML = '';
        for (const hour of hourly) {
            this.element.appendChild(this.buildHour(hour));
        }
    },

    buildHour(hour) {
        const hourElement = document.createElement('div');
        hourElement.className = 'wwa-weather-hourly-hour';
        hourElement.appendChild(this.buildTitle(hour.hour));
        hourElement.appendChild(this.buildIcon(hour.icon, hour.conditions));
        hourElement.appendChild(this.buildTemp(hour.temp));
        return hourElement;
    },

    buildTitle(title) {
        const titleElement = document.createElement('span');
        titleElement.className = 'wwa-weather-hourly-hour-title';
        titleElement.textContent = `${title}h`;
        return titleElement;
    },

    buildIcon(icon, conditions) {
        const iconElement = Icon.build(icon);
        iconElement.title = conditions;
        iconElement.classList.add('wwa-weather-hourly-hour-icon')
        return iconElement;
    },

    buildTemp(temp) {
        const tempElement = document.createElement('span');
        tempElement.className = 'wwa-weather-hourly-hour-temp';
        tempElement.textContent = `${temp}°`;
        return tempElement;
    },
}

//////////////////////////////////////////////////////////////////////////////////////

var daily = {

    element: document.getElementById('wwa-weather-daily-container'),

    fetch(daily) {
        this.element.innerHTML = '';
        daily.forEach(day => {
            this.element.appendChild(this.fetchDay(day));
        });
    },

    fetchDay(day) {
        const dayElement = document.createElement('div');
        dayElement.className = 'wwa-weather-daily-day';
        const dayNumber = day.date.getUTCDate();
        const dayName = day.date.toLocaleDateString('pt-BR', {
            weekday: 'short',
        });
        dayElement.appendChild(this.fetchDayTitle(dayNumber, dayName));
        dayElement.appendChild(this.fetchDayIcon(day.icon));
        dayElement.appendChild(this.fetchDayTemp(day.tempmin, day.tempmax));
        dayElement.appendChild(this.fetchDayVars(day));
        return dayElement;
    },

    fetchDayTitle(dayNumber, dayName) {
        const number = document.createElement('span');
        number.className = 'number';
        number.textContent = dayNumber;
        const name = document.createElement('span');
        name.className = 'name';
        name.textContent = dayName;
        const title = document.createElement('span');
        title.className = 'wwa-weather-daily-day-title';
        title.appendChild(number);
        title.append(name);
        return title;
    },

    fetchDayIcon(icon) {
        const iconElement = document.createElement('span');
        iconElement.className = 'wwa-weather-daily-day-icon';
        iconElement.appendChild(Icon.build(icon));
        return iconElement;
    },

    fetchDayTemp(min, max) {
        const tempElement = document.createElement('ul');
        tempElement.className = 'wwa-weather-daily-day-temp';
        const minElement = document.createElement('li');
        minElement.className = 'min';
        minElement.textContent = `${min}°`;
        const maxElement = document.createElement('li');
        maxElement.className = 'max';
        maxElement.textContent = `${max}°`;
        tempElement.appendChild(minElement);
        tempElement.appendChild(maxElement);
        return tempElement;
    },

    fetchDayVars(day) {
        const varsElement = document.createElement('div');
        varsElement.className = 'wwa-weather-daily-day-vars withicons';
        varsElement.appendChild(MyDOM.create(`
            <ul>
                <li class="precipprob" title="Probabilidade de chuva">
                    <span class="d-none d-lg-inline">Probabilidade de chuva: </span>
                    ${day.precipprob}% 
                </li>
                <li class="feelslike" title="Sensação térmica">
                    <span class="d-none d-lg-inline">Sensação térmica: </span>
                    ${day.feelslike}°
                </li>
                <li class="humidity">
                    <span class="d-none d-lg-inline">Umidade relativa do ar: </span>
                    ${day.humidity}%
                </li>
            </ul>
        `));
        varsElement.appendChild(MyDOM.create(`
            <ul>
                <li class="uvindex">
                    <span class="d-none d-lg-inline">Índice UV: </span>
                    ${day.uvindex}
                </li>
                <li class="windspeed">
                    <span class="d-none d-lg-inline">Velocidade do vento: </span>
                    ${day.windspeed}km/h
                </li>
                <li class="moonphase">
                    ${Moonphase.buildIcon(day.moonphase).outerHTML}
                    ${Moonphase.get(day.moonphase).name.pt}
                </li>
            </ul>
        `));
        return varsElement;
    }

}

//////////////////////////////////////////////////////////////////////////////////////

var favToggle = {

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
            searchFav.fetch();
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

var fetchWeather = async (city) => {
    search.hide();
    const weather = await visualcrossing.get(city.lat, city.lng);
    nowSection.fetch(city, weather);
    hourly.fetch(weather.hourly);
    daily.fetch(weather.daily);
    favToggle.fetch(city);
    searchFav.fetch();
    weatherSection.show();
}

//////////////////////////////////////////////////////////////////////////////////////

window.addEventListener('load', e => {
    searchForm.fetch();
    search.fetch();
    weatherSection.hide();
})

document.addEventListener('click', e => {
    if (e.target !== searchForm.input) {
        search.hide()
    }
});