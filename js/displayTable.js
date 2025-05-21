//This script has multiple features.
//It sorts the filtered data into a table.
//The html table section is blurred and has an overlayed message.
//This script removes the styling when the data is uploaded

const overlay = document.getElementById("overlay-message");
if (!overlay) {
  console.warn("Overlay element not found at time of displayTable()");
}

function displayTable(data) {
  const html = document.getElementById("output");
  const overlay = document.getElementById("overlay-message");
  const container = document.getElementById("json-data");
  const showContainer = document.getElementById("show");

  if (overlay) {
    overlay.classList.remove("d-flex"); //critical that this stays because message won't hide
    overlay.classList.add("d-none");
  }

  if (container) {
    container.classList.remove("blurred");
  }

  if (showContainer) {
    showContainer.style.display = "block";
  }

  let output = '<table class="table table-sm table-striped">';
  output += "<thead><tr>";
  for (let columnHead in data[0]) {
    //output += `<th scope="col">${columnHead}</th>`;
    output += `<th scope="col" class="sortable" data-column="${columnHead}">${columnHead}</th>`;
  }
  output += '</tr></thead><tbody class="table-group-divider">';

  data.forEach((row) => {
    output += "<tr>";
    for (let columnHead in row) {
      let cellValue = row[columnHead];
      if (columnHead.toLowerCase().includes("date")) {
        cellValue = formatDateTime(cellValue);
      }
      output += `<td>${cellValue}</td>`;
    }
    output += "</tr>";
  });

  output += "</tbody></table>";
  html.innerHTML = output;

  const resetButton = document.getElementById("resetFiles");

  resetButton.addEventListener("click", () => {
    allFiles = [];
    fileInput.value = "";
    fileListDisplay.innerHTML = "";
    document.getElementById("output").innerHTML = "";

    // Optional: reset visual state
    const overlay = document.getElementById("overlay-message");
    const container = document.getElementById("json-data");
    const showContainer = document.getElementById("show");

    if (overlay) {
      overlay.classList.remove("d-none");
      overlay.classList.add("d-flex");
    }
    if (container) {
      container.classList.add("blurred");
    }
  });
}

//Drag and drop works for the entire box but not for clicking.
//I need to update so "click" can be used anywhere on the box.
