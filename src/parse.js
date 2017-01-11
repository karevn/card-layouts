module.exports = function parse(options) {
  const defaults = {
    gap: 0,
    items: []
  }
  options = Object.assign(defaults, options)
  const cleanWidth = options.width - options.columns * options.gap
  if (!options.size) {
    options.size = {
      width: cleanWidth / options.columns,
      height: cleanWidth / options.columns / 1.5
    }
  } else if (options.fluid) {
    if (!options.columns) {
      options.columns = Math.ceil(cleanWidth / options.size.width)
    }
    const factor = options.columns / (cleanWidth / options.size.width)
    options.size.width = Math.floor(options.size.width / factor)
    if (options.size.height) {
      options.size.height = Math.floor(options.size.height / factor)
    }
  } else if (!options.width) {
    options.width = options.columns * options.size.width +
      (options.columns - 1) * options.gap
  }
  return options
}
