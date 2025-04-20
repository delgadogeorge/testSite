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

	console.log("overlay element:", overlay);

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
		output += `<th scope="col">${columnHead}</th>`;
	}
	output += '</tr></thead><tbody class="table-group-divider">';

	data.forEach((row) => {
		output += "<tr>";
		for (let columnHead in row) {
			output += `<td>${row[columnHead]}</td>`;
		}
		output += "</tr>";
	});

	output += "</tbody></table>";
	html.innerHTML = output;

	// let output = "<table><tr>";
	// for (let columnHead in data[0]) {
	// 	output += `<th>${columnHead}</th>`;
	// }
	// output += "</tr>";

	// data.forEach((row) => {
	// 	output += "<tr>";
	// 	for (let columnHead in row) {
	// 		output += `<td>${row[columnHead]}</td>`;
	// 	}
	// 	output += "</tr>";
	// });

	// output += "</table>";
	// html.innerHTML = output;
}
