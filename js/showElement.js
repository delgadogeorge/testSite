document.addEventListener("DOMContentLoaded", function () {
	const input = document.getElementById("excelFile");
	const toggleBtn = document.getElementById("toggleBtn");
	const element = document.getElementById("show");

	toggleBtn.disabled = true;

	input.addEventListener("change", function (event) {
		if (input.files.length > 0) {
			toggleBtn.disabled = false;

			toggleBtn.addEventListener("click", function () {
				if (!element) {
					console.error("Element with ID 'show' not found");
					alert("Element with ID 'show' not found.");
					return;
				}

				element.style.display =
					element.style.display === "none" || element.style.display === ""
						? "flex"
						: "none";
			});
		}
	});
});
