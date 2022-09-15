import express from "express";
import "express-async-errors"; //make sure the server is stable with no issues or crash when using async/await
import prisma from "./lib / prisma/client";
const app = express();

// GET /planets - Retrieve all planets
app.get("/planets", async (request, response) => {
    const planets = await prisma.planet.findMany();

    response.json(planets);
});

export default app;
