import { FormEvent, useState } from "react";
import { Loader, Placeholder } from "@aws-amplify/ui-react";
import "./App.css";
import { Amplify } from "aws-amplify";
import { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";


import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

const amplifyClient = generateClient<Schema>({
  authMode: "userPool",
});

function App() {

  const [loading, setLoading] = useState(false);
  const [number1, setNumber1] = useState<number | null>(null);
  const [number2, setNumber2] = useState<number | null>(null);
  const [result, setResult] = useState<number | null>(null);

  
 
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      

      const ingredients = [formData.get("ingredients")?.toString() || ""];
      console.log(ingredients);

      const { data, errors } = await amplifyClient.queries.askBedrock({
        ingredients: [formData.get("ingredients")?.toString() || ""],
      });

      console.log ("Returned")
      console.log (data);
      console.log (errors);

      if (!errors) {
        setResult(data?.body ? parseFloat(data.body) : null);      } else {
        console.log(errors);
      }

  
    } catch (e) {
      alert(`An error occurred: ${e}`);
    } finally {
      setLoading(false);
    }
  };

  const onDoubleNumber = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (number1 !== null && number2 !== null) {
      setLoading(true);
      try {
        const response = await amplifyClient.queries.multiplyNumbers({ number1, number2 });
        if (response.data?.result !== undefined) {
          setResult(response.data.result);
        } else {
          setResult(null);
        }
      } catch (error) {
        console.error("Error multiplying numbers:", error);
        setResult(null);
      } finally {
        setLoading(false);
      }
    }
  };


  return (
    <div className="app-container">
      <div className="header-container">
        <h1 className="main-header">
          Meet Your Personal
          <br />
          <span className="highlight">Recipe AI</span>
        </h1>
        <p className="description">
          Simply type a few ingredients using the format ingredient1,
          ingredient2, etc., and Recipe AI will generate an all-new recipe on
          demand... **
        </p>
      </div>
      <form onSubmit={onSubmit} className="form-container">
        <div className="search-container">
          <input
            type="text"
            className="wide-input"
            id="ingredients"
            name="ingredients"
            placeholder="Ingredient1, Ingredient2, Ingredient3,...etc"
          />
          <button type="submit" className="search-button">
            Generate
          </button>
        </div>
      </form>
      <div className="result-container">
        {loading ? (
          <div className="loader-container">
            <p>Loading...</p>
            <Loader size="large" />
            <Placeholder size="large" />
            <Placeholder size="large" />
            <Placeholder size="large" />
          </div>
        ) : (
          result && <p className="result">{result}</p>
        )}
      </div>
   <div className="double-number-container">
        <h2>Double a Number</h2>
        <form onSubmit={onDoubleNumber} className="form-container">
          <div className="search-container">
          <input
            type="number"
            value={number1 ?? ""}
            onChange={(e) => setNumber1(parseFloat(e.target.value))}
            className="wide-input"
            placeholder="Enter first number"
          />
          <input
            type="number"
            value={number2 ?? ""}
            onChange={(e) => setNumber2(parseFloat(e.target.value))}
            className="wide-input"
            placeholder="Enter second number"
          />
            <button type="submit" className="search-button">
              Double It
            </button>
          </div>
        </form>
        <div className="result-container">
        {loading ? (
          <div className="loader-container">
            <p>Loading...</p>
            <Loader size="large" />
          </div>
        ) : (
          result !== null && <p className="result">Product: {result}</p>
        )}
      </div>
      </div>
    </div>
  );
}

export default App;