let express = require("express");
let app = express();
app.use(express.json());
let hostname = "localhost";
let port = 3000;
let energyData = {};

app.post("/api/:deviceid", (req, res) => {
	let getDeviceId = req.params.deviceid;
	let energyUsage = req.body["energy-usage"];

	// Checks if the energyUsage is only a number 
	// & not negative/zero
	if (typeof energyUsage === "number" && energyUsage >= 0) {
		if (!energyData[getDeviceId]) {
			energyData[getDeviceId] = [];
		}
		energyData[getDeviceId].push(energyUsage);
		res.sendStatus(200);
	} else {
		res.status(400).send("Invalid Request");
	}
});

app.get("/api/:deviceid", (req, res) => {
	let ObjId = req.params.deviceid;
	let usageData = energyData[ObjId];

	if (usageData) {
		res.json({"total-energy-usage": usageData});
	} else {
		res.status(404).send("Device Not Found");
	}
});

app.get("/", (req, res) => {
	let htmlTable = `<!DOCTYPE html>
<html>
<head>
	<title>Device Energy Usage</title>
	<style>
		table {
			border-collaspe: collaspe;
		}
		th, td {
			border: solid 1px black;
			padding: 10px;
		}
		tr.red-row {
			background-color: red;
		}
	</style>
</head>
<body>
	<table>
		<tr>
			<th>Device ID</th>
			<th>Energy Usage</th>
		</tr>`;
	for (let deviceId in energyData) {
		let totalUsage = 0;
		let getArray = energyData[deviceId];
		let rowColor = ""
		for (let i = 0; i < getArray.length; i++) {
			totalUsage += getArray[i];
		}

		if (totalUsage > 1000) {
			rowColor = 'red-row';
		} 

		htmlTable += `<tr class="${rowColor}">
			<td>${deviceId}</td>
			<td>${getArray.join(", ")}</td>
			</tr>`;
	}

	htmlTable += `</table>
	</body>
	</html>`;

	res.send(htmlTable);
});

app.listen(port, hostname, () => {
	console.log(`http://${hostname}:${port}`);
})