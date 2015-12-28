var jsin = require("readline").createInterface({
	input:process.stdin;
});
var lineNum=0;
var numOfTestCases=0;
var testCaseLineNum=0;
var result;
jsin.on("line",function(data){
	data=data.replace(/\s+/g,' ');
	if(lineNum===0){
		numOfTestCases=data.split(' ').map(Number)[0];
		lineNum++;
	}else{
		for(;testCaseLineNum<numOfTestCases;testCaseLineNum++){
			
		}
	}
});