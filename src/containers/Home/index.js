import React, { useState, useEffect } from "react";

import "./style.css";

const Home = () => {
  const [list, setListItem] = useState([]);
  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    console.log("debug-1:", inputValues);
  }, [inputValues]);

  const addRow = () => {
    const rowId = Math.floor(100000 + Math.random() * 900000);
    setListItem((items) => [
      ...items,
      {
        isDisable: false,
        isAddition: "1",
        rowId,
      },
    ]);
  };

  const deleteRow = (rowId) => {
    const updatedRows = list.filter((item) => item.rowId !== rowId);
    setListItem(updatedRows);

    var allInputValues = inputValues;
    delete allInputValues[rowId];
    setInputValues(allInputValues);
  };

  const disableRow = (rowId) => {
    const updatedRows = list.map((item) => {
      return {
        ...item,
        isDisable: item.isDisable ? item.isDisable : item.rowId === rowId,
      };
    });

    setListItem(updatedRows);
  };

  const onSelectRowOperation = (selectItem, value) => {
    const updatedRows = list.map((item) => {
      return {
        ...item,
        isAddition: item.rowId === selectItem.rowId ? value : item.isAddition,
      };
    });
    setListItem(updatedRows);

    setInputValues((previousValues) => {
      return {
        ...previousValues,
        [selectItem.rowId]: {
          ...previousValues[selectItem.rowId],
          operation: value,
        },
      };
    });
  };

  const getResult = () => {
    // applying bodmas to avoid - 5 + 9 - 1 + 4
    const allInputValueKeys = Object.keys(inputValues);

    const addOperatonValues = [];
    const subOperatonValues = [];

    allInputValueKeys.forEach((rowId) => {
      if (inputValues[rowId].operation === "1") {
        addOperatonValues.push(inputValues[rowId].value);
      } else {
        subOperatonValues.push(inputValues[rowId].value);
      }
    });

    return (
      addOperatonValues.reduce((previousValues, currentValue) => {
        return previousValues + currentValue;
      }, 0) -
      subOperatonValues.reduce((previousValues, currentValue) => {
        return previousValues + currentValue;
      }, 0)
    );

    // return Object.values(inputValues).reduce((previousValues, currentValue) => {
    //   if (currentValue.operation === "1") {
    //     return previousValues + currentValue.value;
    //   }
    //   return previousValues - currentValue.value;
    // }, 0);
  };

  const onChangeInput = (item, value) => {
    setInputValues((previousValues) => {
      return {
        ...previousValues,
        [item.rowId]: {
          operation: item.isAddition,
          value: Number(value),
        },
      };
    });
  };

  return (
    <div className="container">
      <button onClick={addRow} className="addRowButton">
        Add Row
      </button>

      <ul>
        {list.map((item) => (
          <li key={item.rowId}>
            <div className="row">
              <select
                value={item.isAddition}
                onChange={(e) => {
                  onSelectRowOperation(item, e?.target?.value);
                }}
              >
                <option value={"1"}>+</option>
                <option value={"0"}>-</option>
              </select>
              <input
                type="number"
                disabled={item.isDisable}
                onChange={(e) => {
                  onChangeInput(item, e?.target?.value);
                }}
              />
              <button
                onClick={() => {
                  deleteRow(item.rowId);
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  disableRow(item.rowId);
                }}
              >
                Disable
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h4>Result: {getResult()}</h4>
    </div>
  );
};

export default Home;
