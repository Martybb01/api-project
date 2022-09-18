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

// GET /planet/:id - Retrieve the selected planet
// Reg Exp = the id can be one or more digits (pattern matching)
app.get("/planets/:id(\\d+)", async (request, response, next) => {
    const planetId = Number(request.params.id);
    const planet = await prisma.planet.findUnique({
        where: { id: planetId },
    });

    if (!planet) {
        response.status(404);
        return next(`Cannot GET /planets/${planetId}`);
    }

    response.json(planet);
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

// PUT - update a planet
app.put(
    "/planets/:id(\\d+)",
    validate({ body: planetSchema }),
    async (request, response, next) => {
        const planetId = Number(request.params.id);
        const planetData: PlanetData = request.body;

        try {
            const planet = await prisma.planet.update({
                where: { id: planetId },
                data: planetData,
            });

            response.status(200).json(planet);
        } catch (error) {
            response.status(404);
            next(`Cannot PUT /planets/${planetId}`);
        }
    }
);

// DELETE - delete a planet
app.delete(
    "/planets/:id(\\d+)",

    async (request, response, next) => {
        const planetId = Number(request.params.id);

        try {
            await prisma.planet.delete({
                where: { id: planetId },
            });

            response.status(204).end();
        } catch (error) {
            response.status(404);
            next(`Cannot DELETE /planets/${planetId}`);
        }
    }
);

// always define errors middleware after the routes
app.use(validationErrorMiddleWare);

export default app;
