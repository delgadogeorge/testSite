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
	html.innerHTML = output;
}
