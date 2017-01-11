/* global describe, it */
const grid = require('../src/grid')
const expect = require('chai').expect

describe('grid', () => {
  it('should pack in columns', () => {
    const options = {
      width: 80,
      size: {width: 40, height: 30},
      columns: 2,
      items: [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}],
      gap: 0
    }
    expect(grid(options)).to.shallowDeepEqual([
      {x: 0, y: 0, width: 40, height: 30},
      {x: 40, y: 0, width: 40, height: 30},
      {x: 0, y: 30, width: 40, height: 30},
      {x: 40, y: 30, width: 40, height: 30}])
  })

  it('should pack in columns with width available', () => {
    const options = {
      size: {width: 40, height: 30},
      width: 90,
      columns: 2,
      items: [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}]
    }
    expect(grid(options)).to.shallowDeepEqual([
      {x: 0, y: 0, width: 45, height: 33.75},
      {x: 45, y: 0, width: 45, height: 33.75},
      {x: 0, y: 33.75, width: 45, height: 33.75},
      {x: 45, y: 33.75, width: 45, height: 33.75}
    ])
  }),
  it('should handle gap correctly', () => {
    const options = {
      width: 5,
      columns: 3,
      size: {width: 2, height: 1},
      gap: 1,
      items: [{width: 1, height: 1}, {width: 1, height: 1},
        {width: 1, height: 1}]
    }
    expect(grid(options)).to.shallowDeepEqual([
      {x: 0, y: 0, width: 1, height: 0.5},
      {x: 2, y: 0, width: 1, height: 0.5},
      {x: 4, y: 0, width: 1, height: 0.5}
    ])
  })
})
