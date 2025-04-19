//This script allows the user to enter data into the search bar and filter data from the table

//additional updates are required to filter by data type.

const element = document.getElementById("searchBox");

function filterTable() {
	const input = document.getElementById("searchBox").value.toLowerCase();
	const rows = document.querySelectorAll("#output table tr");

	rows.forEach((row, index) => {
		if (index === 0) return;

		const text = row.textContent.toLowerCase();
		row.style.display = text.includes(input) ? "" : "none";
	});
}

element.onkeyup = filterTable;
