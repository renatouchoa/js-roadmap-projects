/**
 * Geoname class service
 */
export default class Geonames {

    constructor(apiKey, mockResponses) {
        if (!apiKey) {
            throw new Error('Geonames requires apiKey');
        }
        this.username = apiKey;
        this.mockResponses = mockResponses;
    }

    async find(local) {
        const cities = [];
        try {
            if (!local) return null;
            local = local.trim();
            if (local.length < 4) return null;
            let url = encodeURI('./js/mock_data/geonames.json');
            if (!this.mockResponses) {
                url = encodeURI(`http://api.geonames.org/searchJSON?name_startsWith=${local}&featureClass=P&maxRows=10&username=${this.username}`);
            }
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Geoname API error: ${response.status}`);
            }
            const data = await response.json();
            for (const city of data.geonames) {
                cities.push({
                    id: city.geonameId,
                    name: city.name,
                    region: city.adminName1,
                    country: city.countryName,
                    lat: city.lat,
                    lng: city.lng,
                });
            }
        } catch (error) {
            console.log(error);
        }
        return cities;
    }
}