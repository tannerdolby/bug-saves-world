# Bug Saves The World
![really far from complete, but a demo photo](https://user-images.githubusercontent.com/48612525/141366735-a1122516-316e-4a17-b09c-b1bea896087f.png)
![level one](https://user-images.githubusercontent.com/48612525/144314682-dd1ffb57-9f48-4a6a-84d9-1ac269c7d0c2.png)

You are the last bug left on planet Earth, the only way to make it out alive is by collecting all the stars placed throughout each level while avoiding hostile monsters and traps. Sounds easy enough right? :)

The map will feature terrains meant to test your skills as a bug. There are patches of fire around the map that will turn the bug a tint of red and result in a game over.

## Run Locally

```
npm run dev
```

## Design
All of the background objects and styles for each level in this game were created using HTML and CSS. The sprites were created with Vectornator. Have a look at the `/assets/` directory, `game-design.html` and `design.scss` for more details.

## Characters
The character objects I created in Vectornator and packed into a sprite sheet to be loaded as a game object.

Playable:
- Ladybug

Enemy/hostile:
- Bug Monster
- Flame

## Notes
For designing the characters, and game objects I used HTML/CSS for static assets and Vectornator for the sprites.

[Design Notes on CodePen](https://codepen.io/tannerdolby/pen/vYJaZOQ)

## Inspiration
I built this game for the 2021 [GitHub Game Off](https://github.blog/2021-10-15-save-the-date-for-github-game-off-2021/) which specified a "Bug" theme. It was a really fun way to learn more about Phaser and to realize how much I enjoy game dev.

## Kudos
- [Phaser Docs](https://phaser.io)
- [Sprite Sheet Packer](https://www.codeandweb.com/free-sprite-sheet-packer)
- [Removing Image backgrounds](https://spark.adobe.com/tools/remove-background/#) from Adobe Spark.
- [Sprite Sheet Tool](https://codeshack.io/images-sprite-sheet-generator/) from CodeShack.