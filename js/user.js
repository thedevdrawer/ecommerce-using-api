class User {
	constructor() {
		this.apiUrl = "https://fakestoreapi.com/";
	}

	getAccountInfo(user) {
		$("#username").val(user.username);
		$("#fname").val(user.name.firstname);
		$("#lname").val(user.name.lastname);
		$("#phone").val(user.phone);
		$("#email").val(user.email);
		$("#address").val(user.address.number + " " + user.address.street);
		$("#city").val(user.address.city);
		$("#zip").val(user.address.zipcode);
	}

	doLogin(username, password) {
		localStorage.clear();
		$.ajax({
			type: "GET",
			url: this.apiUrl + "users",
			success: function (data) {
				$(data).each(function (index, user) {
					if (user.username == username && user.password == password) {
						localStorage.setItem("user", JSON.stringify(user));
					}
				});
				if (localStorage.getItem("user") != null) {
					window.location.href = "/account.html";
				} else {
					$(".loginMsg").html(
						'<div class="alert alert-danger" role="alert">Your password or username is incorrect. Please try again.</div>'
					);
				}
			},
		});
	}
}
