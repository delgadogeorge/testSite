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
  document.querySelectorAll(".dropdown-item").forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const filterVal = this.getAttribute("data-filter");
      filterTablebyType(filterVal);
    });
  });
});

function filterTablebyType(filterVal) {
  const rows = document.querySelectorAll("#output table tbody tr");
  rows.forEach((row) => {
    const eventTypeCell = row.cells[3];
    const sourceCell = row.cells[1];
    if (!sourceCell || !eventTypeCell) return;

    const isForcedDoor = eventTypeCell.textContent
      .trim()
      .toLowerCase()
      .includes("forced");
    const isNullType = sourceCell.textContent.toLowerCase() === "null";

    if (filterVal === "Null") {
      row.style.display = isNullType ? "" : "none";
    } else if (filterVal === "Forced Door") {
      row.style.display = isForcedDoor ? "" : "none";
    } else if (filterVal === "Valid") {
      if (!isNullType && !isForcedDoor) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    } else {
      //show all
      row.style.display = "";
    }
  });
}

function formatDateTime(rawDateTime) {
  const pad = (n) => n.toString().padStart(2, "0");

  let date;
  if (typeof rawDateTime === "number") {
    //Excel stores raw data as numbers from 1900
    //25569 is the days between 1/1/1900 and start of unix epoch (1/1/70)
    //Value is then converted to milliseconds and then used to create new JS data object
    date = new Date(Math.round((rawDateTime - 25569) * 86400 * 1000));
    local_dt = new Date(date.getTime() + date.getTimezoneOffset() * 60000); //shift from UTC to local
  } else {
    return rawDateTime;
  }

  const MM = pad(local_dt.getMonth() + 1);
  const DD = pad(local_dt.getDate());
  const YYYY = local_dt.getFullYear();

  const HH = pad(local_dt.getHours());
  const mm = pad(local_dt.getMinutes());
  const ss = pad(local_dt.getSeconds());
  return `${MM}/${DD}/${YYYY} ${HH}:${mm}:${ss}`;
}

function inferType(val) {
  //helper function for table sorting
  const trimmed = String(val).trim();

  //check for Date
  if (trimmed.includes(": ") || trimmed.includes("/")) {
    const date = new Date(trimmed);
    if (!isNaN(date.getTime())) {
      return date.getTime();
    }
  }
  //check for number
  const num = Number(trimmed);
  if (!isNaN(num)) {
    return num;
  }
  //check for string (default)
  return trimmed.toLowerCase();
}

//functionality to sort table by selected column header
document.addEventListener("click", function (e) {
  if (!e.target.matches("th.sortable")) return;

  const table = e.target.closest("table");
  const tbody = table.querySelector("tbody");
  const index = [...e.target.parentNode.children].indexOf(e.target);
  const ascending = e.target.classList.toggle("asc");
  const rows = Array.from(tbody.querySelectorAll("tr"));

  rows.sort((a, b) => {
    const aVal = inferType(a.cells[index]?.textContent || "");
    const bVal = inferType(b.cells[index]?.textContent || "");

    if (aVal > bVal) return ascending ? 1 : -1;
    if (aVal < bVal) return ascending ? -1 : 1;
    return 0;
  });

  rows.forEach((row) => tbody.appendChild(row));
});
