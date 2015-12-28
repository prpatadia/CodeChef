var readline = require("readline");
var reader = readline.createInterface({
	input : process.stdin,
	output : process.stdout
});
var numOfStreets, windowSize;
var inputLine = 0;
var logStreetWeights = [], trackWeights = [], selectedStreet = 0, currentStreetIndex, CONST_MOD = 1000000007;
reader
		.on(
				"line",
				function(data) {
					data = data.replace(/\s+/g, ' ');// ensure there is
														// single space between
														// each input
					if (inputLine === 0) {
						numOfStreets = data.split(" ")[0];
						windowSize = data.split(" ")[1];
						inputLine++;
					} else {
						var streetWeights = data.split(" ").map(Number);
						for (currentStreetIndex = 0; currentStreetIndex < numOfStreets; currentStreetIndex++) {
							if (windowSize >= currentStreetIndex) {
								//first window
								logStreetWeights[currentStreetIndex] = Math
										.log(streetWeights[currentStreetIndex]);
								trackWeights[currentStreetIndex] = streetWeights[currentStreetIndex];
							} else if (currentStreetIndex - windowSize - 1 === selectedStreet) {
								// next window
								var windowSlice = logStreetWeights
										.slice(selectedStreet + 1,
												currentStreetIndex);//+1 as first street is always selected
								var minLogWeightInWindow = Math.min.apply(null,
										windowSlice);
								var minLogWeightIndex = windowSlice
										.indexOf(minLogWeightInWindow);
								// mark weight of current street as sum of log
								// weights to travel till this street
								logStreetWeights[currentStreetIndex] = Math
										.log(streetWeights[currentStreetIndex])
										+ minLogWeightInWindow;
								selectedStreet = selectedStreet
										+ minLogWeightIndex + 1;
								trackWeights[currentStreetIndex] = streetWeights[currentStreetIndex]
										* trackWeights[selectedStreet]
										% CONST_MOD;
							} else {
								// window edge
								logStreetWeights[currentStreetIndex] = Math
										.log(streetWeights[currentStreetIndex])
										+ logStreetWeights[selectedStreet];
								trackWeights[currentStreetIndex] = streetWeights[currentStreetIndex]
										* trackWeights[selectedStreet]
										% CONST_MOD;
							}
						}
						console.log(streetWeights[0]
								* trackWeights.slice(-1).pop() % CONST_MOD);

					}
				});