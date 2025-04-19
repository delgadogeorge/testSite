//This script takes any excel file(s) and filters the data.
//This should be updated if there are any additional "ID's" to modify are needed
//Or additional updates to filtering data is needed.

let jsonMod = [];

function processExcelFiles(files) {
	jsonMod = [];
	let filesProcessed = 0;

	const sourceKeys = {
		Entry: ["East Entry", "East Lobby", "Employee Entrance"],
		Fab: ["BGBM", "Main Fab", "New Sort Gown Room"],
		SubFab: ["SubFab"],
		IT: ["IDF", "Computer Room", "Archive Room"],
		Null: [
			"ERT Room",
			"Library",
			"Arsenic Door",
			"North Hall Door",
			"Parking Lot",
			"Temperature Test",
			"SEM Room",
			"FA Lab",
			"Admin",
		],
	};

	for (const key in sourceKeys) {
		sourceKeys[key] = sourceKeys[key].map((keyword) => keyword.toLowerCase());
	}

	for (let i = 0; i < files.length; i++) {
		const reader = new FileReader();
		const file = files[i];

		reader.onload = function (event) {
			const data = new Uint8Array(event.target.result);
			const workbook = XLSX.read(data, { type: "array" });
			const sheetName = workbook.SheetNames[0];
			const worksheet = workbook.Sheets[sheetName];
			const json = XLSX.utils.sheet_to_json(worksheet, { raw: false });

			const jsonFilter = json.map((row) => {
				let source = row["Source"]?.toLowerCase() || "";
				let badgeEntry = "";

				if (source.includes("in")) badgeEntry = "In";
				else if (source.includes("out")) badgeEntry = "Out";

				const matchSourceKeys = Object.keys(sourceKeys).find((sourceType) =>
					sourceKeys[sourceType].some((keyword) => source.includes(keyword))
				);

				const matchSource = matchSourceKeys || null;

				if (["Fab", "Entry", "SubFab"].includes(matchSource) && badgeEntry) {
					row["Source"] = `${matchSource} ${badgeEntry}`;
				} else if (matchSource === "IT") {
					row["Source"] = "IT";
				} else {
					row["Source"] = "Null";
				}

				return row;
			});

			jsonMod = jsonMod.concat(jsonFilter);
			filesProcessed++;

			if (filesProcessed === files.length) {
				displayTable(jsonMod);
				console.log("All processed data:", jsonMod);
			}
		};

		reader.readAsArrayBuffer(file);
	}
}
