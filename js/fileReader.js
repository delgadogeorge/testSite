let jsonMod = [];

document.getElementById("excelFile").addEventListener("change", function (readData) {
    const files = readData.target.files;
    jsonMod = []; // Reset for new upload
    let filesProcessed = 0;

    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        const file = files[i];

        reader.onload = function (event) {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet, { raw: false });

            const sourceKeys = {
                "Entry": ["East Entry", "East Lobby", "Employee Entrance"],
                "Fab": ["BGBM", "Main Fab", "New Sort Gown Room"],
                "SubFab": ["SubFab"],
                "IT": ["IDF", "Computer Room", "Archive Room"],
                "Null": ["ERT Room", "Library", "Arsenic Door", "North Hall Door", "Parking Lot", "Temperature Test", "SEM Room", "FA Lab", "Admin"]
            };

            for (const key in sourceKeys) {
                sourceKeys[key] = sourceKeys[key].map(keyword => keyword.toLowerCase());
            }

            const jsonFilter = json.map(row => {
                let source = row["Source"]?.toLowerCase() || "";
                let badgeEntry = "";
                let ITData = "IT";
                let nullData = "Null";

                if (source.includes("in")) badgeEntry = "In";
                else if (source.includes("out")) badgeEntry = "Out";

                const matchSourceKeys = Object.keys(sourceKeys).find(sourceType => {
                    const keywords = sourceKeys[sourceType];
                    return keywords.some(keyword => source.includes(keyword));
                });

                const matchSource = matchSourceKeys || null;

                if ((matchSource === "Fab" || matchSource === "Entry" || matchSource === "SubFab") && badgeEntry) {
                    row["Source"] = `${matchSource} ${badgeEntry}`;
                }
                else if (matchSource === "IT") {
                    row["Source"] = `${ITData}`;
                }
                else {
                    row["Source"] = `${nullData}`;
                }

                return row;
            });

            jsonMod = jsonMod.concat(jsonFilter);
            filesProcessed++;

            if (filesProcessed === files.length) {
				// only gets to here once ALL files have been read
                displayTable(jsonMod);
                console.log("All processed data:", jsonMod);
            }
        };

        reader.readAsArrayBuffer(file);
    }
});

function displayTable(data) {
    let output = "<table><tr>";
    for (let columnHead in data[0]) {
        output += `<th>${columnHead}</th>`;
    }
    output += "</tr>";

    data.forEach((row) => {
        output += "<tr>";
        for (let columnHead in row) {
            output += `<td>${row[columnHead]}</td>`;
        }
        output += "</tr>";
    });
    output += "</table>";

    document.getElementById("output").innerHTML = output;
}
