var readline = require("readline");
var jsin = readline.createInterface({
	input : process.stdin,
	output : process.stdout
});
var lineNum=0;
var numOfTestCases=0;
var testCaseLineNum=0;
var testDataLineNum=0;
var correctSequence,submittedSequence,winnings;
var testCase=new Object();
var testSet=[];
var result=[];
jsin.on("line",function(data){
	data=data.replace(/\s+/g,' ');
	if(lineNum===0){
		numOfTestCases=data.split(' ').map(Number)[0];
		lineNum++;
	}else{
		
			if(testDataLineNum===0){
				// reading number of elements in test case
				testDataLineNum++;
			}else if(testDataLineNum==1){
				// reading correct answer sequence
				testCase.correctSequence=data;
				testDataLinuNum++;
			}else if(testDataLineNum==2){
				// reading chefs answer sequence
				testCase.submittedSequence=data;
				testDataLineNum++;
			}else{
				// reading winnings
				testCase.winnings=data;
				testSet.push(testCase);
				testCase=new Object();
				testDataLineNum=0;
				testCaseLineNum++;
			}
		
			if(testCaseLineNum>=numOfTestCases){
				process.stdin.close();
				processTestCases();
				process.exit(0);
			}
		
	}
});

function processTestCases(){
	if(testSet.length==0){
		return;
	}
	for(i=0;i<testSet.length;i++){
		
	}
}