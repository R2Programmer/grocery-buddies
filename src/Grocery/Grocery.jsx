import React, { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import "./Grocery.css";
import GroceryItemComponent from "../Components/GroceryComponent";

const Grocery = () => {
  const inputRef = useRef();
  const [grocery, setGrocery] = useState("");
  const [groceryList, setGroceryList] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (grocery) {
      setGroceryList([...groceryList, { id: uuid(), name: grocery }]);
      setGrocery("");
      setError("");
    } else {
      setError("Grocery must not be empty");
      inputRef.current.focus();
    }
  };
  const handleEditItem = (id, newItem) => {
    const updatedGroceryItems = groceryList.map((grocery) => {
      if (grocery.id === id) {
        return { ...grocery, name: newItem };
      }

      return grocery;
    });
    setGroceryList(updatedGroceryItems);
  };

  const handleDeleteItem = (removeId) => {
    const filteredItems = groceryList.filter(
      (grocery) => grocery.id !== removeId
    );
    setGroceryList(filteredItems);
  };

  const handleClearItems = () => {
    setGroceryList([]);
  };

  return (
    <>
      <div className="row justify-content-center md-3">
        <div className="col-md-4 text-center">
          <h1>GROCERY BUDDY</h1>
          <p className="text-info">This is My Grocery List.</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <form onSubmit={handleSubmit} className="form-inline">
            <div className="col-md-10 form-group">
              <input
                type="text"
                placeholder="Add New Grocery List here"
                value={grocery}
                onChange={(e) => setGrocery(e.target.value)}
                className="form-control-plaintext drop-shadow"
                ref={inputRef}
              />
              {error ? <p className="text-danger mt-2">{error}</p> : null}
            </div>
            <button
              type="submit"
              className="btn btn-primary col-md-2 btn-todo btn-block drop-shadow"
            >
              Add
            </button>
          </form>
        </div>
      </div>
      <div class="row todo-list justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <ul className="grocery-list">
                {groceryList.map((grocery) => (
                  <GroceryItemComponent
                    key={grocery.id}
                    item={grocery}
                    handleEditItem={handleEditItem}
                    handleDeleteItem={handleDeleteItem}
                  />
                ))}
                {groceryList.length > 0 ? (
                  <p onClick={handleClearItems} className="btn-clear">
                    Clear Grocery Items{" "}
                  </p>
                ) : null}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Grocery;
