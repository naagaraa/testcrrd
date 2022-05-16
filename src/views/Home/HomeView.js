// import { getDefaultNormalizer } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import "./HomeStyle.css";

export default function HomeView() {
  // forecast
  const [wheather, setWheater] = useState("");
  // current wheater
  const [city, setCity] = useState("");
  const [wind, setWind] = useState("");
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [temp, setTemp] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");

  // handle click form get wheater by city
  const handleSubmit = (e) => {
    e.preventDefault();
    getWheater(e.target[0].value);
    getCurrentWheater(e.target[0].value);
  };

  // use effect react hook for running first time
  useEffect(() => {
    getCurrentWheater();
    getWheater();
  }, []);

  // get wheater
  const getWheater = async (city = "jakarta") => {
    if (city === "") {
      setWheater({
        response: "404",
        responseText: "Not Found",
      });
    } else {
      const apikey = "74cf6fe862d053cc4a21ee2d80bb2c3d";
      const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&cnt=120&units=metric`;
      const response = await fetch(url);

      if (response.status >= 200 && response.status <= 299) {
        const jsonResponse = await response.json();
        setWheater(jsonResponse);
      } else {
        setWheater({
          response: response.status,
          responseText: response.statusText,
        });
      }
    }
  };

  // get current wheater
  const getCurrentWheater = async (city = "jakarta") => {
    const apikey = "74cf6fe862d053cc4a21ee2d80bb2c3d";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    setCity(data.name);
    setDescription(data.weather[0].description);
    setSunrise(
      new Date(data.sys.sunrise).toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    );
    setSunset(
      new Date(data.sys.sunset).toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    );
    setTemp(data.main.temp);
    setWind(data.wind.speed);
    setIcon(data.weather[0].icon);
    // console.log(data);
  };

  return (
    <>
      <div className="container">
        <div className="row mx-auto">
          <div className="col-12 text-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/f6/OpenWeather-Logo.jpg"
              alt="banner"
              width={300}
            />
            <p>technical test Eka Jaya Nagara - Carro ID</p>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-8">
            <div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3 d-flex">
                  <input
                    id="city"
                    type="text"
                    className="form-control"
                    placeholder="Enter city name"
                  />
                  <button type="submit" className="mx-3 btn btn-primary">
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-center mb-5">
          <div className="col-8">
            <div className="container card-wheater">
              <div className="row col-12">
                <h5 className="text-center mt-5 mb-4">
                  {city ? city : "not found"}
                </h5>
              </div>
              <div className="row">
                <div className="col-4 text-center mb-5">
                  {city ? (
                    <img
                      src={
                        city
                          ? `http://openweathermap.org/img/wn/${icon}@2x.png`
                          : ""
                      }
                      alt="icon"
                    />
                  ) : (
                    <></>
                  )}
                  <h5>{city ? description : ""}</h5>
                </div>
                <div className="col-4 text-center my-auto">
                  <h1>{city ? temp + "℃" : ""}</h1>
                </div>
                <div className="col-4">
                  <div>
                    <ul type="none">
                      <li>
                        <h5>{city ? " wind : " + wind + " m/s" : ""}</h5>
                      </li>
                      <li>
                        <h5>{city ? "sunrise : " + sunrise : ""}</h5>
                      </li>
                      <li>
                        <h5>{city ? "sunset : " + sunset : ""}</h5>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                {
                  // wheather.list?.forEach(item, index => {

                  // });

                  wheather.list?.map(
                    (item, index) =>
                      index % 8 === 0 ? (
                        <div className="col text-center" key={index.toString()}>
                          <h5>
                            {item.dt_txt
                              ? new Date(item.dt_txt)
                                  .toLocaleDateString("en-US", {
                                    weekday: "short",
                                  })
                                  .toUpperCase()
                              : "not ready"}
                          </h5>
                          <img
                            src={`http://openweathermap.org/img/wn/${
                              item.weather[0].icon
                                ? item.weather[0].icon
                                : "10n"
                            }@2x.png`}
                            alt="icon"
                          />
                          <h5>
                            {item.main.temp
                              ? item.main.temp + "℃"
                              : "not ready"}
                          </h5>
                        </div>
                      ) : (
                        <></>
                      ) // end return
                    // } else {
                    //   return;
                    // } // end if
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
