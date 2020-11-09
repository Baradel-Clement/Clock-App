function quotesFunction(data) {
    let quote = document.querySelector('.quote');
    let author = document.querySelector('.author');
    quote.innerHTML = data.en
    author.innerHTML = data.author
}

function ipAdressSucess(data) {
    let location = document.querySelector('.location');
    let locationString = `IN ${data.city}, ${data.country_name}`
    location.innerHTML = locationString.toUpperCase();
}

function getHour(data) {
    let hour = data.datetime.slice(11, 16);
    let hourNumber = parseInt(data.datetime.slice(11, 13), 10);
    let hourElement = document.querySelector('.hour');
    let sun_moon = document.querySelector('#sun-moon');
    let backgroundImage = document.querySelector('.background-image');
    let introSentence = document.querySelector('.intro-sentence')
    let displayDetail = document.querySelector('.display-detail')
    hourElement.innerHTML = hour;
    if((hourNumber >= 0 && hourNumber < 6) || (hourNumber >= 19 && hourNumber < 24)) {
        sun_moon.classList.add('moon');
        sun_moon.classList.remove('sun');
        backgroundImage.classList.add('nighttime');
        backgroundImage.classList.remove('daytime');
        displayDetail.classList.add('nighttime')
        displayDetail.classList.remove('daytime')
    } else if (hourNumber >= 6 && hourNumber < 19) {
        sun_moon.classList.add('sun');
        sun_moon.classList.remove('moon');
        backgroundImage.classList.add('daytime');
        backgroundImage.classList.remove('nighttime');
        displayDetail.classList.remove('nighttime')
        displayDetail.classList.add('daytime')
    }

    if (hourNumber >= 0 && hourNumber < 12) {
        introSentence.innerHTML = 'MORNING'
    } else if (hourNumber >= 12 && hourNumber < 19) {
        introSentence.innerHTML = 'AFTERNOON'
    } else if (hourNumber >= 19 && hourNumber != 0) {
        introSentence.innerHTML = 'NIGHT'
    };

    // DISPLAY DETAIL

    const timezone = document.getElementById('timezone')
    const yearDay = document.getElementById('yearDay')
    const weekDay = document.getElementById('weekDay')
    const weekNumber = document.getElementById('weekNumber')

    timezone.innerHTML = data.timezone;
    yearDay.innerHTML = data.day_of_year;
    weekDay.innerHTML = data.day_of_week;
    weekNumber.innerHTML = data.week_number;
}

function landingPage() {
    const loadingPage = document.querySelector('.loading-page');
    window.setTimeout(function () {
        loadingPage.classList.add('active');
        window.setTimeout(function () {
            loadingPage.classList.add('down')
        }, 1200)
    }, 1200)
}
    

function getApi() {
    //URL APIS
    var urlQuotes = 'https://programming-quotes-api.herokuapp.com/quotes/random/lang/en'
    var urlFreeGoIp = 'https://freegeoip.app/json/';
    var urlWorldTimeApi = 'http://worldtimeapi.org/api/ip';

    //CALL API
    $.get(urlQuotes, quotesFunction).done(function () {

    })
    $.get(urlFreeGoIp, ipAdressSucess).done(function () {

    })
    $.get(urlWorldTimeApi, getHour).done(function () {

    })
    window.setInterval(function() {
        $.get(urlWorldTimeApi, getHour).done(function () {

        })
    }, 3000)

    const button = document.querySelector('.button');
    const defaultDisplay = document.querySelector('.default-display');
    const displayDetail = document.querySelector('.display-detail');

    button.addEventListener('click', () => {
        const lessText = document.querySelector('.less');
        lessText.classList.toggle('active')
        button.firstElementChild.classList.toggle('active')
        button.lastElementChild.classList.toggle('active')
        button.lastElementChild.previousElementSibling.classList.toggle('active')
        defaultDisplay.classList.toggle('active');
        displayDetail.classList.toggle('active');
    })

    refresh.addEventListener('click', () => {
        $.get(urlQuotes, quotesFunction).done(function () {})
    })
}