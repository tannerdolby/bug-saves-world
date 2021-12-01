# Bug Saves The World
![really far from complete, but a demo photo](https://user-images.githubusercontent.com/48612525/141366735-a1122516-316e-4a17-b09c-b1bea896087f.png)
![level one](https://user-images.githubusercontent.com/48612525/144314682-dd1ffb57-9f48-4a6a-84d9-1ac269c7d0c2.png)

You are the last bug left on planet Earth, the only way to make it out alive is by collecting all the secret tokens hidden throughout each level while avoiding hostile monsters. Sounds easy enough right? :)

The map will feature terrains meant to test your skills as a bug. There are patches of fire around the map that will turn the bug a tint of red and result in a game over. Todo: enemy monsters (bug stompers) that will always attack you if your in their range.

## Design
All of the objects, characters, and styles in this game were created using HTML and CSS. Have a look at `game-design.html` and `design.scss` for how each of the things you see in game were created.

## Characters
Playable:
1. Ladybug - 6 limbs (very speedy, not the best at jumping)
2. todo: Bee - 6 limbs (three pairs of segmented legs + wings)

Enemy:
1. Bug Stompers - 2 limbs (very slow , but will deal severe damage )
2. Flame - a small block of flames. If you touch or fall into the flames, it will burn the bug leading to game over.

## Notes
For designing the characters, and game objects I used HTML/CSS for static assets and Vectornator for the sprites.

[CodePen Notes](https://codepen.io/tannerdolby/pen/vYJaZOQ)

## Inspiration
I built this game for the 2021 [GitHub Game Off](https://github.blog/2021-10-15-save-the-date-for-github-game-off-2021/) which specified a "Bug" theme. It was a really fun way to learn more about Phaser and to realize how much I enjoy game dev.

## Kudos
- [Phaser Docs](https://phaser.io)
- [Sprite Sheet Packer](https://www.codeandweb.com/free-sprite-sheet-packer)
- [Removing Image backgrounds](https://spark.adobe.com/tools/remove-background/#) from Adobe Spark.
- [Sprite Sheet Tool](https://codeshack.io/images-sprite-sheet-generator/) from CodeShack.