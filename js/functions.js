/**
 * Created by EyobWesterink on 01/02/2018.
 */
$(document).ready(function () {
    displayCart();
    function displayCart() {
        var cartArray = shoppingCart.listCart();
        //console.log(cartArray);
        var output = "";

        for (var i in cartArray) {
            output += "<li class='order-list'>"
                +" <img  class='item-image' height='100' width='100' src='"+cartArray[i].image+"' >"
                +cartArray[i].name
                +" <input class='item-size' type='text' value='"+cartArray[i].size+"' >"
                +" <input class='item-count' type='number' value='"+cartArray[i].count+"' >"
//                    +" x "+cartArray[i].price +" = "+cartArray[i].total
                +" <button class='plus-item' data-array="+i+">" + "+</button>"
                +" <button class='subtract-item' data-array="+i+">-</button>"
                +" <button class='delete-item' data-array="+i+">X</button>"
                +"</li><br>";
        }

        $("#show-cart").html(output);
        $("#count-cart").html(shoppingCart.countCart());

        $("#total-cart").html(shoppingCart.totalCart());
        $("#shipping-price").html(shipping.calculateShipping());
        $("#total-price").html( order.calculateTotalPrice());
    }




    $("#show-cart").on("click", ".delete-item", function(event){
        var cartArray = shoppingCart.listCart();
        var arrayNumber = $(this).attr('data-array');
        var name =  cartArray[arrayNumber].name;
        var size =  cartArray[arrayNumber].size;
        shoppingCart.removeItemFromCartAll(name,size);
        displayCart();
    });

    $("#show-cart").on("click", ".subtract-item", function(event){
        var cartArray = shoppingCart.listCart();
        var arrayNumber = $(this).attr('data-array');
        console.log(arrayNumber);
        var name =  cartArray[arrayNumber].name;
        var size =  cartArray[arrayNumber].size;
        shoppingCart.removeItemFromCart(name,size);
        displayCart();
    });

    $("#show-cart").on("click", ".plus-item", function(event){
        var cartArray = shoppingCart.listCart();
        var arrayNumber = $(this).attr('data-array');
        console.log(arrayNumber);
        var name =  cartArray[arrayNumber].name;
        var image =  cartArray[arrayNumber].image;
        var size =  cartArray[arrayNumber].size;
        var stock = cartArray[arrayNumber].stock;

//        console.log(name);
        shoppingCart.addItemToCart(name, image,size, 0,1,stock);
        displayCart();
    });

    $("#show-cart").on("change", ".item-count", function(event){
        var cartArray = shoppingCart.listCart();
        var arrayNumber = $(this).attr('data-array');
        var name =  cartArray[arrayNumber].name;
        var count =  cartArray[arrayNumber].count;
        shoppingCart.setCountForItem(name, count);
        displayCart();
    });




    $("#clear-cart").click(function(event){
        shoppingCart.clearCart();
        displayCart();
    });
});