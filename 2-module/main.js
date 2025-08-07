$(document).ready(function() {
    const WEATHER_API_KEY = '0ebc071e5aa3013e4b29274faa8315c6';
    let isCelsius = true;
    let weatherData = null;
    const searchHistory = JSON.parse(localStorage.getItem('weatherHistory')) || [];
    const DEFAULT_CITY = 'Москва'
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
    const HISTORY_LIMIT = 5;

    initApp();

    function initApp() {
        updateHistoryButtons();

        if(searchHistory.length) {
            $('#history-container').fadeIn();
            loadWeather(searchHistory[0]);
        } else {
            loadWeather(DEFAULT_CITY);
        }

        $('#get-weather').click(getWeather);
        $('#unit-toggle').click(toggleTemperatureUnit);
        $('#city-input').keypress(function(e) {
            if (e.which === 13) getWeather();
        });

        $('#temp').click(function() {
            $(this).addClass('highlight');
            setTimeout(() => $(this).removeClass('highlight'), 1500);
            toggleTemperatureUnit();
        });
    }

    function getWeather() {
        const city = $('#city-input').val().trim();
        if (!city) {
            $('#city-input').focus();
            return;
        }

        loadWeather(city);
    }

    function loadWeather(city) {
        showWeatherLoader();
        hideWeatherError();
        hideWeatherCard();

        $('#city-input').val(city);

        $.ajax({
            url: `${BASE_URL}?q=${city}&units=metric&lang=ru&appid=${WEATHER_API_KEY}`,
            method: 'GET',
            success: function(data) {
                weatherData = data;
                displayWeather(data);
                addToHistory(city);
            },
            error: function() {
                showWeatherError();
            }
        });
    }

    function displayWeather(data) {
        const weatherIcons = {
            '01d': 'fas fa-sun',
            '01n': 'fas fa-moon',
            '02d': 'fas fa-cloud-sun',
            '02n': 'fas fa-cloud-moon',
            '03d': 'fas fa-cloud',
            '03n': 'fas fa-cloud',
            '04d': 'fas fa-cloud',
            '04n': 'fas fa-cloud',
            '09d': 'fas fa-cloud-showers-heavy',
            '09n': 'fas fa-cloud-showers-heavy',
            '10d': 'fas fa-cloud-sun-rain',
            '10n': 'fas fa-cloud-moon-rain',
            '11d': 'fas fa-bolt',
            '11n': 'fas fa-bolt',
            '13d': 'fas fa-snowflake',
            '13n': 'fas fa-snowflake',
            '50d': 'fas fa-smog',
            '50n': 'fas fa-smog'
        };

        const iconCode = data.weather[0].icon;
        const weatherIcon = weatherIcons[iconCode] || 'fas fa-cloud';

        $('#city-name').text(data.name);
        $('#weather-icon').attr('class', weatherIcon);
        updateTemperatureDisplay(data.main.temp);
        $('#weather-desc').text(data.weather[0].description);
        $('#wind').text(data.wind.speed + ' м/с');
        $('#humidity').text(data.main.humidity + '%');
        $('#pressure').text(data.main.pressure + ' гПа');
        $('#visibility').text((data.visibility / 1000).toFixed(1) + ' км');

        hideWeatherLoader();
        showWeatherCard();

        $('.detail-card').each(function(index) {
            $(this).hide().delay(100 * index).fadeIn(300);
        });

        $('html, body').animate({
            scrollTop: $("#weather-card").offset().top - 100
        }, 800);
    }

    function toggleTemperatureUnit() {
        isCelsius = !isCelsius;
        $('#unit-toggle').html(`<i class="fas fa-sync-alt"></i> ${isCelsius ? '°C' : '°F'}`);

        if(weatherData) {
            updateTemperatureDisplay(weatherData.main.temp);
        }
    }

    function updateTemperatureDisplay(tempCelsius) {
        const temp = isCelsius ?
            Math.round(tempCelsius) :
            Math.round((tempCelsius * 9/5) + 32);

        $('#temp').text(temp);
        $('#temp-unit').text(isCelsius ? '°C' : '°F');
    }

    function addToHistory(city) {
        const index = searchHistory.indexOf(city);
        if (index !== -1) {
            searchHistory.splice(index, 1);
        }

        searchHistory.unshift(city);

        if(searchHistory.length > HISTORY_LIMIT) {
            searchHistory.pop();
        }
        localStorage.setItem('weatherHistory', JSON.stringify(searchHistory));

        updateHistoryButtons();

        $('#history-container').fadeIn();
    }

    function updateHistoryButtons() {
        const container = $('#history-buttons');
        container.empty();

        searchHistory.forEach(city => {
            container.append(`
          <button class="history-btn" data-city="${city}">
            <i class="fas fa-map-marker-alt"></i> ${city}
          </button>
        `);
        });

        $('.history-btn').click(function() {
            const city = $(this).data('city');
            loadWeather(city);
        });
    }

    function showWeatherLoader() {
        $('#weather-loader').show();
    }

    function hideWeatherLoader() {
        $('#weather-loader').fadeOut(300);
    }

    function showWeatherCard() {
        $('#weather-card').addClass('visible');
    }

    function hideWeatherCard() {
        $('#weather-card').removeClass('visible');
    }

    function showWeatherError() {
        hideWeatherLoader();
        $('#weather-error').fadeIn(300);

        $('#city-input').addClass('highlight');
        setTimeout(() => $('#city-input').removeClass('highlight'), 1500);
    }

    function hideWeatherError() {
        $('#weather-error').hide();
    }
});