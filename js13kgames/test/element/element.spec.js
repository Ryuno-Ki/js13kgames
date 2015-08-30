// Mock DOM
var jsdom = require('jsdom').jsdom;
global.document = jsdom('<html><head></head><body></body></html>');
global.window = document.parentWindow;

var ns = require('../../src/js/element.js');
var element = ns.JS13KBP.element;

describe('ElectronicElement', function() {
    var el, name, sandbox;

    name = "electronic";

    it('should have a constructor', function() {
        expect(element.ElectronicElement).to.be.a("function");
    });

    beforeEach(function() {
        el = new element.ElectronicElement(name);
        sandbox = sinon.sandbox.create();

        sandbox.stub(window.console, "log");
    });

    afterEach(function() {
        sandbox.restore();
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
        expect(el.getType()).to.equal('electronic');
    });

    it('should have no input slot', function() {
        expect(el.hasInput).to.be.a('function');
        expect(el.hasInput()).to.be.false;
    });

    it('should have no output slot', function() {
        expect(el.hasOutput).to.be.a('function');
        expect(el.hasOutput()).to.be.false;
    });

    it('should render a DOM reprensation of itself', function() {
        var node;

        node = window.document.getElementsByTagName('body')[0];
        el.renderSelf(node);
        expect(node.innerHTML).to.contain('img');
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

    it('should have a name', function() {
        expect(el.getName()).to.contain(name);
    });

    it('should be able to deal with spaces as name, too', function() {
        var words, word, i, len;
        name = "my super fancy element";
        el = new element.SwitchElement(name);
        words = name.split();
        for (i = 0, len = words.length; i < len; i += 1) {
            word = words[i];
            expect(el.getName()).to.contain(word);
        }
    });

    it('should count the instances', function() {
        var numberOfElements, el2;
        numberOfElements = element.SwitchElement.count;
        el2 = new element.SwitchElement("hebel");
        expect(element.SwitchElement.count).to.equal(numberOfElements + 1);
    });

    it('should save its type', function() {
        expect(el.getType()).to.equal('switch');
    });


    it('should inherit from ElectronicElement', function() {
        expect(el).to.be.an.instanceof(element.SwitchElement);
        expect(el).to.be.an.instanceof(element.ElectronicElement);
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
        // TODO: Import from errors.js!
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

    it('should have a name', function() {
        expect(el.getName()).to.contain(name);
    });

    it('should be able to deal with spaces as name, too', function() {
        var words, word, i, len;
        name = "my super fancy element";
        el = new element.PowerSourceElement(name);
        words = name.split();
        for (i = 0, len = words.length; i < len; i += 1) {
            word = words[i];
            expect(el.getName()).to.contain(word);
        }
    });

    it('should count the instances', function() {
        var numberOfElements, el2;
        numberOfElements = element.PowerSourceElement.count;
        el2 = new element.PowerSourceElement("hebel");
        expect(element.PowerSourceElement.count).to.equal(numberOfElements + 1);
    });

    it('should save its type', function() {
        expect(el.getType()).to.equal('power-source');
    });


    it('should inherit from ElectronicElement', function() {
        expect(el).to.be.an.instanceof(element.PowerSourceElement);
        expect(el).to.be.an.instanceof(element.ElectronicElement);
    });

    it('should have no input slot', function() {
        expect(el.hasInput).to.be.a('function');
        expect(el.hasInput()).to.be.false;
    });

    it('should have an output slot', function() {
        expect(el.getOutput()).not.to.be.undefined;
        expect(el.getOutput()).to.be.null;
    });
});

describe("ConsumerElement", function() {
    var el, name;

    name = "consumer";

    it("should have a constructor", function() {
        expect(element.ConsumerElement).to.be.a("function");
    });

    beforeEach(function() {
        el = new element.ConsumerElement(name);
    });

    it('should have a name', function() {
        expect(el.getName()).to.contain(name);
    });

    it('should be able to deal with spaces as name, too', function() {
        var words, word, i, len;
        name = "my super fancy element";
        el = new element.ConsumerElement(name);
        words = name.split();
        for (i = 0, len = words.length; i < len; i += 1) {
            word = words[i];
            expect(el.getName()).to.contain(word);
        }
    });

    it('should count the instances', function() {
        var numberOfElements, el2;
        numberOfElements = element.ConsumerElement.count;
        el2 = new element.ConsumerElement("hebel");
        expect(element.ConsumerElement.count).to.equal(numberOfElements + 1);
    });

    it('should save its type', function() {
        expect(el.getType()).to.equal('consumer');
    });


    it("should inherit from ElectronicElement", function() {
        expect(el).to.be.an.instanceof(element.ConsumerElement);
        expect(el).to.be.an.instanceof(element.ElectronicElement);
    });

    it("should have an input slot", function() {
        expect(el.getInput()).not.to.be.undefined;
        expect(el.getInput()).to.be.null;
    });

    it("should have no output slot", function() {
        expect(el.hasOutput).to.be.a("function");
        expect(el.hasOutput()).to.be.false;
    });
});

describe("Circuit", function() {
    var el, name;

    name = "circuit";

    it("should have a constructor", function() {
        expect(element.CircuitElement).to.be.a("function");
    });

    beforeEach(function() {
        el = new element.CircuitElement(name);
    });

    it("should inherit from ElectronicElement", function() {
        expect(el).to.be.an.instanceof(element.CircuitElement);
        expect(el).to.be.an.instanceof(element.ElectronicElement);
    });

    it("should contain at least one power source", function() {
        var pse;

        expect(el.hasPowerSource()).to.be.false;
        pse = new element.PowerSourceElement();
        el.addPowerSource(pse);
        expect(el.hasPowerSource()).to.be.true;
    });

    it("should contain at lease one consumer", function() {
        var ce;

        expect(el.hasConsumer()).to.be.false;
        ce = new element.ConsumerElement();
        el.addConsumer(ce);
        expect(el.hasConsumer()).to.be.true;
    });

    describe("with a power source, a consumer and at least one electronic element", function() {
        var pse, ce, ee;

        beforeEach(function() {
            pse = new element.PowerSourceElement();
            ce = new element.ConsumerElement();
            ee = new element.ElectronicElement();
        });

        it("should demand them", function() {
            expect(el.isCompleteCircuit()).to.be.false;

            el.addPowerSource(pse);
            expect(el.isCompleteCircuit()).to.be.false;

            el.addConsumer(ce);
            expect(el.isCompleteCircuit()).to.be.false;

            el.addElectronic(ee);
            expect(el.isCompleteCircuit()).to.be.true;
        });

        context("when plugged together", function() {
            it("should ensure that", function() {
                var se;
    
                se = new element.SwitchElement();
                expect(se.isClosed()).to.be.true;
    
                expect(se.getInput()).to.be.null;
                se.setInput(pse);
                expect(se.getInput().getName()).to.equal(pse.getName());
                expect(pse.getOutput().getName()).to.equal(se.getName());
    
                expect(se.getOutput()).to.be.null;
                se.setOutput(ce);
                expect(se.getOutput().getName()).to.equal(ce.getName());
                expect(ce.getInput().getName()).to.equal(se.getName());
            });
    
            context("and inserted in the circuit", function() {
                var se;

                beforeEach(function() {
                    se = new element.SwitchElement();
                    el.addPowerSource(pse);
                    el.addConsumer(ce);
                    el.addElectronic(se);
                });

                it("should ensure, that the circuit is closed", function() {
                    expect(se.isClosed()).to.be.true;

                    se.setInput(pse);
                    se.setOutput(ce);
                    expect(el.isCircuitClosed()).to.be.true;

                    se.useSwitch();
                    expect(se.isClosed()).to.be.false;
                    expect(el.isCircuitClosed()).to.be.false;
                });

                it('should render a formula showing it', function() {
                    // Order in which they were inserted, see beforeEach hook
                    expect(el.renderCircuitLogic()).to.equal('0 \u2227 0 \u2227 0 = 0');
                    se.setInput(pse);
                    se.setOutput(ce);
                    expect(el.renderCircuitLogic()).to.equal('1 \u2227 1 \u2227 1 = 1');
                    se.useSwitch();
                    expect(el.renderCircuitLogic()).to.equal('1 \u2227 1 \u2227 0 = 0');
                });
            });
        });
    });
});
