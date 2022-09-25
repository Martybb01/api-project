import passport from "passport";
import passportGitHub2 from "passport-github2";

// strategy = term that passport use to indicate different way of authentication
const githubStrategy = new passportGitHub2.Strategy(
    {
        clientID: "",
        clientSecret: "",
        callbackURL: "",
    },
    function (
        accessToken: string,
        refreshToken: string,
        profile: { [key: string]: string },
        done: (error: null, user: Express.User) => void
    ) {
        const user: Express.User = {
            username: profile.username,
        };

        done(null, user);
    }
);

passport.use(githubStrategy);

// when somebody is logged in, takes the user data and stored them in a session
passport.serializeUser<Express.User>((user, done) => done(null, user));

passport.deserializeUser<Express.User>((user, done) => done(null, user));

export { passport };
