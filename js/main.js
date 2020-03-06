$(document).ready(function() {

// input search bar

    $(".input-bar i").click(function() {
        addRemoveClass();
    });

    $(".input-bar-fake").click(function() {
        addRemoveClassSelect();
    });

// messages sent/received

    $("#microphone").click(function() {
        createMsg();
    });

    $("#message-input").keypress(function(event) {
        if (event.keyCode == 13) {
            createMsg();
    };
    });

// input search bar filter

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

function messagesSender(sentReceived,text) {
    var timer = time();
    var message = $('.template .message').clone();
    message.addClass(sentReceived);
    message.find('.mss-text').text(text);
    message.find('.timestamp').text(timer);
    $(".mss-scroll-bar").append(message);
};

function createMsg() {
    var nomeInput = $("#message-input").val().trim();
    $("#message-input").val('');
    if (nomeInput !='') {
        messagesSender("sent",nomeInput);
        setTimeout(function () {
            messagesSender("received","Ok");
        }, 1000);
    }

}

function addRemoveClass() {
    $(".input-bar").removeClass("show");
    $(".input-bar").addClass("hide");
};

function addRemoveClassSelect() {
    $(".input-bar").removeClass("hide");
    $(".input-bar").addClass("show");
    $("#contact-search").focus();
};

function time() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();

    if (minutes < 10) {
        var hoursMinutes = hours + ":" + 0 + "" + minutes;
    } else {
        var hoursMinutes = hours + ":" + minutes;
    };

    return hoursMinutes;
};
