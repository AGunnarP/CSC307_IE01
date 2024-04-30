// backend.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./user.js"

const app = express();
const port = 8000;

app.use(cors());

app.use(express.json());

console.log("Got here")

mongoose.connect("mongodb://localhost:27017/users",{})
.then(() =>
{

  console.log("MongoDB connected");
  app.listen(port, () =>{
    console.log(`Server running at http://localhost:${port}`);
  });
}).catch(err => {
  console.error(`MongoDB connection error:`, err);
});

console.log("Should be connected");


app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };

  const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
  };
  
  
  /*app.get("/users", (req, res) => {
    
    const query = {};
    if(req.query.name) query.name = req.query.name;
    if(req.query.jobs) query.job = req.query.job;

    User.find(query)
    .then(users => res.json({ users_list : users}))
    .catch(err => res.status(500).json({error : err.message}));
    
    /*const name = req.query.name;
    if (name != undefined) {
      let result = findUserByName(name);
      result = { users_list: result };
      res.send(result);
    } else {
      res.send(users);
    }
  });*/

  function getUsers(name, job) {
    let promise;
    if (name === undefined && job === undefined) {
      promise = User.find();
    } else if (name && !job) {
      promise = findUserByName(name);
    } else if (job && !name) {
      promise = findUserByJob(job);
    }
    return promise;
  }

  app.get("/users", (req, res) => {
    const name = req.query["name"];
    const job = req.query["job"];
    getUsers(name, job)
      .then((result) => {
        res.send({ users_list: result });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send("An error ocurred in the server.");
      });
  });

  app.get("/users/:id", (req, res) => {
    User.findById(req.params.id)
    .then(user => {
      if(!user) return res.status(404).send("User not found");
      res.json(user);
    })
    .catch(err => res.status(500).json({ error: err.message}));
  });

  const addUser = (user) => {
    users["users_list"].push(user);
    return user;
  };
  
  app.post("/users", (req, res) => {

    const userToAdd = new User(req.body);
    userToAdd.save()
    .then(user => res.status(201).json(user))
    .catch(err => res.status(400).json({ error : err.message}));

    /*const userToAdd = req.body;
    userToAdd.id = Math.random() * Math.random() * 123;
    addUser(userToAdd);
    res.status(201).send(userToAdd);*/
  });

  app.delete("/users/:id", (req, res) => {
    /*const id = req.params.id;
    const index = users.users_list.findIndex(user => user.id === id);
    if (index !== -1) {
      users.users_list.splice(index, 1);
      res.send(`User with ID ${id} deleted successfully.`);
    } else {
      res.status(404).send(`User with ID ${id} not found.`);
    }*/

    User.findByIdAndDelete(req.params.id)
    .then(result => {
      if(!result)
        res.status(404).send("User not found for deletion");
      else
        res.status(204).send("User deleted");
      
    })
    .catch(err => res.status(500).json({ error: err.message}));

  });

/*import express from "express";
import cors from "cors";

import userService from "./services/user-service.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query["name"];
  const job = req.query["job"];
  userService
    .getUsers(name, job)
    .then((result) => {
      res.send({ users_list: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("An error ocurred in the server.");
    });
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  userService.findUserById(id).then((result) => {
    if (result === undefined || result === null)
      res.status(404).send("Resource not found.");
    else res.send({ users_list: result });
  });
});

app.post("/users", (req, res) => {
  const user = req.body;
  userService.addUser(user).then((savedUser) => {
    if (savedUser) res.status(201).send(savedUser);
    else res.status(500).end();
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});*/