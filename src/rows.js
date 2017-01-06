function create(top) {
  return {
    items: [],
    width: 0,
    top: top
  }
}

function parse(options) {
  return Object.assign({
    items: [],
    gap: 0,
    height: 200,
    incomplete: true
  }, options)
}

function shrink(row, options) {
  let x = 0
  const gaps = (row.items.length - 1) * options.gap
  const cleanWidth = row.width - gaps
  const availableCleanWidth = options.width - gaps
  const factor = cleanWidth / availableCleanWidth
  const height = Math.floor(options.height / factor)
  row.items.forEach((item, index) => {
    item.height = height
    item.x = x
    if (index !== row.items.length - 1) {
      item.width = Math.floor(item.width / factor)
      x += item.width + options.gap
    } else {
      item.width = options.width - x
    }
  })
  return height
}

module.exports = function rows (options) {
  options = parse(options)
  let row = create(0)
  let items = options.items.map(item => {
    item = {
      width: Math.floor(item.width / item.height * options.height),
      height: options.height,
      x: row.width,
      y: row.top
    }
    row.width += item.width + options.gap
    row.items.push(item)
    if (row.width - options.gap > options.width) {
      row = create(row.top + shrink(row, options) + options.gap)
    }
    return item
  })
  if (row.width < options.width && !options.incomplete) {
    items = items.filter(item => {
      return item.y !== row.height
    })
  }
  return items
}
