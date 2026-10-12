# ThoseCursedTreasures

## Curse item artwork

Add one PNG image per item in `images/curses/` using these filenames:

- `heavy-idol.png`
- `greedy-gem.png`
- `banjaxed-compass.png`
- `pewter-shoes.png`
- `fly-agaric.png`
- `manuka-honey.png`
- `broken-machete.png`
- `mummified-leech.png`
- `jeering-monkey.png`
- `map-fragment.png`
- `stone-toad.png`
- `golden-flea.png`
- `possessed-coin.png`

The app shows the matching illustration on the player's card and falls back to the item's emoji if the image is missing. Curse artwork is included in the service-worker precache list and is also cached when fetched, so images added later become available offline after the app loads them online.
