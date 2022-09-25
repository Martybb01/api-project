import { Router } from "express";
import { passport } from "../lib /middleware/passport";

const router = Router();

// first route
router.get("/login", (request, response, next) => {
    if (
        typeof request.query.redirectTo !== "string" ||
        !request.query.redirectTo
    ) {
        response.status(400);
        return next("Missing redirectTo query string parameter");
    }
    request.session.redirectTo = request.query.redirectTo;

    response.redirect("/auth/github/login");
});

// route to login page
router.get(
    "/auth/github/login",
    passport.authenticate("github", {
        scope: ["user:email"],
    })
);

//route to redirect after the user logged in
router.get(
    "/github/callback",
    passport.authenticate("github", {
        failureRedirect: "/auth/github/login",
        keepSessionInfo: true,
    }),
    (request, response) => {
        if (typeof request.session.redirectTo !== "string") {
            return response.status(500).end();
        }

        response.redirect(request.session.redirectTo);
    }
);

// logout route
router.get("/logout", (request, response, next) => {
    if (
        typeof request.query.redirectTo !== "string" ||
        !request.query.redirectTo
    ) {
        response.status(400);
        return next("Missing redirectTo query string parameter");
    }
    const redirectUrl = request.query.redirectTo;

    request.logout((error) => {
        if (error) {
            return next(error);
        }
        response.redirect(redirectUrl);
    });
});

export default router;
