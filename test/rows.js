/* global describe, it */
const flow = require('../src/rows')
const expect = require('chai').expect

describe('rows', () => {
  const options = {
    width: 100,
    height: 20,
    items: [{
      width: 30,
      height: 20
    }, {
      width: 170,
      height: 20
    }, {
      width: 30,
      height: 20
    }]
  }
  it('should finish the row', () => {
    expect(flow(options)).to.shallowDeepEqual([{
      width: 15,
      height: 10,
      x: 0,
      y: 0
    }, {
      width: 85,
      height: 10,
      x: 15,
      y: 0
    }, {
      width: 30,
      height: 20,
      x: 0,
      y: 10
    }])
  })
  it('should not show incomplete row items', () => {
    expect(flow(Object.assign({}, options, {
      incomplete: false
    }))).to.shallowDeepEqual([{
      width: 15,
      height: 10,
      x: 0,
      y: 0
    }, {
      width: 85,
      height: 10,
      x: 15,
      y: 0
    }])
  })
})
