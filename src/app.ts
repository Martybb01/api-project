import express from "express";
import "express-async-errors"; //make sure the server is stable with no issues or crash when using async/await
import { validationErrorMiddleWare } from "./lib /middleware/validation";

import planetsRoutes from "./routes/planets";
import { initCorsMiddleware } from "./lib /middleware/cors";

const app = express();

// built-in middleware that take the incoming json and parse it in an object
app.use(express.json());

app.use(initCorsMiddleware());

// everything under planetsRoutes will be prefixed with route /planets
app.use("/planets", planetsRoutes);

// always define errors middleware after the routes
app.use(validationErrorMiddleWare);

export default app;
