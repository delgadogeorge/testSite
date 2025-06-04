//createKeys() creates the source keys required to read in and process a file.
//All key values can be updated from this function.
//Returns an object with sourceKeys of key type -> "Entry = key": "East Lobby = type"
//Case insensitive - can update without updating casing
function createKeys() {
  const keys = {
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

  //console.log("keys:", keys);

  for (const type in keys) {
    keys[type] = keys[type].map((keyword) => keyword.toLowerCase());
    //console.log(`${type}`, keys[type]);
  }

  return keys;
}

//Create an empy array of objects for file data
//readFiles() reads in a file(s) and converts data into readable information
let jsonData = [];
function readFiles(files) {
  //console.log("Files: ", files);

  let filesProcessed = 0;
  const sourceType = createKeys();

  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader();
    const file = files[i];

    reader.onload = function (event) {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, {
        raw: true,
        cellDates: false,
      });
      //console.log("json", json);

      jsonData = json.map((row) => {
        let source = row["Source"]?.toLowerCase() || "";
        let badgeEntry = "";

        if (/\bin\b/i.test(source)) {
          badgeEntry = "In";
        } else if (/\bout\b/i.test(source)) {
          badgeEntry = "Out";
        }

        const matchSourceKeys = Object.keys(sourceType).find((type) =>
          sourceType[type].some((keyword) => source.includes(keyword))
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
      console.log("jsonData", jsonData);

      employeeData = createEmployees(jsonData);

      filesProcessed++;

      if (filesProcessed === files.length) {
        displayTable(jsonData);

        //displayTable(employeeData) -> need to update displayTable.js to show data
      }
    };

    reader.readAsArrayBuffer(file);
  }

  // console.log("json length", json.length);
}
