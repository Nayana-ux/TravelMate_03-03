import { useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import DestinationList from "../components/DestinationList";

function Destinations() {

  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    console.log("Button clicked");
    try {
      const response = await API.post("/recommend", {
        climate: "Cold",
        budget: 8000,
        duration: 3,
        activity: "Trekking"
      });

      setResult(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="recommend-bg">

        {/* TOP: EXISTING DESTINATION CARDS */}
        <DestinationList />

        {/* BOTTOM: PREFERENCE FORM */}
        <div className="preference-section">
          <h2>Select Your Preferences</h2>

          <label>Climate</label>
          <select>
            <option>Cold</option>
            <option>Moderate</option>
            <option>Hot</option>
          </select>

          <label>Budget</label>
          <select>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <label>Duration</label>
          <select>
            <option>Weekend</option>
            <option>3–7 days</option>
            <option>Long stay</option>
          </select>

          <label>Activities</label>
          <select>
            <option>Trekking</option>
            <option>Beach</option>
            <option>Culture</option>
            <option>Adventure</option>
          </select>

          <button onClick={handleSubmit}>
            Get Recommendations
          </button>

          {/* SHOW RESULT */}
          {result && (
            <div style={{ marginTop: "20px" }}>
              <h3>{result.bestDestination.name}</h3>
              <p>{result.bestDestination.description}</p>
              <p>{result.explanation}</p>
            </div>
          )}

        </div>

      </div>
    </>
  );
}

export default Destinations;