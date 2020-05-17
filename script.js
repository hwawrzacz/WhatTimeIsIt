$(document).ready(function () {
	const rot = (360 / 60);
	var rotationTimeout;

	var date = new Date();
	var rotationSec = date.getSeconds() * rot;
	var rotationMin = (date.getMinutes() + date.getSeconds() / 60) * rot;
	var rotationHour = (date.getHours() % 12 + date.getMinutes() / 60) * (360 / 12);

	$("#sec-hand").css("transform", "rotate(" + rotationSec + "deg)");
	$("#min-hand").css("transform", "rotate(" + rotationMin + "deg)");
	$("#hour-hand").css("transform", "rotate(" + rotationHour + "deg)");

	function rotateSecMin() {
		rotationSec += rot;
		rotationMin += rot / 60;
		$("#sec-hand").css("transform", "rotate(" + rotationSec + "deg)");
		$("#min-hand").css("transform", "rotate(" + rotationMin + "deg)");
		rotationTimeout = setTimeout(rotateSecMin, 1000);
	}

	function rotateHour() {
		rotationHour += rot / 60;
		$("#hour-hand").css("transform", "rotate(" + rotationHour + "deg)");
		rotationTimeout = setTimeout(rotateHour, 60000);
	}

	rotateSecMin();
	rotateHour();
});