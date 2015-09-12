/*! js13k-breaker-panel - v0.0.5 - 2015-09-12 */

define(["app/element","app/utils","app/errors"],function(a,b,c){"use strict";var d,e;return d=function(a){var b;return this instanceof d?(d.count+=1,b=this,b._name=a+"-"+d.count,b=this,b._type="consumer",void(b._input=null)):new d(a)},e=d.prototype,b.inherit(d,a.ElectronicElement),e.setInput=function(a){this._input=a||null,a._output=this},e.getInput=function(){return this._input},e.hasInput=function(){return"undefined"!=typeof this._input&&null!==this._input},d.count=0,{ConsumerElement:d}});
//# sourceMappingURL=consumerElement.js.map