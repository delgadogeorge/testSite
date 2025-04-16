window.onload = function () {
    const exportData = document.getElementById("exportData");

    if (!exportData) {
        console.error("exportData button not found.");
        return;
    }

    exportData.onclick = function () {
        exportFile(jsonMod);
        console.log(jsonMod);
    };
};

function exportFile(jsonMod) {

    const doorKeyWords = ["Intrusion", "Forced Door", "Door held open"];
    const nullKeyWords = ["IT", "Null"];

    const dataNames = {
        "Valid": [],
        "Forced Door": [],
        "Null": []
    };

    jsonMod.forEach(row => {
        const eventType = row["Event Type"]?.toLowerCase() || "";
        const source = row["Source"]?.toLowerCase() || "";

        if (doorKeyWords.some(keyWord => eventType.includes(keyWord.toLowerCase()))) {
            dataNames["Forced Door"].push(row);
            return;
        };

        if (nullKeyWords.some(keyWord => source.includes(keyWord.toLowerCase()))) {
            dataNames["Null"].push(row);
            return;
        }

        dataNames["Valid"].push(row);
    });
    console.log(dataNames)

    const workbook = XLSX.utils.book_new();

    for (const sheetName in dataNames) {
        const sheetRows = dataNames[sheetName];

        if (sheetRows.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(sheetRows);
            XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
        };
    };

    const today = new Date().toISOString().split("T")[0];
    const fileName = `Modifie_Badge_Data_${today}.xlsx`

    XLSX.writeFile(workbook, fileName);
};