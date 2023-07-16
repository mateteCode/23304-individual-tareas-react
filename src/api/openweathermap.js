import { random } from "nanoid";

const API_KEY = "d946ff2e2575a8ee273a6ef1013ffc14";
const CITY_DEFAULT = "CABA, AR";
import iconDay from "../assets/weather/day.svg";
import iconNight from "../assets/weather/night.svg";
import iconCloudyDay from "../assets/weather/cloudy-day-1.svg";
import iconCloudyNight from "../assets/weather/cloudy-night-1.svg";
import iconCloudy from "../assets/weather/cloudy.svg";
import iconRainy5 from "../assets/weather/rainy-5.svg";
import iconRainy1 from "../assets/weather/rainy-1.svg";
import iconThunder from "../assets/weather/thunder.svg";
import iconSnowyDay from "../assets/weather/snowy-3.svg";
import iconSnowyNight from "../assets/weather/snowy-5.svg";

const animatedIcon = {
  icon01d: iconDay,
  icon01n: iconNight,
  icon02d: iconCloudyDay,
  icon02n: iconCloudyNight,
  icon03d: iconCloudy,
  icon03n: iconCloudy,
  icon04d: iconCloudy,
  icon04n: iconCloudy,
  icon09d: iconRainy5,
  icon09n: iconRainy5,
  icon10d: iconRainy1,
  icon10n: iconRainy5,
  icon11d: iconThunder,
  icon11n: iconThunder,
  icon13d: iconSnowyDay,
  icon13n: iconSnowyNight,
  icon50d: iconCloudy,
  icon50n: iconCloudy,
};

export const getWeath = async (city = CITY_DEFAULT) => {
  let URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`;
  const resp = await fetch(URL);
  const json = await resp.json();
  console.log(json);
  return {
    feels_like: Math.round(json.main.feels_like),
    humidity: Math.round(json.main.humidity),
    temp: Math.round(json.main.temp),
    temp_max: Math.round(json.main.temp_max),
    temp_min: Math.round(json.main.temp_min),
    name: json.name,
    description: json.weather[0].description,
    //icon: json.weather[0].icon,
    icon: animatedIcon[`icon${json.weather[0].icon}`],
    wind_speed: Math.round(json.wind.speed),
  };
};

export const checkCityExists = async (city) => {
  console.log(city);
  let URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`;
  const resp = await fetch(URL);
  const json = await resp.json();
  console.log(json);
  return json.cod === 200 ? json.name : null;
};
