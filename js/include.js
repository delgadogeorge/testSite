window.addEventListener("DOMContentLoaded", function () {
	fetch("nav.html")
		.then(function (res) {
			return res.text();
		})

		.then(function (data) {
			document.getElementById("nav-placeholder").innerHTML = data;
		});

	fetch("footer.html")
		.then(function (res) {
			return res.text();
		})

		.then(function (data) {
			document.getElementById("footer-placeholder").innerHTML = data;
		});
});
