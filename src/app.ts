import express from "express";
import "express-async-errors"; //make sure the server is stable with no issues or crash when using async/await

const app = express();

// route handler
app.get("/", (request, response) => {
    response.send("This is the Space Facts API!");
});

export default app;
