import express from "express";
import "express-async-errors"; //make sure the server is stable with no issues or crash when using async/await

const app = express();

// route handler
app.get("/planets", (request, response) => {
    const planets = [{ name: "Mercury" }, { name: "Mars" }];
    console.table(planets);
    response.json(planets);
});

export default app;
