import express, { request, response } from 'express';

// express app instance
const app = express();

app.use(express.json());

// global
// app.use(loggingMiddleware);  // comment to use it on only one route

const PORT = process.env.PORT || 3000;

// app.get(
//   "/", 
//   (request, response, next)=> {
//     console.log("Base URL 1");
//     next();
//   }, 
//   (request, response, next)=> {
//     console.log("Base URL 2");
//     next();
//   }, 
//   (request, response, next)=> {
//     console.log("Base URL 3");
//     next();
//   }, 
//   (request, response)=> {
//     response.status(201).send({ msg: "Hello World!" });
// });

const resolveIndexByUserId = (request, response, next) => {
  const { body, params: { id } } = request;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) {
    return response.sendStatus(400);
  }

  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);

  if (findUserIndex === -1) {
    return response.sendStatus(404);
  }

  next();
}

const loggingMiddleware = (request, response, next) => {
  console.log(`${request.method} - ${request.url}`);
  next();
}


// with loggingMiddleware function
// base url
app.get("/", loggingMiddleware, (request, response)=> {
  response.status(201).send({ msg: "Hello World!" });
});





const mockUsers = [
  { id:1, username: "keith", displayName: "Keith" },
  { id:2, username: "ginoel", displayName: "Ginoel" },
  { id:3, username: "gabinete", displayName: "Gabinete" }, 
  { id:4, username: "krispy", displayName: "Krispy" },
  { id:5, username: "patata", displayName: "Patata" },
  { id:6, username: "shio", displayName: "Shio" }, 
  { id:7, username: "pingu", displayName: "Pingu" }, 
];


// 2nd route
app.get('/api/users', (request, response) => {
  // query parameters
  console.log(request.query);
  // destructure
  const { 
    query: { filter, value } 
  } = request;

  if (filter && value) {
    return response.send(mockUsers.filter((user) => user[filter].includes(value)));
  }

  // when filter and value are undefined
  return response.send(mockUsers);
});

app.post("/api/users", (request, response) => { 
  console.log(request.body);

  const { body } = request;
  const newUser = { id:mockUsers[mockUsers.length - 1].id + 1, ...body};
  mockUsers.push(newUser);

  return response.status(201).send(newUser);
});

// route parameter
app.get('/api/users/:id', (request, response) => {
  console.log(request.params);
  const parsedId = parseInt(request.params.id);
  console.log(parsedId);
  if (isNaN(parsedId)) {
    return response.status(400).send({ msg: "Bad Request. Invalid ID." });
  }

  const findUser = mockUsers.find((user) => user.id === parsedId);
  if (!findUser) {
    return response.sendStatus(404);
  }

  return response.send(findUser);
});

// 3rd route
app.get('/api/products', (request, response) => {
  response.send([
    { id: 123, name: 'chicken breast', price: 12.99 },
  ]);
});

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});

// localhost:3000
// localhost:3000/users
// localhost:3000/products
// localhost:3000/products?key=value&key2=value2

// Query parameters

// PUT (updating the entire resource)
app.put("/api/users/:id", (request, response) => {
  const { body, params: { id } } = request;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) {
    return response.sendStatus(400);
  }

  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);

  if (findUserIndex === -1) {
    return response.sendStatus(404);
  }

  mockUsers[findUserIndex] = {
    id: parsedId,
    ...body,
  }

  return response.sendStatus(200);

});

// PATCH (modify only a partial info)
app.patch("/api/users/:id", (request, response) => {
  const { body, params: { id } } = request;

  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    return response.sendStatus(400);
  }

  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);

  if (findUserIndex === -1) {
    return response.sendStatus(404);
  }

  mockUsers[findUserIndex] = {
    ...mockUsers[findUserIndex],
    ...body,
  }

  return response.sendStatus(200);
});


// DELETE
app.delete("/api/users/:id", (request, response) => {
  const { params: { id } } = request;

  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    return response.sendStatus(400);
  }

  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  // can't find the user
  if (findUserIndex === -1) {
    return response.sendStatus(404);
  }

  mockUsers.splice(findUserIndex, 1);

  return response.sendStatus(200);

});
