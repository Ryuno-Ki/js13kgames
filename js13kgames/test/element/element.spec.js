var utils = require('../../src/utils.js');
var ns = require('../../src/element.js');
console.log("Spec", ns, utils);
var element = ns.JS13KBP.element;

describe('Element', function() {
    var el;

    it('should have a constructor', function() {
        expect(element.Element).to.be.a("function");
    });

    beforeEach(function() {
        el = new element.Element("switch");
    });

    it('should have a name', function() {
        expect(el.getName()).to.contain("switch");
    });

    it('should count the instances', function() {
        var numberOfElements, el2;
        numberOfElements = element.Element.count;
        el2 = new element.Element("hebel");
        expect(element.Element.count).to.be.greaterThan(numberOfElements);
    });

    it('should save its type', function() {
        expect(el.getType()).to.equal('element');
    });
});
