var readline = require("readline");
var jsin = readline.createInterface({
	input : process.stdin,
	output : process.stdout
});
var lineNum=0;
var numOfTestCases=0;
var testCaseLineNum=0;
var testDataLineNum=0;
var result=[];
var elementsInTestSet=0;
jsin.on("line",function(data){
	data=data.replace(/\s+/g,' ');
	if(lineNum===0){
		numOfTestCases=data.split(' ').map(Number)[0];
		lineNum++;
	}else{
		
			if(testDataLineNum===0){
				// reading number of elements in test case
				testDataLineNum++;
			}else{
				// reading test case data
				var testSet=data.split(' ').map(Number);
				findSubsets(testSet);
				testDataLineNum=0;
				testCaseLineNum++;
			}
		
			if(testCaseLineNum>=numOfTestCases){
				console.log(result.join('\n'));
				process.exit(0);
			}
		
	}
});

function findSubsets(testSet){
	if(testSet.length!=null && testSet.length==0){
		result.push(0);
		return;
	}
	var subsetCount=0;
	for(initialIndex=0;initialIndex<testSet.length;initialIndex++){
		var sum=0,product=1;
		for(lastIndex=0;lastIndex<(testSet.length-initialIndex);lastIndex++){
			/*
			 * e.g. set is [1,2,3]
			 * required subsets [1](s=1,p=1),[2](s=2,p=2),[3](s=3,p=3),[1,2,3](s=6,p=6)
			 * so answer is 4
			 * also, [1,2,3] is same as [2,3,1]
			 * so start with 1st element, and keep adding/multiplying remaining elements
			 * wherever sum==product, increment counter
			 */
			elem=testSet[initialIndex+lastIndex];
			sum+=elem;
			product*=elem;
			if(sum==product){
				subsetCount++;
			}
		}
	}
	result.push(subsetCount);
}
