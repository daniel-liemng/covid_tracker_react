import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import { Cards, Chart, CountryPicker } from "./components";
import { fetchData } from "./api";
import img from "./images/image.png";

const url = "https://covid19.mathdro.id/api";

const App = () => {
  const [data, setData] = useState({});
  const [country, setCountry] = useState("");

  useEffect(() => {
    const fetchAPI = async () => {
      const res = await fetchData();
      setData(res);
    };

    fetchAPI();
  }, []);

  // handleChange of countries
  const handleCountryChange = async (country) => {
    // console.log(country);
    // 1. fetch data
    const fetchCountryData = await fetchData(country);

    // 2. set the state
    setData(fetchCountryData);
    setCountry(country);
  };

  return (
    <div className={styles.container}>
      <img src={img} alt='covid' className={styles.image} />
      <Cards data={data} />
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Chart data={data} country={country} />
    </div>
  );
};

export default App;
