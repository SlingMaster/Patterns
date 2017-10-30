

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



