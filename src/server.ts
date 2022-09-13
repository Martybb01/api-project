import app from "./app";
import "dotenv/config";

// listen
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
