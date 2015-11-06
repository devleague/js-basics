var expect = chai.expect;
var should = chai.should();

// load basics.js into new VM

describe( 'Main', function() {
  var sandbox;

  beforeEach(function() {
    // create a sandbox
    sandbox = sinon.sandbox.create();

    // stub some console methods
    sandbox.stub( console, 'log' );
    sandbox.stub( console, 'error' );
  });

  afterEach(function() {
    // restore the environment as it was before
    sandbox.restore();
  });

  describe('person', function() {
    it('should have a variable called `myName`', function() {
      expect(myName).to.exist;
      (typeof myName).should.equal('string');
    });
    it('should have a person object with the same name', function() {
      expect(person).to.exist;
      (typeof person).should.equal('object');
      (person).should.have.property('name');
      (person.name).should.equal(myName);
    });
    it('should have an age property that is a number', function() {
      ( person ).should.have.property( 'age' );
      ( person.age ).should.be.a( 'number' );
    });
  });

  describe('canDrive', function() {
    it ('should be true if `person` is atleast 16 years old', function() {
      expect(canDrive).to.exist;
      (typeof canDrive).should.equal('boolean');
      canDrive.should.equal(person.age >= 16);
    });
  });

  describe( '#greet', function() {

    it('should be a function', function() {
      (typeof greet).should.equal('function');
    });

    it( 'should print a greeting', function() {
      var name = 'Dev League';
      greet( name );

      sinon.assert.notCalled( console.error );
      sinon.assert.calledOnce( console.log );
      sinon.assert.calledWithExactly( console.log, 'Hello, my name is ' + name );
    });
  });

  describe('dataTypes', function() {
    it('should be an array', function() {
      expect(dataTypes).to.exist;
      (dataTypes.constructor.name).should.equal('Array');
      var types = [];
      for (var i = 0; i < dataTypes.length; i++) {
        if (dataTypes[i] === null) {
          types.push(null);
        }
        else {
          types.push(typeof dataTypes[i]);
        }
      }

      types.should.include( 'string' );
      types.should.include( 'number' );
      types.should.include( 'undefined' );
      types.should.include( 'object' );
      types.should.include( 'boolean' );
      types.should.include( null );
    });
  });

  describe( 'dog object literal', function() {
    // var spot = new Dog('Spot');
    // it('should be a function', function() {
    //   (typeof Dog).should.equal('object');
    //   expect(Dog).to.exist;
    // });

    it('should be an object', function() {
      dog.should.be.an('object');
      expect(dog).to.exist;
    });
    it ('should have a name property', function() {
      (typeof dog.name).should.equal('string');
      dog.name.should.equal('Spot');
    });
    it('should be able to bark by calling the .bark() function', function() {
      (typeof dog.bark).should.equal('function');
      dog.bark();
      sinon.assert.calledOnce(console.log);
    });
  });
});
