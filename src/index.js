import "dotenv/config";
import cors from "cors";
import express from "express";

import models, { connectDb } from "./models";
import routes from "./routes";

const app = express();

// * Application-Level Middleware * //
// Third-Party Middleware

app.use(cors());

// Built-In Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// * Routes * //

app.use("/api", routes.user);
app.use("/api/endpoint", routes.endpoint);

// * Start * //

const eraseDatabaseOnSync = false;

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      models.User.deleteMany({}),
      models.EndPoint.deleteMany({}),
    ]);
  }

  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
  );
});
