import express from "express";
const app = express();
export default app;

import tracksRouter from "#db/api/tracks";
import playlistsRouter from "#db/api/playlists";

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Jukebox!");
});

app.use("/tracks", tracksRouter);
app.use("/playlists", playlistsRouter);

app.use((err, req, res, next) => {
  // Foreign key violation
  if (err.code === "23503") {
    return res.status(400).send(err.detail);
  }
  // Invalid typing
  if (err.code === "22P02") {
    return res.status(400).send(err.message);
  }
  // Unique constraint violation
  if (err.code === "23505") {
    return res.status(400).send(err.detail);
  }
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry, something went wrong :(");
});
