import express from "express";
const router = express.Router();
export default router;

import { getPlaylist } from "#db/queries/playlists";

router.route("/").get(async (req, res) => {
  const playlists = await getPlaylist();
  res.send(playlists);
});
