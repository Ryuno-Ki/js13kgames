/*! js13k-breaker-panel - v0.0.5 - 2015-09-13 */
define(["element","svg","electronics/powerSourceElement","electronics/switchElement","electronics/consumerElement","electronics/circuitElement"],function(a,b,c,d,e,f){"use strict";var g,h,i,j,a,k,l,m,n,o,p,q,r;g=document.getElementById("game"),h=[[0,0,25,25],[25,0,50,25],[50,0,75,25],[75,0,100,25],[0,25,25,50],[25,25,50,50],[50,25,75,50],[75,25,100,50],[0,50,25,75],[25,50,50,75],[50,50,75,75],[75,50,100,75],[0,75,25,100],[25,75,50,100],[50,75,75,100],[75,75,100,100]],i=function(a){var b;return b=a.length,a[Math.floor(b*Math.random(b))]},l=[],k={PowerSourceElement:new c.PowerSourceElement,SwitchElement:new d.SwitchElement,ConsumerElement:new e.ConsumerElement},r=new f.CircuitElement,k.SwitchElement.setInput(k.PowerSourceElement),r.add(k.PowerSourceElement).add(k.SwitchElement).add(k.ConsumerElement);for(a in k)if(k.hasOwnProperty(a)){do j=i(h);while(-1!==l.indexOf(j+""));l.push(j+""),b.el.appendChild(b.render(k[a],{bb:j}))}for(b.el.appendChild(b.tie({from:k.PowerSourceElement,to:k.SwitchElement})),b.el.appendChild(b.tie({from:k.SwitchElement,to:k.ConsumerElement})),g.appendChild(b.el),b.el.outerHTML=b.el.outerHTML,m=document.getElementsByClassName("explanation"),p=0,q=m.length;q>p;p+=1)n=m[p],o=n.firstElementChild,o.appendChild(b.render(k[n.dataset.electronic+"Element"],{bb:[0,0,25,25]})),o.outerHTML=o.outerHTML;return{}});