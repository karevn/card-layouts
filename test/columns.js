/* global describe, it */
const columns = require('../src/columns')
const expect = require('chai').expect

describe('columns', () => {
  it('should pack', () => {
    const options = {
      width: 100,
      columns: 3,
      items: [
        {width: 200, height: 100},
        {width: 50, height: 20},
        {width: 70, height: 30},
        {width: 80, height: 40}
      ]
    }
    expect(columns(options)).to.shallowDeepEqual([
      {x: 0, y: 0, width: 33.333333333333336, height: 16},
      {x: 33.333333333333336, y: 0, width: 33.333333333333336, height: 13},
      {x: 66.66666666666667, y: 0, width: 33.333333333333336, height: 14},
      {x: 33.333333333333336, y: 13, width: 33.333333333333336, height: 16}
    ])
  })
})
