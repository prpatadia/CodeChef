var readline = require("readline");
var jsin = readline.createInterface({
	input : process.stdin,
	output : process.stdout
});
var lineNum = 0;
var numOfTestCases = 0;
var testCaseLineNum = 0;
var testDataLineNum = 0;
var correctSequence, submittedSequence, winnings;
var result = [];
jsin.on("line", function(data) {
	data = data.replace(/\s+/g, ' ');
	if (lineNum === 0) {
		numOfTestCases = data.split(' ').map(Number)[0];
		if (numOfTestCases == 0) {
			process.exit(0);
		}
		lineNum++;
	} else {

		if (testDataLineNum === 0) {
			// reading number of elements in test case
			testDataLineNum++;
		} else if (testDataLineNum == 1) {
			// reading correct answer sequence
			correctSequence = data;
			testDataLineNum++;
		} else if (testDataLineNum == 2) {
			// reading chefs answer sequence
			submittedSequence = data;
			testDataLineNum++;
		} else {
			// reading winnings
			winnings = data;
			findWinnings(correctSequence, submittedSequence, winnings);
			testDataLineNum = 0;
			testCaseLineNum++;
		}

		if (testCaseLineNum >= numOfTestCases) {
			console.log(result.join('\n'));
			process.exit(0);
		}

	}
});

function findWinnings(correct, submitted, winningsArray) {
	winnings = winningsArray.split(' ').map(Number);
	var correctAnswerCount = 0;
	for (j = 0; j < correct.length; j++) {
		if (correct.charAt(j) == submitted.charAt(j)) {
			correctAnswerCount++;
		}
	}
	if (correct.length > correctAnswerCount) {
		temp = winnings.slice(0, correctAnswerCount+1);//+1 since starting with 0 to include all incorrect permutation
		result.push(Math.max.apply(null, temp));
	} else {
		result.push(winnings[correctAnswerCount]);
	}
}