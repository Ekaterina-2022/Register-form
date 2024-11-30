const regBtn = document.querySelector("#regButton");
const first_name = document.getElementById("firstName");
const last_name = document.getElementById("lastName");
const yourCountry = document.getElementById("country");
const yourJob = document.getElementById("job");
const yourSchool = document.getElementById("school");
const yourEmail = document.getElementById("eadress");
const yourPassword = document.getElementById("password");
const page = document.querySelector("#containerMain");
const errorBanner = document.querySelector("#errorBanner");
let obj = {};

yourPassword.addEventListener("input", (e) => {
	if (yourPassword.value.length < 6) {
		yourPassword.style.backgroundColor = "#9d5f5f";
	} else {
		yourPassword.style.backgroundColor = "#f2f2f2";
	}
});

regBtn.addEventListener("click", checkAll);
regBtn.addEventListener("click", function (e) {
	if (!testPassword(yourPassword)) {
		errorBanner.textContent = "Invalid password";
	} else {
		errorBanner.textContent = "";
	}
});

function testPassword(password) {
	let isValid;
	let regPattern = new RegExp(
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\W]).{6,}/
	);

	if (!regPattern.test(password.value) || password.value === "") {
		isValid = false;
	} else {
		isValid = true;
	}

	return isValid;
}

function checkValidity(input) {
	let errors = [];
	let validity = input.validity;

	if (validity.tooLong) {
		errors.push("Invalid input:  " + input.name);
	}

	if (!validity.valid) {
		errors.push("Invalid input:  " + input.name);
	}

	return errors;
}

function checkAll() {
	let errorMessage = document.createElement("div");
	let inputs = [...document.querySelectorAll(".input")];
	let errArr = [];

	inputs.forEach((input) => {
		let a = checkValidity(input);
		if (a.length) {
			errArr.push(a);
		}
	});

	errorMessage.innerHTML = "Please fill in all fields below<br>";
	errorMessage.insertAdjacentHTML("beforeend", errArr.join("<br>"));
	errorMessage.classList.add("show-error");

	page.append(errorMessage);
	setTimeout(() => errorMessage.remove(), 5000);
}

regBtn.addEventListener("click", function userData(e) {
	e.preventDefault();
	let inputAll = Array.from(document.querySelectorAll("form input"));

	for (const input of inputAll) {
		obj[input.id] = input.value;
	}
	fetch("https://httpbin.org/post", {
		method: "POST",
		body: JSON.stringify(obj),
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
	})
		.then((response) => response.json())
		.then((obj) => {
			console.log(obj);
		})
		.catch((error) => console.log(error));
});
