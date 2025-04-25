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

//functionality to sort data by Type (Valid, Null, Forced Door, Show All)
window.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll(".dropdown-item").forEach(item => {
		item.addEventListener('click', function(e) {
			e.preventDefault();
			const filterVal = this.getAttribute("data-filter");
			filterTablebyType(filterVal);
		});
	});
});

function filterTablebyType(filterVal){
	const rows = document.querySelectorAll("#output table tbody tr");
	rows.forEach(row => {
		const eventTypeCell = row.cells[3];
		const sourceCell = row.cells[1];
		if(!sourceCell || !eventTypeCell) return;

		const isForcedDoor = eventTypeCell.textContent.trim().toLowerCase().includes("forced");
		const isNullType = sourceCell.textContent.toLowerCase() === "null";

		if(filterVal === "Null"){
			row.style.display = isNullType ? "" : "none";
		} else if (filterVal === "Forced Door") {
			row.style.display = isForcedDoor ? "" : "none";
		} else if (filterVal === "Valid") {
			if(!isNullType && !isForcedDoor){
				row.style.display = "";
			} else {
				row.style.display= "none";
			}
		} else { //show all
			row.style.display = "";	
		}
	});
}

function formatDateTime(rawDateTime) {
	const date = new Date(rawDateTime);

	if(isNaN(date.getTime())) return rawDateTime; //return orginal Date/Time string if unable to convert to Date object

	const pad = (n) => n.toString().padStart(2, "0");

	const MM = pad(date.getMonth() + 1);
	const DD = pad(date.getDate());
	const YYYY = date.getFullYear();

	const HH = pad(date.getHours());
	const mm = pad(date.getMinutes());
	const ss = pad(date.getSeconds());

	return `${MM}/${DD}/${YYYY} ${HH}:${mm}:${ss}`;
}