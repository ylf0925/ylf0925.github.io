"use strict";var sortArray=function r(t,n,a){var o=1<arguments.length&&void 0!==n?n:0,v=2<arguments.length&&void 0!==a?a:t.length-1;if(v-o<1)return t;var e=Math.floor(Math.random()*(v-o+1))+o,i=t[e];u(t,e,v);for(var f=o,h=o;h<v;h++)i>t[h]&&u(t,f++,h);return u(t,f,v),r(t,o,f-1),r(t,f+1,v),t;function u(r,t,n){var a=r[t];r[t]=r[n],r[n]=a}};