// var module = {
//     counter:0,
//     incrementCounter: function(){
//         return ++this.counter;

//     },
//     resetCounter: function(){
//         return this.counter = 0;
//     }
// };

// var module = (function() {
//     var counter = 0,
//         module = {};


//     return { 
//         incrementCounter: function() {
//         return ++counter;
//         },
//         resetCounter: function() {
//             return counter = 0;
//         },
//         getCounter: function() {
//             return counter;
//         }
//     }

// })(jQuery, _);

// var module = (function () {
//     var counter = 0,
//         module = {};

//     module.incrementCounter = function () {
//         return ++counter;
//     };
//     module.resetCounter = function () {
//         return counter = 0;
//     };
//     module.getCounter = function () {
//         return counter;
//     };
//     return module;

// })();

// var Basket = (function () {
//     var sum = 0;
//     var goods = [];
//     return {
//         addProduct: function (product) {
//             sum += product.price;
//             goods.push(product);
//             console.log('sum', sum, product.name);

//         },
//         printProduct: function () {
//             for (var i = 0; i < goods.length; i++) {
//                 console.log(goods[i].name, goods[i].price);
//             }

//         },
//         printSum: function () {

//             console.log("Sum:", sum);

//         }
//     };
// })();

// var sault = {
//     name: "соль",
//     price: 20
// };
// var per = {
//     name: "перец",
//     price: 60
// };
// Basket.addProduct(sault);
// Basket.addProduct(per);
// Basket.addProduct(sault);
// Basket.printProduct();
// Basket.printSum();
// console.log("-------------------");

// function singleton(){
//     var instance = this;
// }
// var s1 = new singleton();
// var s2 = new singleton();
// console.log(s1 === s2);

// var Singleton = (function () {
//     var instance;
//     var SERVER = "localhost";
//     function singleton() {
//         if (!instance) {
//             instance = this;
//         } else {
//             return instance;
//         }
//     }
//     singleton.prototype.connect = function () {
//         console.log("connect : " + SERVER);
//     }
//     return singleton;
// })();

// var s1 = new Singleton();
// var s2 = new Singleton();
// console.log(s1 === s2);
// s1.connect();
// s2.connect();

// console.log("-------------------");
// console.log("Observer");
// //  Observable
// function Observable() {
//     var observers = [];
//     this.sendMassage = function (msg) {
//         for (var i = 0, len = observers.length; i < len; i++) {
//             observers[i].notify(msg);
//         };
//     }
//     this.addObserver = function (observer) {
//         observers.push(observer);
//     }
// }

//  [Observer]
// function Observer(behavior) {
//    this.notify = function (msg){
//        behavior(msg);
//    }
// }
// var observable = new Observable();
// var obs1 = new Observer(function(msg) {console.log(msg)});
// var obs2 = new Observer(function(msg) {alert(msg)});
// observable.addObserver(obs1);
// observable.addObserver(obs2);
// setTimeout(function() {observable.sendMassage("time : " + new Date())

// }, 3000);




//  Observable
function Observable() {
    var observers = [];
    this.sendMessage = function (msg) {

        for (var i = 0, len = observers.length; i < len; i++) {
            //console.info(i, observers[i]);
            console.log(i, "Observable", msg, observers[i]);
            observers[i].notify(msg);
        }
    };

    this.addObserver = function (observer) {
        observers.push(observer);
        console.log("observers", observer, observers);
    };
}

// [Observer]
function Observer(behavior) {
    this.notify = function (msg) {
        behavior(msg);
    };
}

var basketObs = new Observer(function (id) {
    // $(".basket_products-list").append("<li>" + id + "</li>");
    $(".basket_products-list").append(
        $('<li></li>')
            .addClass('basket_product').text('Товар ' + id)

    );
    console.info('Товар ' + id)
});

var modalObs = new Observer(function (id) {
    var msg = 'Товар ' + id + ' добавлен в корзину!';
    $('.buy-modal_message').text(msg);
    $('.buy-modal').removeClass('buy-modal_hide');
    console.log("msg : " + msg);
    setTimeout(function () {
        $('.buy-modal').addClass('buy-modal_hide');
    }, 2000);

});

var serverObs = new Observer(function (id) {
    console.log("id : " + id);
});

var observable = new Observable();

observable.addObserver(modalObs);
observable.addObserver(serverObs);
observable.addObserver(basketObs);

window.onload = function () {
    $('.product').click(
        function () {
            var id = $(this).attr('data-id');
            console.log("Click product | id : " + id);
            observable.sendMessage(id);

        }
    );
}



