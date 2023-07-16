import { useEffect, useState, useRef } from "react";
import { getWeath } from "../api/openweathermap";
import { getClock, getMonth, getDay } from "../utils/datetime";
import { useAppContext } from "../AppProvider";
import userPhoto from "../assets/user.png";

//src={`http://openweathermap.org/img/w/${weather.icon}.png`}

function Weather() {
  const [weather, setWeather] = useState(null);
  const [date, setDate] = useState(new Date());
  const { city, weatherRefreshInterval, photo, name, authUser } =
    useAppContext();
  const idTimerWeath = useRef(null);
  const idTimerClock = useRef(null);

  const refreshWeath = () => {
    console.log(`Vamos a pedir clima para ${city}`);
    getWeath(city).then((w) => {
      setWeather(w);
    });
  };

  useEffect(() => {
    refreshWeath();
    idTimerWeath.current = setInterval(() => {
      refreshWeath();
    }, weatherRefreshInterval);

    idTimerClock.current = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(idTimerWeath.current);
      clearInterval(idTimerClock.current);
    };
  }, []);

  useEffect(() => {
    console.log(`Se cambió la ciudad a ${city}`);
    clearInterval(idTimerWeath.current);
    refreshWeath();
    idTimerWeath.current = setInterval(() => {
      refreshWeath();
    }, weatherRefreshInterval);
  }, [city]);

  //const icon = `http://openweathermap.org/img/w/${weather.icon}.png`;
  return (
    <div className="navbar">
      {weather && (
        <>
          <div className="calendar">
            <div className="calendar__month">
              {getMonth(date).toUpperCase()}
            </div>
            <div className="calendar__day">{getDay(date)}</div>
            <div className="calendar__date">{date.getDate()}</div>
          </div>
          <div className="clock">
            <div className="clock__city">{city}</div>
            <div className="clock__time">{getClock(date)}</div>
          </div>
          <div className="navbar__weather">
            <div className="navbar__weather-main">
              <img src={weather.icon} alt="" className="navbar__icon" />
              <span className="navbar__temp">{`${weather.temp}°`}</span>
            </div>
            <div className="navbar__weather-secundary">
              <span className="navbar__minmax">{`${weather.temp_max}°/${weather.temp_min}°`}</span>
              <span className="navbar__st">{`ST ${weather.feels_like}°`}</span>
            </div>
          </div>
          <div className="user">
            <img
              className="user__image"
              src={photo ? photo : userPhoto}
              alt=""
            />
            <span className="user__name">{name ? name : "Invitado"}</span>
          </div>
        </>
      )}
    </div>
  );
}
export default Weather;
