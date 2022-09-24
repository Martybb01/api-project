import express from "express";
import "express-async-errors"; //make sure the server is stable with no issues or crash when using async/await
import cors from "cors";
import { validationErrorMiddleWare } from "./lib /validation";

import planetsRoutes from "./routes/planets";

const app = express();

// built-in middleware that take the incoming json and parse it in an object
app.use(express.json());

const corsOptions = {
    origin: "http://localhost:8080",
};
app.use(cors(corsOptions));

// everything under planetsRoutes will be prefixed with route /planets
app.use("/planets", planetsRoutes);

// always define errors middleware after the routes
app.use(validationErrorMiddleWare);

export default app;
