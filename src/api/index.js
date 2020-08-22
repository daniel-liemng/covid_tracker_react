import axios from "axios";

const url = "https://covid19.mathdro.id/api";

// ORIGINAL
// export const fetchData = async () => {
//   try {
//     const {
//       data: { confirmed, recovered, deaths, lastUpdate },
//     } = await axios.get(url);

//     return { confirmed, recovered, deaths, lastUpdate };
//   } catch (error) {
//     console.error(error.message);
//   }
// };

// Fetch all data or data of each country => dynamic URL
export const fetchData = async (country) => {
  let changeableUrl = url;

  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl);

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    console.error(error.message);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);

    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));

    return modifiedData;
  } catch (error) {
    console.error(error.message);
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);

    const names = countries.map(({ name }) => name);
    return names;
  } catch (error) {
    console.error(error.message);
  }
};
