# JS Layouts

*card-layouts* is a library for generating JavaScript-based card layouts.

# Installation

```
npm install card-layouts
```

# Usage

*card-layouts* library supports 3 layout modes
* *rows* - cards are placed one by one in rows and adjusted to have the same
  height
* *columns* - cards are placed one by one in columns and adjusted to have the
  same width
* *grid* - all the cards have the same width and height, generic grid layout

```js
import rows from 'card-layouts'

const objects =
const result = rows({
  items: [
    {width: 10, height: 10},
    {width: 20, height: 10},
    {width: 10, height: 20},
  ],
  width: 100,
})
```

will return

```js
[
  {width: 10, height, 10, x: 0, y: 0},
  {width: 20, height, 10, x: 10, y: 0},
  {width: 5, height, 10, x: 30, y: 0},
]
```

## Options

#### items

default: `[]`
type: `Array`

Items to be laid out. Each item is expected to have `x`, `y`, `width`, `height`
properties.

#### gap

default: `0`
type: `Integer`

The gap between the cards

#### width

default: `undefined`
type: `Integer`

The width of the area to fill with cards.

## Grid layout-specific options

#### columns

default: `undefined`
type: `Integer`

The number of the columns. If there's no number - `width` and `size` parameters
are used to determine the number of the columns.

#### size

default: `undefined`
type: `Object`

The object that determines card size: `{width: 100, height: 100}`.


## Rows layout-specific options

#### height

default: `undefined`
type: `Integer`

Row height for each of the rows generated.


## Columns layout-specific options

#### columns

default: `undefined`
type: `Integer`

The number of the columns. If there's no number - `width` and `size` parameters
are used to determine the number of the columns.


## License

MIT
