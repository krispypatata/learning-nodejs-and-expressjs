import express from 'express';

const app = express();

const PORT = process.env.PORT || 3000;



app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`);
});

// localhost:3000
// localhost:3000/users
// localhost:3000/products
