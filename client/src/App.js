import React, { useState, useEffect } from "react";
import Axios from 'axios';
import './App.css';

// npm install Axios - to connect the front end with the backend.
// useEffect - Hook - it render the page when we call this. 

function App() {

  const [foodList, setFoodList] = useState([]);

  const [foodName, setFoodName] = useState('');
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');
  const [like, setLike] = useState(false);

  const [newFoodName, setNewFoodName] = useState('');

  useEffect(() => {
    Axios.get("http://localhost:3000/read").then((response) => {
      setFoodList(response.data);
      console.log(response);
    })
  }, [])



  const addToList = () => {
    // console.log(foodName + rating + description + like);
    Axios.post("http://localhost:3000/insert", {
      foodName: foodName,
      rating: rating,
      description: description,
      like: like
    })
  };

  const updatedFood = (id) => {
    Axios.put("http://localhost:3000/update", {
      id: id,
      newFoodName: newFoodName
    });
  };

  const deleteFood = (id) => {
    Axios.delete(`http://localhost:3000/delete/${id}`, {
    });
  };


  return (
    <div className="App">
      <h1>CRUD App with MERN</h1>
      
      <label>Food Name </label>
      <input type="String" onChange={(event) => {
        setFoodName(event.target.value);
      }} />
      <label>Rating</label>
      <input type="Number" onChange={(event) => {
        setRating(event.target.value);
      }} />
      <label>Description</label>
      <input type="String" onChange={(event) => {
        setDescription(event.target.value);
      }} />
      <label>Like</label>
      <input type="Boolean" onChange={(event) => {
        setLike(event.target.value);
      }} />
      <button onClick={addToList} >Add To List</button>

      <hr />
      <h1 className="seprate-data">Food Data List</h1>

      {foodList.map(function (val, key) {
        return (
          <div className="return-item-div" key={key}>
            <h1>Food : {val.foodName}</h1>
            <h3>Rating : {val.rating}</h3>
            <p>Description : {val.description}</p>
            <h4>{val.like}</h4>
            <input type="text" placeholder="New Food Item..." onChange={(event) => {
              setNewFoodName(event.target.value)
            }} />
            <button onClick={() => updatedFood(val._id)} >Update</button>
            <button onClick={() => deleteFood(val._id)} >Delete</button>
          </div>
        )
      })}

    </div>
  );
}

export default App;
