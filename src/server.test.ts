import supertest from "supertest";
import { prismaMock } from "./lib / prisma/client.mock";

import app from "./app";

const request = supertest(app);

test("GET /planets", async () => {
    const planets = [
        {
            id: 1,
            name: "Mercury",
            description: null,
            diameter: 1234,
            moons: 12,
            createdAt: "2022-09-15T10:26:18.930Z",
            updatedAt: "2022-09-15T10:25:48.293Z",
        },
        {
            id: 2,
            name: "Venus",
            description: null,
            diameter: 5678,
            moons: 3,
            createdAt: "2022-09-15T10:26:34.877Z",
            updatedAt: "2022-09-15T10:26:20.625Z",
        },
    ];

    // @ts-ignore
    prismaMock.planet.findMany.mockResolvedValue(planets);

    const response = await request
        .get("/planets")
        .expect(200)
        .expect("Content-Type", /application\/json/);

    expect(response.body).toEqual(planets);
});

test("POST /planets", async () => {
    const planet = {
        name: "Mercury",
        diameter: 1234,
        moons: 12,
    };

    const response = await request
        .post("/planets")
        .send(planet)
        .expect(201) //number to pass if something new is created
        .expect("Content-Type", /application\/json/);

    expect(response.body).toEqual(planet);
});
