import clearday from '../../../../assets/SmallWeatherIcons/clearday.svg';
import clearnight from '../../../../assets/SmallWeatherIcons/clearnight.svg';
import cloudy from '../../../../assets/SmallWeatherIcons/cloudy.svg';
import fog from '../../../../assets/SmallWeatherIcons/fog.svg';
import partlycloudyday from '../../../../assets/SmallWeatherIcons/partlycloudyday.svg';
import partlycloudynight from '../../../../assets/SmallWeatherIcons/partlycloudynight.svg';
import rain from '../../../../assets/SmallWeatherIcons/rain.svg';
import sleet from '../../../../assets/SmallWeatherIcons/sleet.svg';
import snow from '../../../../assets/SmallWeatherIcons/snow.svg';
import thunderstorm from '../../../../assets/SmallWeatherIcons/thunderstorm.svg';
import tornado from '../../../../assets/SmallWeatherIcons/tornado.svg';
import wind from '../../../../assets/SmallWeatherIcons/wind.svg';

export const getIcon = (icon) => {
    switch (icon) {
        case 'clear-night':
            return clearnight;
        case 'cloudy':
            return cloudy;
        case 'fog':
            return fog;
        case 'partly-cloudy-day':
            return partlycloudyday;
        case 'partly-cloudy-night':
            return partlycloudynight;
        case 'rain':
            return rain;
        case 'snow':
            return snow;
        case 'sleet':
            return sleet;
        case 'thunderstorm':
            return thunderstorm;
        case 'tornado':
            return tornado;
        case 'wind':
            return wind;
        default:
            return clearday;
    }
}

export const getMonth = (month) => {
    let months = {
        'Jan': 'January', 'Feb': 'Febuary', 'Mar': 'March', 'Apr': 'April', 'May': 'May',
        'Jun': 'June', 'Jul': 'July', 'Aug': 'August', 'Sep': 'September', 'Oct': 'October',
        'Nov': 'November', 'Dec': 'December'
    }
    return months[month];
}

export const getDay = (day) => {
    let days = { 'Sun' : 'Sunday', 'Mon' : 'Monday', 'Tue' : 'Tuesday', 'Wed' : 'Wednesday', 
        'Thu' : 'Thursday', 'Fri' : 'Friday', 'Sat' : 'Saturday'
    }
    return days[day];
}

export const isToggled = (arr) => {
    let toggled = false;
    for (let key in arr) {
        if (arr[key].isToggled === true) {
            toggled = true;
        }
    }
    return toggled;
}