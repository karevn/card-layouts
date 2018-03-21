function parse(options) {
  var defaults = {
    gap: 0,
    items: []
  };
  options = Object.assign(defaults, options);
  var cleanWidth = options.width - options.columns * options.gap;
  if (!options.size) {
    options.size = {
      width: cleanWidth / options.columns,
      height: cleanWidth / options.columns / 1.5
    };
  } else if (options.fluid) {
    if (!options.columns) {
      options.columns = Math.ceil(cleanWidth / options.size.width);
    }
    var factor = options.columns / (cleanWidth / options.size.width);
    options.size.width = Math.floor(options.size.width / factor);
    if (options.size.height) {
      options.size.height = Math.floor(options.size.height / factor);
    }
  } else if (!options.width) {
    options.width = options.columns * options.size.width + (options.columns - 1) * options.gap;
  }
  return options;
}

function grid(options) {
  options = parse(options);
  var width = (options.width + options.gap) / options.columns - options.gap;
  var height = options.size.height * (width / options.size.width);
  return options.items.map(function (item, index) {
    var column = index % options.columns;
    var row = Math.floor(index / options.columns);
    return {
      x: column * (width + options.gap),
      y: row * (height + options.gap),
      width: width,
      height: height
    };
  });
}

/**
 * Array.prototype.filter() - Polyfill
 *
 * @ref https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 */

(function() {
    if (!Array.prototype.filter) {
        Array.prototype.filter = function(fun/*, thisArg*/) {

            if (this === void 0 || this === null) {
                throw new TypeError();
            }

            var t = Object(this);
            var len = t.length >>> 0;
            if (typeof fun !== 'function') {
                throw new TypeError();
            }

            var res = [];
            var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
            for (var i = 0; i < len; i++) {
                if (i in t) {
                    var val = t[i];

                    // NOTE: Technically this should Object.defineProperty at
                    //       the next index, as push can be affected by
                    //       properties on Object.prototype and Array.prototype.
                    //       But that method's new, and collisions should be
                    //       rare, so use the more-compatible alternative.
                    if (fun.call(thisArg, val, i, t)) {
                        res.push(val);
                    }
                }
            }

            return res;
        };
    }
})();

function create(top) {
  return {
    items: [],
    width: 0,
    top: top
  };
}

function parse$1(options) {
  return Object.assign({
    items: [],
    gap: 0,
    height: 200,
    incomplete: true
  }, options);
}

function shrink(row, options) {
  var x = 0;
  var gaps = (row.items.length - 1) * options.gap;
  var cleanWidth = row.width - gaps;
  var availableCleanWidth = options.width - gaps;
  var factor = cleanWidth / availableCleanWidth;
  var height = Math.floor(options.height / factor);
  row.items.forEach(function (item, index) {
    item.height = height;
    item.x = x;
    if (index !== row.items.length - 1) {
      item.width = Math.floor(item.width / factor);
      x += item.width + options.gap;
    } else {
      item.width = options.width - x;
    }
  });
  return height;
}

function rows(options) {
  options = parse$1(options);
  var row = create(0);
  var items = options.items.map(function (item) {
    item = {
      width: Math.floor(item.width / item.height * options.height),
      height: options.height,
      x: row.width,
      y: row.top
    };
    row.width += item.width + options.gap;
    row.items.push(item);
    if (row.width - options.gap > options.width) {
      row = create(row.top + shrink(row, options) + options.gap);
    }
    return item;
  });
  if (row.width < options.width && !options.incomplete) {
    items = filter(items, function (item) {
      return item.y !== row.height;
    });
  }
  return items;
}

function range(a, b) {
  var result = [];
  for (var i = a; i <= b; i++) {
    result.push(i);
  }
  return result;
}

function build(options) {
  var heights = range(0, options.columns - 1).map(function () {
    return 0;
  });
  var columns = range(0, options.columns - 1).map(function () {
    return [];
  });
  var width = (options.width + options.gap) / options.columns - options.gap;
  var items = options.items.map(function (item, index) {
    var column = index % options.columns;
    var aspect = item.width / item.height;
    var height = isNaN(aspect) ? 0 : Math.floor(width / aspect);
    var positioned = {
      x: column * (width + options.gap),
      y: heights[column],
      width: width,
      height: height
    };
    heights[column] += height + options.gap;
    columns[column].push(positioned);
    return positioned;
  });
  return {
    heights: heights,
    columns: columns,
    items: items
  };
}

function extreme(built, func) {
  var val = func.apply(null, built.heights);
  return built.columns[built.heights.indexOf(val)];
}

function equalize(built, options) {
  while (true) {
    var lowest = extreme(built, Math.min);
    var highest = extreme(built, Math.max);
    var lastInHighest = highest.pop();
    var lastInLowest = lowest[lowest.length - 1];
    var lowestHeight = built.heights[built.columns.indexOf(lowest)];
    var highestHeight = built.heights[built.columns.indexOf(highest)];
    if (lowest === highest || !lastInHighest || !lastInLowest || lowestHeight + lastInHighest.height >= highestHeight) {
      return built.items;
    }
    lowest.push(lastInHighest);
    lastInHighest.x = lastInLowest.x;
    lastInHighest.y = lastInLowest.y + lastInLowest.height + options.gap;
    built.heights[built.columns.indexOf(highest)] -= lastInHighest.height;
    built.heights[built.columns.indexOf(lowest)] += lastInHighest.height;
  }
}

function columns(options) {
  options = parse(options);
  return equalize(build(options), options);
}

export { grid, rows, columns };
