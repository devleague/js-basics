var window = window || undefined;
if (window) {
  GLOBAL = window;
} else {
  var vm = require('vm');
  var fs = require('fs');
  var sinon = require('sinon');
  var chai = require('chai');

  var basicsFile = fs.readFileSync(process.cwd() + '/basics.js', { encoding: 'UTF-8' });
  vm.runInThisContext(basicsFile); // file runs and it's contents has access to GLOBAL
}

var expect = chai.expect;
var should = chai.should();

// load basics.js into new VM

describe('Main', function() {
  var sandbox;

  beforeEach(function() {
    // create a sandbox
    sandbox = sinon.sandbox.create();

    // stub some console methods
    sandbox.stub(console, 'log');
    sandbox.stub(console, 'error');
  });

  afterEach(function() {
    // restore the environment as it was before
    sandbox.restore();
  });

  describe('person', function() {
    it('should have a variable called `myName`', function() {
      expect(GLOBAL.myName).to.exist;
      (typeof GLOBAL.myName).should.equal('string');
    });
    it('should have a person object with the same name', function() {
      expect(GLOBAL.person).to.exist;
      (typeof GLOBAL.person).should.equal('object');
      (GLOBAL.person).should.have.property('name');
      (GLOBAL.person.name).should.equal(myName);
    });
  });

  describe('canDrive', function() {
    it ('should be true if `person` is atleast 16 years old', function() {
      expect(GLOBAL.canDrive).to.exist;
      (typeof GLOBAL.canDrive).should.equal('boolean');
      GLOBAL.canDrive.should.equal(GLOBAL.person.age >= 16);
    });
  });

  describe('#greet', function() {

    it('should be a function', function() {
      (typeof GLOBAL.greet).should.equal('function');
    });

    it('should print a greeting', function() {
      var name = 'Dev League';
      greet(name);

      sinon.assert.notCalled(console.error);
      sinon.assert.calledOnce(console.log);
      sinon.assert.calledWithExactly(console.log, 'Hello, my name is ' + name);
    });
  });

  describe('dataTypes', function() {
    it('should be an array', function() {
      expect(GLOBAL.dataTypes).to.exist;
      (GLOBAL.dataTypes.constructor.name).should.equal('Array');
      var types = [];
      for (var i = 0; i < GLOBAL.dataTypes.length; i++) {
        if (GLOBAL.dataTypes[i] === null) {
          types.push(null);
        }
        else {
          types.push(typeof GLOBAL.dataTypes[i]);
        }
      }
      types.should.include('string');
      types.should.include('number');
      types.should.include('undefined');
      types.should.include('object');
      types.should.include('boolean');
      types.should.include(null);
    });
  });

  describe('dog object literal', function() {
    // var spot = new Dog('Spot');
    // it('should be a function', function() {
    //   (typeof GLOBAL.Dog).should.equal('object');
    //   expect(GLOBAL.Dog).to.exist;
    // });
    it('should be an object', function() {
      GLOBAL.dog.should.be.an('object');
      expect(GLOBAL.dog).to.exist;
    });
    it ('should have a name property', function() {
      (typeof GLOBAL.dog.name).should.equal('string');
      GLOBAL.dog.name.should.equal('Spot');
    });
    it('should be able to bark by calling the .bark() function', function() {
      (typeof dog.bark).should.equal('function');
      GLOBAL.dog.bark();
      sinon.assert.calledOnce(console.log);
    });
  });
});
