export default class Visualcrossing {

    constructor(apiKey, mockResponses = true) {
        if (!apiKey) {
            throw new Error('Visualcrossing requires apiKey');
        }
        this.apiKey = apiKey;
        this.mockResponses = mockResponses;
    }

    async loadWeather(lat, lng) {
        let weather = null;
        try {
            let url = encodeURI('./js/mock_data/visualcrossing.json');
            if (!this.mockResponses) {
                url = encodeURI(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lng}/yesterday/today?key=${this.apiKey}&lang=pt&unitGroup=metric`);
            }
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('VisualCrossing fetch error');
            }
            const data = await response.json();
            weather = {
                now: {
                    date: new Date(data.currentConditions.datetimeEpoch * 1000),
                    hour: parseInt(data.currentConditions.datetime.split(':')[0], 10),
                    conditions: data.currentConditions.conditions,
                    temp: data.currentConditions.temp.toFixed(0),
                    feelslike: data.currentConditions.feelslike.toFixed(0),
                    humidity: data.currentConditions.humidity.toFixed(0),
                    icon: data.currentConditions.icon,
                    precipprob: data.currentConditions.precipprob,
                    uvindex: data.currentConditions.uvindex,
                    windspeed: data.currentConditions.windspeed.toFixed(0),
                    moonphase: data.currentConditions.moonphase,
                },
            };
        } catch (error) {
            console.log(error);
        }
        return weather;
    }

};