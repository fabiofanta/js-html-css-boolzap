$(document).ready(function() {

    $(".input-bar i").click(function() {  // input search bar
        addRemoveClass();
    });

    $(".input-bar-fake").click(function() {
        addRemoveClassSelect();
    });

    var timer = time();

    $("#microphone").click(function() {
        sentMessages(); // messages sent
        receivedMessages(); // messages received
    });

    $("#contact-search").keyup(function(event) {
        var type = $(this).val().toLowerCase();
        console.log(type);
        $('.chat').removeClass("hide show");
        $(".chat-name").each(function() {
            console.log($(this).text());
            if ($(this).text().toLowerCase().includes(type)) {
                $(this).parents('.chat').addClass("show");
            } else {
                $(this).parents('.chat').addClass("hide");
            }
        })
    })
});

function sentMessages() {
    var nomeInput = $("#message-input").val();
    $("#message-input").val('');
    var timer = time();
    var messageSent = $('.template .message.sent').clone();
    messageSent.find('.testo-messaggio').text(nomeInput);
    messageSent.find('.orario').text(timer);
    $(".mss-scroll-bar").append(messageSent);
};

function receivedMessages() {
    setTimeout(function() {
        var timer = time();
        var messageReceived = $('.template .message.received').clone();
        messageReceived.find('.testo-messaggio').text("Ok");
        messageReceived.find('.orario').text(timer);
        $(".mss-scroll-bar").append(messageReceived);
    },1000);
}

function addRemoveClass() {
    $(".input-bar").removeClass("show");
    $(".input-bar").addClass("hide");
};

function addRemoveClassSelect() {
    $(".input-bar").removeClass("hide");
    $(".input-bar").addClass("show");
    $("#contact-search").select();
};

function time() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var hoursMinutes = hours + ":" + minutes;
    return hoursMinutes;
};
