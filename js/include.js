//This script injects the navigation bar and footer into every .html file
//that includes a <div id="nav-placeholder"></div> or <div id="footer-placeholder"></div>

//I still need to work the kinks with the footer changing position
//To see issue navigate to employee request form

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
