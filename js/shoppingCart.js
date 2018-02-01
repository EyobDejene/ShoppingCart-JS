// ***************************************************
// Shopping Cart functions

var shoppingCart = (function () {
    // Private methods and properties
    var cart = [];

    function Item(name, image, size, count, price, stock) {
        this.name = name
        this.image = image
        this.price = price
        this.count = count
        this.size = size
        this.stock = stock
    }

    function saveCart() {
        localStorage.setItem("shoppingCart", JSON.stringify(cart));
    }

    function loadCart() {
        cart = JSON.parse(localStorage.getItem("shoppingCart"));
        if (cart === null) {
            cart = []
        }
    }

    loadCart();

    // Public methods and properties
    var obj = {};
    obj.addItemToCart = function (name, image, size, count, price, stock) {


        for (var i in cart) {

            if (cart[i].name === name && cart[i].size === size) {

                var cartCount = cart[i].count;
                if (cartCount + 1 <= stock) {

                    // console.log(cartCount);
                    cart[i].count += 1;
                    cart[i].size = size;

                    // console.log('hier '+ count);
                    saveCart();
                    return;
                } else {
                    console.log('more than stock');
                    return;
                }
            }
        }
        //console.log('size '+size);
        //console.log("addItemToCart:", name, image,size, count,price,stock);
        var item = new Item(name, image, size, count, price, stock);
        cart.push(item);
        saveCart();
    };

    obj.setCountForItem = function (name, image, size, count, price, stock) {
        for (var i in cart) {
            if (cart[i].name === name && cart[i].size === size) {

                cart[i].count = count;
                cart[i].stock = stock;

                break;
            }
        }
        saveCart();
    };


    obj.removeItemFromCart = function (name, size) { // Removes one item
        for (var i in cart) {
            if (cart[i].name === name && cart[i].size === size) { // "3" === 3 false
                cart[i].count--; // cart[i].count --
                if (cart[i].count === 0) {
                    cart.splice(i, 1);
                }
                break;
            }
        }
        saveCart();
    };


    obj.removeItemFromCartAll = function (name, size) { // removes all item name
        for (var i in cart) {
            if (cart[i].name === name && cart[i].size === size) {
                cart.splice(i, 1);
                break;
            }
        }
        saveCart();
    };


    obj.clearCart = function () {
        cart = [];
        saveCart();
    }


    obj.countCart = function () { // -> return total count
        var total = 0;
        for (var i in cart) {
            total += cart[i].count;
        }

        // console.log('total '+total);
        return total;
    };

    obj.totalCart = function () { // -> return total cost
        var totalCost = 0;
        for (var i in cart) {
            totalCost += cart[i].price * cart[i].count;

        }
        //console.log(totalCost);
        return totalCost.toFixed(2);
    };

    obj.listCart = function () { // -> array of Items
        var cartCopy = [];
        // console.log("Listing cart");
        //console.log(cart);
        for (var i in cart) {
            // console.log(i);
            var item = cart[i];
            var itemCopy = {};
            for (var p in item) {
                itemCopy[p] = item[p];
            }
            itemCopy.total = (item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy);
        }
        return cartCopy;
    };

    // ----------------------------
    return obj;


})();


//calculate shippingcost
var shipping = (function () {
    var shipping = {};
    shipping.calculateShipping = function () {
        var country = 'NL';
        var price = 0;

        if (shoppingCart.countCart() > 0) {
            price = 12;
        }

        var shipping = new Object();
        shipping.country = country;
        shipping.price = price;

        // Put the object into storage
        localStorage.setItem('shippingCost', JSON.stringify(shipping));

        // Retrieve the object from storage
        var shippingObject = JSON.parse(localStorage.getItem('shippingCost'));
        var shippingPrice = 0;
        for (var i in shippingObject) {
            shippingPrice = shippingObject.price;
        }


        return shippingPrice;

    };
    return shipping;
})
();


//calculate total price
var order = (function () {
    var order = {};
    order.calculateTotalPrice = function () {
        var totalPrice = Number(shoppingCart.totalCart()) + Number(shipping.calculateShipping());
        return totalPrice.toFixed(2);
    };
    return order;
})
();


//display Cart
//and add product to cart
$(document).ready(function () {
    displayitemsCart();
    $(".add-to-cart").click(function (event) {
        event.preventDefault();
        var name = $(this).attr("data-product");
        var image = $(this).attr("data-image");
        var price = Number($(this).attr("data-price"));
        var size = $(".size").val();

        var stock = Number($('.size option:selected').attr("data-stock"));
        console.log('stock ' + stock);

        shoppingCart.addItemToCart(name, image, size, 1, price, stock);
        //displayCart();
        displayitemsCart();

    });

    $("#clear-cart").click(function (event) {
        shoppingCart.clearCart();
        displayitemsCart();
        //displayCart();
    });


    function displayitemsCart() {
        //console.log(shoppingCart.countCart());
        var stock = $('.size option:selected').attr("data-stock");
        $('#count-cart').html('(' + shoppingCart.countCart(stock) + ')');
    }

});







