let allFiles = [];

document.addEventListener("DOMContentLoaded", function () {
	const dropZone = document.querySelector(".drop-zone");
	const fileInput = document.getElementById("excelFile");
	const fileListDisplay = document.getElementById("file-list");

	// Prevent browser default behavior globally
	["dragenter", "dragover", "dragleave", "drop"].forEach((event) => {
		window.addEventListener(event, (e) => {
			e.preventDefault();
			e.stopPropagation();
		});
	});

	// Open file dialog when dropZone is clicked
	dropZone.addEventListener("click", () => fileInput.click());

	// Drag styling
	dropZone.addEventListener("dragover", () =>
		dropZone.classList.add("dragover")
	);
	dropZone.addEventListener("dragleave", () =>
		dropZone.classList.remove("dragover")
	);

	// Handle file drop
	dropZone.addEventListener("drop", (e) => {
		dropZone.classList.remove("dragover");
		if (e.dataTransfer.files.length > 0) {
			handleFiles(e.dataTransfer.files);
		}
	});

	// Handle file input selection
	fileInput.addEventListener("change", () => {
		if (fileInput.files.length > 0) {
			handleFiles(fileInput.files);
		}
	});

	// Main handler to process and store files
	function handleFiles(newFiles) {
		const fileArray = Array.from(newFiles);

		const existingFileNames = new Set(allFiles.map((f) => f.name));
		const newUniqueFiles = fileArray.filter(
			(file) => !existingFileNames.has(file.name)
		);

		allFiles = allFiles.concat(newUniqueFiles);

		// Show the list of file names
		fileListDisplay.innerHTML = allFiles
			.map((file) => `<div>${file.name}</div>`)
			.join("");

		// Optional: trigger your processing logic
		if (typeof processExcelFiles === "function") {
			processExcelFiles(allFiles);
		}
	}

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
});
