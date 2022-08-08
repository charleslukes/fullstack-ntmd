import { useState } from "react";
import "./App.css";

function App() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    const data = event.target.name.value;
    event.preventDefault();
    setLoading(true);
    fetch("http://localhost:3001/api/crypto/generate_hash", {
      method: "post",
      dataType: "json",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((resp) => {
        setResponse(JSON.stringify(resp));
      })
      .catch((err) => {
        setResponse(
          `${err.statusText}, input must be a valid 256 bit hexadecimal`
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label>
            Enter Hexadecimal:
            <input className="main-input" type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div className="board">
          <h3>RESULT</h3>
          <div className="result-board">
            {loading ? "Loading..." : <div className="result">{response}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
