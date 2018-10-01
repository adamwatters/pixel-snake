# Snake

### Links

[Demo](https://rawgit.com/adamwatters/snake2/master/index.html)

[Github](https://github.com/adamwatters/snake2)

### Run / Build

`npm install`

Main.js is already built. To serve the game just run...

`npm run serve`

To rebuild main.js from the javascript modules in src/ run...

`npm run build`

### Next Steps

This is the second time I've build Snake in Javascript, and my first implementation used the html canvas. My main goal setting out this time around was to decouple the game from any particular renderer. I think this was pretty successful, and I'm actually working on extracting the Renderer and Screen into their own project. Rendering SNAKE to part of the the screen outside the game was an experiment in this direction.

I'd also like to add the option of colorizing the pixels.

Next Steps for Screen...

- The Markup and CSS for screen is currently a little messy. I'd like to try using flexbox display to position the pixels rather than floating them.
- Replace Pixel.toggle with Pixel.setColor to allow for multiple colors

Next Steps for Renderer...

- Change render function so that it accepts an array of color strings and passes new colors to Pixel.setColor at indexes where previous and current arrays differ.

Next Steps for Game...

- move toDisplay() from Grid up into Game.
- have toDisplay output an array of colors based on the contents of each position in the Grid, rather than simply 1 for 'not empty' and 0 for 'empty'
