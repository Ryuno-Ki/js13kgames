/*! js13k-breaker-panel - v0.0.5 - 2015-09-13 */
define(["element","utils"],function(a,b){"use strict";var c;return c=function(a){var b;c.count+=1,b=this,b._name=a+"-"+c.count,b._type="power-source",b._output=null,b._tile=null},b.inherit(c,a.ElectronicElement),c.count=0,c.prototype.renderSelf=function(a){var b,c,d,e,f,g,h,i,j,k;return a=a||{},a.id=a.id||"power-source",this._tile=a.bb.slice(),d=this._tile[3]-this._tile[1],e=this._tile[2]-this._tile[0],f=this._tile[1]+d/2,g=.9*d,h=this._tile[0]+.25*e+" "+.05*d,i="v"+g,j="v"+.4*d+"m0 "+.1*d+"v"+.4*d,b=document.createElement("g"),b.setAttribute("id",a.id),c=document.createElement("path"),c.setAttribute("d","m"+h+i+"m"+.25*e+" "+-g+j),b.appendChild(c),k=document.createElement("path"),k.setAttribute("class","live"),k.setAttribute("d","M0 0m"+(this._tile[0]+.5*e)+" "+.5*d+"h"+.5*e),b.appendChild(k),b},{PowerSourceElement:c}});