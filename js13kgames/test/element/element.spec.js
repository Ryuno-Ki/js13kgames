var utils = require('../../src/js/utils.js');
var ns = require('../../src/js/element.js');
console.log("Spec", ns, utils);
var element = ns.JS13KBP.element;

describe('ElectronicElement', function() {
    var el;

    it('should have a constructor', function() {
        expect(element.ElectronicElement).to.be.a("function");
    });

    beforeEach(function() {
        el = new element.ElectronicElement("switch");
    });

    it('should have a name', function() {
        expect(el.getName()).to.contain("switch");
    });

    it('should count the instances', function() {
        var numberOfElements, el2;
        numberOfElements = element.ElectronicElement.count;
        el2 = new element.ElectronicElement("hebel");
        expect(element.ElectronicElement.count).to.be.greaterThan(numberOfElements);
    });

    it('should save its type', function() {
        expect(el.getType()).to.equal('element');
    });
});
