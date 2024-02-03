import { useEffect, useState } from "react";
import axios from "axios";
import "./App.scss";

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(1);

  const fetchData = async () => {
    const options = {
      method: "GET",
      url: "https://currency-exchange.p.rapidapi.com/listquotes",
      headers: {
        "X-RapidAPI-Key": "f247d83749msh6aff2aea57cb3afp1f1581jsn6c7dab755c17",
        "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setCurrencies(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const exchangeData = async () => {
    const options = {
      method: "GET",
      url: "https://currency-exchange.p.rapidapi.com/exchange",
      params: {
        from: `${from}`,
        to: `${to}`,
        q: `${query}`,
      },
      headers: {
        "X-RapidAPI-Key": "f247d83749msh6aff2aea57cb3afp1f1581jsn6c7dab755c17",
        "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setResult(response.data);
      console.log(options);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    exchangeData();
  };

  const newLocal = result * 100;

  return (
    <>
      <div className="app">
        <div className="card">
          <h1>Currency Exchange</h1>
          <form onSubmit={handleSubmit}>
            <div className="select-container">
              <div className="text">
                <h4>From</h4>
                <label>
                  <select
                    name=""
                    id=""
                    onChange={(e) => setFrom(e.target.value)}
                  >
                    {currencies.map((currency) => (
                      <option value={currency}>{currency}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="text">
                <h4>To</h4>
                <label>
                  <select name="" id="" onChange={(e) => setTo(e.target.value)}>
                    {currencies.map((currency) => (
                      <option value={currency}>{currency}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
            <div className="input-wrapper">
              <input
                type="number"
                placeholder="Type here..."
                name="text"
                className="input"
                onChange={handleInputChange}
              />
            </div>
            <button>Submit</button>
          </form>
          <div className="input-wrapper">
            <div className="input">{Math.round(newLocal) / 100}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
