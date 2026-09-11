export default class Icon {

    static #ICON_SET = {
        'snow': 'bi-snow2',
        'rain': 'bi-cloud-drizzle',
        'fog': 'bi-cloud-fog',
        'wind': 'bi-wind',
        'cloudy': 'bi-cloudy',
        'partly-cloudy-day': 'bi-cloud-sun',
        'partly-cloudy-night': 'bi-cloud-moon',
        'clear-day': 'bi-brightness-high',
        'clear-night': 'bi-moon',
    };

    static #ICON_DEFAULT = 'bi-question-circle';

    static build(icon) {
        const iconElement = document.createElement('i');
        iconElement.className = `bi ${this.#ICON_SET[icon] ?? this.#ICON_DEFAULT}`
        return iconElement;
    }

}