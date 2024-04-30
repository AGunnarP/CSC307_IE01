// src/MyApp.jsx
import React, {useState, useEffect} from 'react';
import Table from "./Table";

function MyApp() {
  const [characters, setCharacters] = useState([

    
  ]);

  async function fetchUsers() {
    try {
      const response = await fetch("http://localhost:8000/users");
      const data = await response.json();
      setCharacters(data["users_list"]);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

useEffect(() => {
  fetchUsers();
}, []);

async function removeOneCharacter(index) {
  try {
    const userId = characters[index].id; // Assuming each user has an id
    await deleteUser(userId);
    setCharacters(prevCharacters => prevCharacters.filter((_, i) => i !== index));
  } catch (error) {
    console.error("Error removing user:", error);
  }
}

async function addCharacter(user) {
  try {
    const newUser = await postUser(user);
    setCharacters(prevCharacters => [...prevCharacters, newUser]);
  } catch (error) {
    console.error("Error adding user:", error);
  }
}

  // src/MyApp.js (a new inner function inside MyApp())

function updateList(person) { 
  postUser(person)
    .then(response => setCharacters([...characters, response.body]))
    .catch((error) => {
      console.log(error);
    })
}

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
    </div>
  );
}

// src/MyApp.js (a new inner function inside MyApp())

function deleteUser(person){

  const promise = fetch(`http://localhost:8000/users/${person.id}` ,{

    method: "DELETE",
  });

  return promise;

}

function postUser(person) {
  const promise = fetch("Http://localhost:8000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  });

  return promise;
}

export default MyApp;