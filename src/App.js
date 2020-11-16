import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [numberArray, setNumberArray] = useState(null);
  const [removedNum, setRemovedNum] = useState(null);
  const [foundValues, setFoundValues] = useState(null);

  useEffect(() => {
    if (numberArray === null) {
      const randArray = Array.from({ length: 20 }, () =>
        Math.floor(Math.random() * 15)
      );
      setNumberArray(randArray);
    }
    console.log(numberArray);

    if (removedNum) {
      setFoundValues(() => {
        let tempObj = {};
        let res = [];

        for (let i = 0; i < numberArray.length; i++) {
          if (tempObj[numberArray[i]]) {
            res.push([tempObj[numberArray[i]], numberArray[i]]);
          } else {
            tempObj[removedNum - numberArray[i]] = numberArray[i];
          }
        }
        return res;
      });
    }
  }, [numberArray, removedNum]);

  const handleClick = (i) => {
    //remove clicked item from array
    const index = numberArray.indexOf(i);
    if (index > -1) {
      let temp = numberArray.slice();
      setRemovedNum(() => temp.splice(index, 1));
      temp.splice(index, 1);

      setNumberArray(() => temp);
    }
  };

  const removePair = () => {
    let temp = numberArray.slice();

    const firstPair = foundValues[0];

    const firstIndex = numberArray.indexOf(firstPair[0]);
    const secondIndex = numberArray.indexOf(firstPair[1]);

    temp.splice(firstIndex, 1);
    temp.splice(secondIndex, 1);
    console.log(temp);
    setNumberArray(() => temp);
  };

  return (
    <div className="App">
      <div className="App-container">
        <div
          style={{ display: "flex", alignContent: "flex-start", width: "90vw" }}
        >
          <h3>Click a Number</h3>
        </div>
        <div className="Game">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {numberArray &&
              numberArray.map((i, k) => (
                <p
                  key={k}
                  id="integer"
                  onClick={!removedNum ? () => handleClick(i) : null}
                >
                  {i}
                </p>
              ))}
          </div>

          {removedNum && (
            <div style={{ display: "flex", flexDirection: "row" }}>
              You Removed: {removedNum}
            </div>
          )}
          {/* 
          
          - I used JSON.stringify over toString so brackets are visible
           */}
          {foundValues && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p>Possible Pairs to remove: {JSON.stringify(foundValues)}</p>
              {foundValues.length > 0 ? (
                <button id="deleteButton" onClick={() => removePair()}>
                  Remove a possible array
                </button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
