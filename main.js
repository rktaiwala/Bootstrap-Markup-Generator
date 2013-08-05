var classes=[];
var taglists;
$(document).ready(function() {
    srcPath     = getNativeBracketsDirectoryPath();
	var cssContent=httpGet(window.location.origin+srcPath+'/css/bootstrap.min.css');
	
	var text = cssContent;
	text=text.replace(/\/\*(.|\s)*?\*\//g,'');
	text=text.replace(/\@media.*?}}/g,'');
	text=text.replace(/\{[^\}]*\}/g,'|');


	text=text.replace(/,/g,'|');
	//console.log(text);
	var mt=text.match(/\.[^|]*/g);
	//console.log(mt);
	//var classes=text.split('|');
	//console.log(classes);
	uniqueArray=[];
	uniqueArray = mt.filter(function(elem, pos, self) {
		return self.indexOf(elem) == pos;
	});
	var classTxt='';
	$.each(uniqueArray, function(i, el){
		classTxt +=el+'|';
		//if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
	});
	classTxt=classTxt.replace(/(?=\s)[^\.]*/g,'|');
	classTxt=classTxt.replace(/>[^\.]*/g,'|');
	classTxt=classTxt.replace(/\|\.[^|]*:[^|]*(?=|)/g,'');
	classTxt=classTxt.replace(/\+/g,'|');
	classTxt=classTxt.replace(/\[[^|]*\]/g,'');
	classTxt=classTxt.replace(/(\.[^\.|]*(?=\.))/g,'$1|');
	mt=[];
	mt=classTxt.split('|');
	uniqueArray=[];
	uniqueArray = mt.filter(function(elem, pos, self) {
		return self.indexOf(elem) == pos;
	});
	console.log(mt);
	console.log(uniqueArray);
	classes=uniqueArray;
	var taglist=httpGet(window.location.origin+srcPath+'/json/taglist.json');
	console.log(JSON.parse(JSON.stringify(eval('('+taglist+')'))));
	taglists=JSON.parse(JSON.stringify(eval('('+taglist+')')));
	$.each(taglists,function(i,el){
		$('#tags').append('<li><a href="#'+i+'">'+i+'</a></li>');
	
	//console.log(i);
	});
	$.each(classes,function(i,el){
		$('#classname').append('<li><a href="#'+el+'">'+el+'</a></li>');
	
	console.log(el);
	});
	
	function httpGet(theUrl)
    {
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
    }
	function convertToNativePath(path) {
        path = unescape(path);
        if (path.indexOf(":") !== -1 && path[0] === "/") {
            return path.substr(1);
        }
        
        return path;
    }
	function getNativeBracketsDirectoryPath() {
        var pathname = decodeURI(window.location.pathname);
        var directory = pathname.substr(0, pathname.lastIndexOf("/"));
        return convertToNativePath(directory);
    }
});
