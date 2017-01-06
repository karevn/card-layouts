/* global before */
const chai = require('chai')

before(() => {
  chai.use(require('chai-shallow-deep-equal'))
})
