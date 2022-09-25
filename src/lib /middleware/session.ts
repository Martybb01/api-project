import session from "express-session";
import config from "../../config";

export function initSessionMiddleware() {
    return session({
        secret: config.SESSION_SECRET, //used to encrypt session cookies values
        resave: false,
        saveUninitialized: false,
    });
}
