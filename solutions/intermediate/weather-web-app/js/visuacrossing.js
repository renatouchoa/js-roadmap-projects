class Condition {

    hour;
    date;
    conditions;
    temp;
    feelslike;
    humidity;
    icon;
    precipprob;
    uvindex;
    windspeed;
    moonphase;
    tempmax;
    tempmin;

    constructor(conditions) {
        this.hour = parseInt(conditions.datetime.split(':')[0], 10);
        this.date = new Date(conditions.datetimeEpoch * 1000);
        this.conditions = conditions.conditions;
        this.temp = conditions.temp.toFixed(0);
        this.feelslike = conditions.feelslike.toFixed(0);
        this.humidity = conditions.humidity.toFixed(0);
        this.icon = conditions.icon;
        this.precipprob = conditions.precipprob;
        this.uvindex = conditions.uvindex;
        this.windspeed = conditions.windspeed.toFixed(0);
        this.moonphase = conditions.moonphase;
        if (conditions.tempmin) {
            this.tempmin = conditions.tempmin.toFixed(0);
        }
        if (conditions.tempmax) {
            this.tempmax = conditions.tempmax.toFixed(0);
        }
    }
}

export default class Visualcrossing {

    apiKey = '';

    mockResponses = false;

    constructor(params) {
        this.apiKey = params.apiKey;
        this.mockResponses = params.mockResponses;
    }

    async get(lat, lng) {
        let weather = null;
        try {
            let url = encodeURI('./js/mock_data/visualcrossing.json');
            if (!this.mockResponses) {
                url = encodeURI(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lng}/yesterday/next16days?key=${this.apiKey}&lang=pt&unitGroup=metric&include=hours,current,days,alerts`);
            }
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('VisualCrossing fetch error');
            }
            const data = await response.json();
            weather = {
                now: new Condition(data.currentConditions),
                hourly: this.#fetchHourly(data),
                daily: this.#fetchDaily(data),
            };
            console.log(weather)
        } catch (error) {
            console.log(error.message);
        }
        return weather;
    }

    #fetchHourly(data) {

        let yesterday = data.days[0].hours;
        let today = data.days[1].hours;
        let tomorrow = data.days[2].hours;

        const nowHour = (new Condition(data.currentConditions)).hour;

        const start = nowHour - 12 < 0 ? 0 : nowHour - 12;
        const end = nowHour + 12 > 23 ? 23 : nowHour + 12;
        today = today.slice(start, end + 1);

        if (nowHour < 12) {
            yesterday = yesterday.slice((12 - nowHour) * -1);
        } else {
            yesterday = [];
        }

        if (nowHour >= 12) {
            tomorrow = tomorrow.slice(0, (nowHour - 12) + 1);
        } else {
            tomorrow = [];
        }

        const hourly = [...yesterday, ...today, ...tomorrow];
        return hourly.map(hourConditions => new Condition(hourConditions));
    }

    #fetchDaily(data) {
        const daily = data.days.map(day => new Condition(day));
        return daily.slice(3);
    }

}