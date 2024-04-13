// src/MyApp.jsx
import React from "react";
import Table from "./Table";
// src/MyApp.jsx (Adding the form component after the table)
import Form from "./Form";

    const [characters, setCharacters] = useState([]);

  function MyApp() {
    const [characters, setCharacters] = useState([
      {
        name: "Charlie",
        job: "Janitor" // the rest of the data
      }
    ]);
  
    function removeOneCharacter(index) {
      const updated = characters.filter((character, i) => {
        return i !== index;
      });
      setCharacters(updated);
    }

    // src/MyApp.jsx (a new function inside the MyApp function)
function updateList(person) {
    setCharacters([...characters, person]);
  }

    // ... in component MyApp:
return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form />
    </div>
  );
  }

export default MyApp;