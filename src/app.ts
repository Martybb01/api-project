import express from "express";
import "express-async-errors"; //make sure the server is stable with no issues or crash when using async/await
import prisma from "./lib / prisma/client";

import {
    validate,
    validationErrorMiddleWare,
    planetSchema,
    PlanetData,
} from "./lib /validation";

const app = express();

// built-in middleware that take the incoming json and parse it in an object
app.use(express.json());

// GET /planets - Retrieve all planets
app.get("/planets", async (request, response) => {
    const planets = await prisma.planet.findMany();

    response.json(planets);
});

// POST - create a new planet
app.post(
    "/planets",
    validate({ body: planetSchema }),
    async (request, response) => {
        const planetData: PlanetData = request.body;

        const planet = await prisma.planet.create({
            data: planetData,
        });

        response.status(201).json(planet);
    }
);

// always define errors middleware after the routes
app.use(validationErrorMiddleWare);

export default app;
