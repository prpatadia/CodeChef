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
		if(numOfTestCases==0){
			process.exit(0);
		}
		lineNum++;
	}else{
		
			if(testDataLineNum===0){
				// reading number of elements in test case
				testDataLineNum++;
			}else if(testDataLineNum==1){
				// reading correct answer sequence
				testCase.correctSequence=data;
				testDataLineNum++;
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
				processTestCases();
				process.exit(0);
			}
		
	}
});

function processTestCases(){
	if(testSet.length==0){
		console.log(0);
		return;
	}
	var result=[];
	for(i=0;i<testSet.length;i++){
		correct=testSet[i].correctSequence;
		submitted=testSet[i].submittedSequence;
		winnings=testSet[i].winnings.split(' ').map(Number);
		answerCount=0;
		if(correct.length!=submitted.length || correct.length!=winnings.length-1){
			// when user did not give proper input, return 0
			// this is not a requirement but i felt the need to handle it
			result.push(0);
			continue;
		}
		noCorrect=true;
		for(j=0;j<correct.length;j++){
			if(correct.charAt(j)==submitted.charAt(j)){
				answerCount++;
			}
		}
		
		result.push(winnings[answerCount]);
	}
	console.log(result.join('\n'));
}