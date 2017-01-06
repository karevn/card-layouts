const parse = require('./parse')
const range = require('./range')

function build(options) {
  const heights = range(0, options.columns - 1).map(() => { return 0 })
  const columns = range(0, options.columns - 1).map(() => { return [] })
  const width = ((options.width + options.gap) / options.columns) - options.gap
  const items = options.items.map((item, index) => {
    const column = index % options.columns
    const aspect = item.width / item.height
    const height = isNaN(aspect) ? 0 : Math.floor(width / aspect)
    const positioned = {
      x: column * (width + options.gap),
      y: heights[column],
      width: width,
      height: height
    }
    heights[column] += height + options.gap
    columns[column].push(positioned)
    return positioned
  })
  return {
    heights: heights,
    columns: columns,
    items: items
  }
}

function extreme(built, func) {
  const val = func.apply(null, built.heights)
  return built.columns[built.heights.indexOf(val)]
}

function equalize(built, options) {
  while (true) {
    const lowest = extreme(built, Math.min)
    const highest = extreme(built, Math.max)
    const lastInHighest = highest.pop()
    const lastInLowest = lowest[lowest.length - 1]
    if (lowest === highest || !lastInHighest || !lastInLowest ||
      built.heights[built.columns.indexOf(lowest)] + lastInHighest.height > built.heights[built.columns.indexOf(highest)]) {
      return built.items
    }
    lowest.push(lastInHighest)
    lastInHighest.x = lastInLowest.x
    lastInHighest.y = lastInLowest.y + lastInLowest.height + options.gap
    built.heights[built.columns.indexOf(highest)] -= lastInHighest.height
    built.heights[built.columns.indexOf(lowest)] += lastInHighest.height
  }
}

module.exports = function columns (options) {
  options = parse(options)
  return equalize(build(options), options)
}
