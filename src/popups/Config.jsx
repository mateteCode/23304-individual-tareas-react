import { useState } from "react";
import { checkCityExists } from "../api/openweathermap";
import { useAppContext } from "../AppProvider";
import { saveCity } from "../api/firebase";

const Config = () => {
  const [cityInput, setCityInput] = useState("");
  const [cityFound, setCityFound] = useState(null);
  const { dispatch, userId, city } = useAppContext();
  const [cityMessage, setCityMessage] = useState(`Ciudad actual: ${city}`);

  const handleSearchCityBtn = () => {
    checkCityExists(cityInput).then((found) => {
      if (found) {
        console.log("Ciudad encontrada");
        setCityMessage(`Ciudad encontrada: ${found}`);
      } else {
        console.log("No existe la ciudad");
        setCityMessage(`No existe la ciudad buscada`);
      }
      setCityFound(found);
    });
  };

  const handleAcceptBtn = () => {
    if (cityFound) {
      saveCity(userId, cityFound)
        .then(() => {
          dispatch({ type: "SET_CITY", value: cityFound });
        })
        .catch((err) => {
          console.log("No se puede guardar la ciudad encontrada");
        });
    }
    dispatch({ type: "TOGGLE_POPUP_CONFIG" });
  };

  return (
    <div className="config">
      <h2 className="config__title">Configuración</h2>
      <div className="config__group-col">
        <label className="config__label">Ciudad para el clima:</label>
        <div className="config__group-row">
          <input
            className="config__input-city"
            type="text"
            placeholder="Escriba tu ciudad"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
          />
          <button
            className="config__btn-search"
            onClick={handleSearchCityBtn}
            disabled={cityInput == ""}
          >
            Buscar
          </button>
        </div>
        <p className="config__city-status">{cityMessage}</p>
      </div>
      <div className="config__group-col">
        <button className="config__btn-accept" onClick={handleAcceptBtn}>
          Aceptar
        </button>
      </div>
    </div>
  );
};
export default Config;
