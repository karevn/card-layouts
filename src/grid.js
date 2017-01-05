import parse from './parse'
export default function grid (options) {
  options = parse(options)
  const width = ((options.width + options.gap) / options.columns) - options.gap
  const height = options.size.height * (width / options.size.width)
  return options.items.map((item, index) => {
    const column = index % options.columns
    const row = Math.floor(index / options.columns)
    return {
      x: column * (width + options.gap),
      y: row * (height + options.gap),
      width: width,
      height: height
    }
  })
}
