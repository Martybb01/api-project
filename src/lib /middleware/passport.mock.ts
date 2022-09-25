import { RequestHandler } from "express";

// mock our passport.ts module
jest.mock("./passport", () => {
    const originalModule = jest.requireActual("./passport");

    const checkAuthorization: RequestHandler = (request, response, next) => {
        next();
    };

    return {
        __esModule: true,
        ...originalModule,
        checkAuthorization,
    };
});
