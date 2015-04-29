/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["docs.searchtools"]){dojo._hasResource["docs.searchtools"]=true;dojo.provide("docs.searchtools");dojo.makeSearchSummary=function(_1,_2,_3){var _4=_1.toLowerCase();var _5=0;dojo.forEach(_2,function(kw){var i=_4.indexOf(kw.toLowerCase());if(i>-1){_5=i;}});_5=Math.max(_5-120,0);var _6=((_5>0)?"...":"")+dojo.trim(_1.substr(_5,240))+((_5+240-_1.length)?"...":"");var rv=dojo.query(dojo._toDom("<div class=\"context\">"+_6.replace("<","&lt;")+"</div>"));dojo.forEach(_3,function(w){rv=rv.highlightText(w,"highlight");});return rv;};window.PorterStemmer=function(){var _7={ational:"ate",tional:"tion",enci:"ence",anci:"ance",izer:"ize",bli:"ble",alli:"al",entli:"ent",eli:"e",ousli:"ous",ization:"ize",ation:"ate",ator:"ate",alism:"al",iveness:"ive",fulness:"ful",ousness:"ous",aliti:"al",iviti:"ive",biliti:"ble",logi:"log"};var _8={icate:"ic",ative:"",alize:"al",iciti:"ic",ical:"ic",ful:"",ness:""};var c="[^aeiou]";var v="[aeiouy]";var C=c+"[^aeiouy]*";var V=v+"[aeiou]*";var _9="^("+C+")?"+V+C;var _a="^("+C+")?"+V+C+"("+V+")?$";var _b="^("+C+")?"+V+C+V+C;var _c="^("+C+")?"+v;this.stemWord=function(w){var _d,_e,_f,_10=w;if(w.length<3){return w;}var re,re2,re3,re4;_f=w.substr(0,1);if(_f=="y"){w=_f.toUpperCase()+w.substr(1);}re=/^(.+?)(ss|i)es$/;re2=/^(.+?)([^s])s$/;if(re.test(w)){w=w.replace(re,"$1$2");}else{if(re2.test(w)){w=w.replace(re2,"$1$2");}}re=/^(.+?)eed$/;re2=/^(.+?)(ed|ing)$/;if(re.test(w)){var fp=re.exec(w);re=new RegExp(_9);if(re.test(fp[1])){re=/.$/;w=w.replace(re,"");}}else{if(re2.test(w)){var fp=re2.exec(w);_d=fp[1];re2=new RegExp(_c);if(re2.test(_d)){w=_d;re2=/(at|bl|iz)$/;re3=new RegExp("([^aeiouylsz])\\1$");re4=new RegExp("^"+C+v+"[^aeiouwxy]$");if(re2.test(w)){w+="e";}else{if(re3.test(w)){re=/.$/;w=w.replace(re,"");}else{if(re4.test(w)){w+="e";}}}}}}re=/^(.+?)y$/;if(re.test(w)){var fp=re.exec(w);_d=fp[1];re=new RegExp(_c);if(re.test(_d)){w=_d+"i";}}re=/^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;if(re.test(w)){var fp=re.exec(w);_d=fp[1];_e=fp[2];re=new RegExp(_9);if(re.test(_d)){w=_d+_7[_e];}}re=/^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;if(re.test(w)){var fp=re.exec(w);_d=fp[1];_e=fp[2];re=new RegExp(_9);if(re.test(_d)){w=_d+_8[_e];}}re=/^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;re2=/^(.+?)(s|t)(ion)$/;if(re.test(w)){var fp=re.exec(w);_d=fp[1];re=new RegExp(_b);if(re.test(_d)){w=_d;}}else{if(re2.test(w)){var fp=re2.exec(w);_d=fp[1]+fp[2];re2=new RegExp(_b);if(re2.test(_d)){w=_d;}}}re=/^(.+?)e$/;if(re.test(w)){var fp=re.exec(w);_d=fp[1];re=new RegExp(_b);re2=new RegExp(_a);re3=new RegExp("^"+C+v+"[^aeiouwxy]$");if(re.test(_d)||(re2.test(_d)&&!(re3.test(_d)))){w=_d;}}re=/ll$/;re2=new RegExp(_b);if(re.test(w)&&re2.test(w)){re=/.$/;w=w.replace(re,"");}if(_f=="y"){w=_f.toLowerCase()+w.substr(1);}return w;};};window.Search={_index:null,_queued_query:null,_pulse_status:-1,init:function(){var _11=dojo.getQueryParameters();if(_11.q){var _12=_11.q[0];dojo.query("input[name=\"q\"]").forEach(function(_13){_13.value=_12;});this.performSearch(_12);}},setIndex:function(_14){var q;this._index=_14;if((q=this._queued_query)!==null){this._queued_query=null;Search.query(q);}},hasIndex:function(){return this._index!==null;},deferQuery:function(_15){this._queued_query=_15;},stopPulse:function(){this._pulse_status=0;},startPulse:function(){if(this._pulse_status>=0){return;}function _16(){Search._pulse_status=(Search._pulse_status+1)%4;var _17="";for(var i=0;i<Search._pulse_status;i++){_17+=".";}Search.dots.innerHTML=_17;if(Search._pulse_status>-1){window.setTimeout(_16,500);}};_16();},performSearch:function(_18){var $=dojo.query;this.out=$("#search-results");this.title=dojo.place("<h2>"+_("Searching")+"</h2>",this.out[0]);this.dots=dojo.place("<span></span>",this.title);this.status=dojo.place("<p style=\"display: none\"></p>",this.out[0]);this.output=dojo.place("<ul class=\"search\"></ul>",this.out[0]);dojo.byId("search-progress").innerHTML="Preparing search...";this.startPulse();if(this.hasIndex()){this.query(_18);}else{this.deferQuery(_18);}},query:function(_19){var _1a=new PorterStemmer();var _1b=[];var _1c=[];var _1d=[];var tmp=_19.split(/\s+/);var _1e=(tmp.length==1)?tmp[0].toLowerCase():null;for(var i=0;i<tmp.length;i++){var _1f=_1a.stemWord(tmp[i]).toLowerCase();if(_1f[0]=="-"){var _20=_1c;_1f=_1f.substr(1);}else{_20=_1b;_1d.push(tmp[i].toLowerCase());}if(dojo.indexOf(_20,_1f)<0){_20.push(_1f);}}var _21="?highlight="+dojo.urlencode(_1d.join(" "));console.debug("SEARCH: searching for:");console.info("required: ",_1b);console.info("excluded: ",_1c);var _22=this._index.filenames;var _23=this._index.titles;var _24=this._index.terms;var _25=this._index.descrefs;var _26=this._index.modules;var _27=this._index.desctypes;var _28={};var _29=null;var _2a=[];var _2b=[];dojo.query("#search-progress").empty();if(_1e!=null){for(var _2c in _26){if(_2c.indexOf(_1e)>-1){fn=_26[_2c];descr=_("module, in ")+_23[fn];_2a.push([_22[fn],_2c,"#module-"+_2c,descr]);}}for(var _2d in _25){for(var _2e in _25[_2d]){var _2f=(_2d?_2d+".":"")+_2e;if(_2f.toLowerCase().indexOf(_1e)>-1){match=_25[_2d][_2e];descr=_27[match[1]]+_(", in ")+_23[match[0]];_2a.push([_22[match[0]],_2f,"#"+_2f,descr]);}}}}_2a.sort(function(a,b){return (a[1]>b[1])?-1:((a[1]<b[1])?1:0);});for(var i=0;i<_1b.length;i++){var _1f=_1b[i];if((_29=_24[_1f])==null){break;}if(_29.length==undefined){_29=[_29];}for(var j=0;j<_29.length;j++){var _30=_29[j];if(_30 in _28){_28[_30].push(_1f);}else{_28[_30]=[_1f];}}}for(var _30 in _28){var _31=true;if(_28[_30].length!=_1b.length){continue;}for(var i=0;i<_1c.length;i++){if(_24[_1c[i]]==_30||$.contains(_24[_1c[i]]||[],_30)){_31=false;break;}}if(_31){_2b.push([_22[_30],_23[_30],"",null]);}}delete _22,_23,_24;_2b.sort(function(a,b){var _32=a[1].toLowerCase();var _33=b[1].toLowerCase();return (_32>_33)?-1:((_32<_33)?1:0);});var _34=_2b.concat(_2a);var _35=_34.length;function _36(){function _37(_38){dojo.place(_38,Search.output);dojo.fx.wipeIn({node:_38,duration:5,onEnd:_36}).play();};if(_34.length){var _39=_34.pop();var _3a=dojo.create("li",{style:"display: none;"});dojo.create("a",{href:_39[0]+DOCUMENTATION_OPTIONS.FILE_SUFFIX+_21+_39[2],innerHTML:_39[1]},_3a);if(_39[3]){dojo.create("span",{innerHTML:_39[3]},_3a);_37(_3a);}else{if(DOCUMENTATION_OPTIONS.HAS_SOURCE){dojo.xhrGet({url:"_sources/"+_39[0]+".txt",load:function(_3b){dojo.place(dojo.makeSearchSummary(_3b,_1b,_1d)[0],_3a);_37(_3a);}});}else{_37(_3a);}}}else{Search.stopPulse();Search.title.innerHTML="Search Results";var _3c=Search.status;if(!_35){_3c.innerHTML="Your search did not match any documents. Please make sure that all words are spelled correctly and that you've selected enough categories.";}else{_3c.innerHTML="Search finished, found %s page(s) matching the search query.".replace("%s",_35);}dojo.style(_3c,{display:"block",opacity:0});dojo.fadeIn({node:Search.status,duration:500}).play();}};_36();}};dojo.ready(Search,"init");}