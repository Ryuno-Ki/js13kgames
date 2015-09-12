/*! js13k-breaker-panel - v0.0.5 - 2015-09-12 */

define(["app/element","app/errors"],function(a,b){"use strict";var c,d;return c=function(a){var b;return this instanceof c?(c.count+=1,b=this,b._name=a+"-"+c.count,b._type="power-source",void(b._output=null)):new c(a)},d=c.prototype,d.setOutput=function(a){this._output=a||null,a._input=this},d.getOutput=function(){return this._output},d.hasOutput=function(){return"undefined"!=typeof this._output&&null!==this._output},c.count=0,{PowerSourceElement:c}});
//# sourceMappingURL=powerSourceElement.js.map