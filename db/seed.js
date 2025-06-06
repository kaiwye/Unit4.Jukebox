import db from "#db/client";

import { faker } from "@faker-js/faker";
import { createPlaylist } from "#db/queries/playlists";
import { createTrack } from "#db/queries/tracks";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 1; i <= 10; i++) {
    const playlist = {
      name: faker.music.album(),
      description: faker.lorem.sentence({ min: 5, max: 10 }),
    };
    await createPlaylist(playlist);
  }

  for (let i = 1; i <= 20; i++) {
    const track = {
      name: faker.music.songName(),
      duration: faker.number.int({ min: 150000, max: 240000 }),
    };
    await createTrack(track);
  }

  for (let i = 1; i <= 15; i++) {
    const playlistId = faker.number.int({ min: 1, max: 10 });
    const trackId = faker.number.int({ min: 1, max: 20 });
    await createPlaylistTrack({ playlistId, trackId });
  }
}
