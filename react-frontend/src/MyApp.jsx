// src/MyApp.jsx
import React, {useState, useEffect} from 'react';
import Table from "./Table";

function MyApp() {
  const [characters, setCharacters] = useState([
    {
      name: "Charlie",
      job: "Janitor"
    },
    {
      name: "Mac",
      job: "Bouncer"
    },
    {
      name: "Dee",
      job: "Aspring actress"
    },
    {
      name: "Dennis",
      job: "Bartender"
    }

    
  ]);

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  // src/MyApp.js (a new inner function inside MyApp())

  //const characters = fetchUsers();

// src/MyApp.js (a new block inside MyApp())

useEffect(() => {
  fetchUsers()
	  .then((res) => res.json())
	  .then((json) => setCharacters(json["users_list"]))
	  .catch((error) => { console.log(error); });
}, [] );

  async function removeOneCharacter(index) {
    await deleteUser(characters[index]);
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    console.log("Pressed button");
    setCharacters(updated);
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