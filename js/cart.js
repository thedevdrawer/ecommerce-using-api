class Cart {
	constructor() {
		this.apiUrl = "https://fakestoreapi.com/";
	}

	getCart(userID) {
		var i = 0;
		var apiUrl = this.apiUrl;
		var count = 0;
		var carts = [];
		$.ajax({
			type: "GET",
			url: apiUrl + "carts/user/" + userID,
			success: function (data) {
				$(data).each(function (index, cart) {
					count += cart.products.length;
					$(cart.products).each(function (index, products) {
						var singleProduct = {};
						$.ajax({
							type: "GET",
							url: apiUrl + "products/" + products.productId,
							success: function (product) {
								//console.log(product);
								singleProduct["productId"] = product.id;
								singleProduct["productURL"] =
									"/product.html?productid=" + product.id;
								singleProduct["title"] = product.title;
								singleProduct["price"] = product.price;
								singleProduct["image"] = product.image;
								carts.push(singleProduct);
								localStorage.setItem("cart", JSON.stringify(carts));
							},
						});
					});
				});
				localStorage.setItem("cartCount", count);
				$("span.cartCount.badge").html(count);
			},
		});
	}

	getSingleProductCart(id) {
		$.ajax({
			type: "GET",
			url: this.apiUrl + "products/" + id,
			success: function (data) {
				console.log(data);
			},
		});
	}

	getCartDisplay(products) {
		var price = 0;
		$(products).each(function (index, product) {
			price += product.price;
			$(".cartDisplay").prepend(
				'<li class="list-group-item d-flex justify-content-between lh-sm"><img src="' +
					product.image +
					'" class="img-thumbnail" style="max-width:50px;"><div><h6>' +
					product.title +
					'</h6></div> <span class="text-muted">$' +
					product.price.toFixed(2) +
					"</span> </li>"
			);
		});
		$(".price").html(price);
	}
}
