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
  console.error(err);
  res.status(500).send("Sorry, something went wrong :(");
});
