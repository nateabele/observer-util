require('reify')

const expect = require('chai').expect
const observer = require('../src')

describe('observable', () => {
  it('should throw TypeError on invalid arguments', () => {
    expect(() => observer.observable(12)).to.throw(TypeError)
    expect(() => observer.observable('string')).to.throw(TypeError)
    expect(() => observer.observable({})).to.not.throw(TypeError)
    expect(() => observer.observable()).to.not.throw(TypeError)
  })

  it('should return a new observable when no argument is provided', () => {
    const observable = observer.observable()
    expect(observer.isObservable(observable)).to.be.true
  })

  it('should return an observable wrapping of an object argument', () => {
    const obj = {prop: 'value'}
    const observable = observer.observable(obj)
    expect(observable).to.not.equal(obj)
    expect(observer.isObservable(observable)).to.be.true
  })

  it('should return the argument if it is already an observable', () => {
    const observable1 = observer.observable()
    const observable2 = observer.observable(observable1)
    expect(observable1).to.equal(observable2)
  })

  it('should return the same observable wrapper when called repeatedly with the same argument', () => {
    const obj = {prop: 'value'}
    const observable1 = observer.observable(obj)
    const observable2 = observer.observable(obj)
    expect(observable1).to.equal(observable2)
  })

  it('should never let observables leak into the underlying raw object', () => {
    const obj = {}
    const observable = observer.observable(obj)
    obj.nested1 = {}
    observable.nested2 = observer.observable({})
    expect(observer.isObservable(obj.nested1)).to.be.false
    expect(observer.isObservable(obj.nested2)).to.be.false
    expect(observer.isObservable(observable.nested2)).to.be.true
  })
})
