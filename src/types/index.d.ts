declare global {
    namespace Express {
        interface User {
            username: string;
        }
    }
}

export {};

//* in this file we defined a type for Express.User and we said that that objects are going to contain a username --> to use that inside of our roots later on
