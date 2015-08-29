var ns = require('../../src/js/element.js');
var element = ns.JS13KBP.element;

describe('ElectronicElement', function() {
    var el, name;

    name = "electronic";

    it('should have a constructor', function() {
        expect(element.ElectronicElement).to.be.a("function");
    });

    beforeEach(function() {
        el = new element.ElectronicElement(name);
    });

    it('should have a name', function() {
        expect(el.getName()).to.contain(name);
    });

    it('should be able to deal with spaces as name, too', function() {
        var words, word, i, len;
        name = "my super fancy element";
        el = new element.ElectronicElement(name);
        words = name.split();
        for (i = 0, len = words.length; i < len; i += 1) {
            word = words[i];
            expect(el.getName()).to.contain(word);
        }
    });

    it('should count the instances', function() {
        var numberOfElements, el2;
        numberOfElements = element.ElectronicElement.count;
        el2 = new element.ElectronicElement("hebel");
        expect(element.ElectronicElement.count).to.equal(numberOfElements + 1);
    });

    it('should save its type', function() {
        expect(el.getType()).to.equal('element');
    });

    it('should tell about whether it has an input slot', function() {
        expect(el.hasInput).to.be.a('function');
        expect(el.hasInput()).to.be.false;
    });

    it('should tell about whether it has an output slot', function() {
        expect(el.hasOutput).to.be.a('function');
        expect(el.hasOutput()).to.be.false;
    });

    xit('should render a DOM reprensation of itself', function() {
        // TODO: Mock document
        var node;

        node = document.body;
        el.renderSelf(node);
        expect(node.childElementCount).to.be.greaterThan(0);
    });
});

describe('SwitchElement', function() {
    var el, name;

    name = "switch";

    it('should have a constructor', function() {
        expect(element.SwitchElement).to.be.a('function');
    });

    beforeEach(function() {
        el = new element.SwitchElement(name);
    });

    it('should inherit from ElectronicElement', function() {
        expect(el instanceof element.SwitchElement).to.be.true;
        expect(el instanceof element.ElectronicElement).to.be.true;
    });

    it('should save its state', function() {
        expect(el.isClosed()).to.be.true;
        el.useSwitch();
        expect(el.isClosed()).to.be.false;
        el.useSwitch();
        expect(el.isClosed()).to.be.true;
    });

    it('should have an input slot', function() {
        expect(el.getInput()).not.to.be.undefined;
        expect(el.getInput()).to.be.null;
        expect(el.hasInput()).to.be.false;
    });

    it('should have an output slot', function() {
        expect(el.getOutput()).not.to.be.undefined;
        expect(el.getOutput()).to.be.null;
        expect(el.hasOutput()).to.be.false;
    });

    it('should only accept ElectronicElements as input element', function() {
        var err, el2;
        err = {
            name: "ElectronicElementError"
        };

        expect(function() { el.setInput({}); }).to.throw(err);

        el2 = new element.ElectronicElement();
        expect(function() { el.setInput(el2); }).not.to.throw(err);
    });

    it('should only accept ElectronicElements as output element', function() {
        var err, el2;
        err = {
            name: "ElectronicElementError"
        };

        expect(function() { el.setOutput({}); }).to.throw(err);

        el2 = new element.ElectronicElement();
        expect(function() { el.setOutput(el2); }).not.to.throw(err);
    });
});

describe("Power source", function() {
    var el, name;

    name = "power-source";

    it('should have a constructor', function() {
        expect(element.PowerSourceElement).to.be.a('function');
    });

    beforeEach(function() {
        el = new element.PowerSourceElement(name);
    });

    it('should inherit from ElectronicElement', function() {
        expect(el instanceof element.PowerSourceElement).to.be.true;
        expect(el instanceof element.ElectronicElement).to.be.true;
    });

    it('should have no input slot', function() {
        expect(el.getInput).to.be.undefined;
    });

    it('should have an output slot', function() {
        expect(el.getOutput()).not.to.be.undefined;
        expect(el.getOutput()).to.be.null;
    });
});

describe("Circuit", function() {
    describe("containing out of switches", function() {
        var el1, el2, el3;
    
        beforeEach(function() {
            el1 = new element.SwitchElement("element1");
            el2 = new element.SwitchElement("element2");
            el3 = new element.SwitchElement("element3");
        });
    
        it('should contain out of closed switches', function() {
            expect(el1.isClosed()).to.be.true;
            expect(el2.isClosed()).to.be.true;
            expect(el3.isClosed()).to.be.true;
        });
    
        describe("when not plugged together", function() {
            it('should form an open circuit', function() {
                expect(el1.hasInput()).to.be.false;
                expect(el2.hasInput()).to.be.false;
                expect(el3.hasInput()).to.be.false;
    
                expect(el1.hasOutput()).to.be.false;
                expect(el2.hasOutput()).to.be.false;
                expect(el3.hasOutput()).to.be.false;
    
                expect(element.circuitIsClosed([el1, el2, el3])).to.be.false;
            });
    
            it('should render a formula showing it', function() {
                expect(element.renderCircuitLogic([el1, el2, el3])).to.equal('0 \u2227 0 \u2227 0 = 0');
            });
        });
    
        describe("when plugged together", function() {
            beforeEach(function() {
                el1.setInput(el3);
                el2.setInput(el1);
                el3.setInput(el2);
    
                el1.setOutput(el2);
                el2.setOutput(el3);
                el3.setOutput(el1);
            });
    
            it('should form a closed circuit', function() {
                expect(el1.hasInput()).to.be.true;
                expect(el2.hasInput()).to.be.true;
                expect(el3.hasInput()).to.be.true;
    
                expect(el1.hasOutput()).to.be.true;
                expect(el2.hasOutput()).to.be.true;
                expect(el3.hasOutput()).to.be.true;
    
                expect(element.circuitIsClosed([el1, el2, el3])).to.be.true;
            });
    
            it('should render a formula showing it', function() {
                expect(element.renderCircuitLogic([el1, el2, el3])).to.equal('1 \u2227 1 \u2227 1 = 1');
            });
        });
    });
});
