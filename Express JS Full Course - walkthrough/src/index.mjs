import express from 'express';

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (request, response)=> {
    response.status(201).send({ msg: "Hello World!" });
});

// 2nd route
app.get('/api/users', (request, response) => {
    response.send([
        { id:1, username: "keith", displayName: "Keith" },
        { id:2, username: "ginoel", displayName: "Ginoel" },
        { id:3, username: "gabinete", displayName: "Gabinete" }, 
    ])
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
