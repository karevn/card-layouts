/* global describe, it */
const grid = require('../src/grid')
const expect = require('chai').expect

describe('grid', () => {
  it('should pack in columns', () => {
    const options = {
      size: {
        width: 40,
        height: 30
      },
      columns: 2,
      items: [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}],
      gap: 0
    }
    expect(grid(options)).to.shallowDeepEqual([{
      x: 0,
      y: 0,
      width: 40,
      height: 30
    }, {
      x: 40,
      y: 0,
      width: 40,
      height: 30
    }, {
      x: 0,
      y: 30,
      width: 40,
      height: 30
    }, {
      x: 40,
      y: 30,
      width: 40,
      height: 30
    }])
  })

  it('should pack in columns with width available', () => {
    const options = {
      size: {
        width: 40,
        height: 30
      },
      width: 90,
      columns: 2,
      items: [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}]
    }
    expect(grid(options)).to.shallowDeepEqual([{
      x: 0,
      y: 0,
      width: 40,
      height: 30
    }, {
      x: 40,
      y: 0,
      width: 40,
      height: 30
    }, {
      x: 0,
      y: 30,
      width: 40,
      height: 30
    }, {
      x: 40,
      y: 30,
      width: 40,
      height: 30
    }])
  })
})
