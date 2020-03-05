$(document).ready(function() {

    $(".input-bar i").click(function() {  // input search bar
        $(".input-bar").removeClass("show");
        $(".input-bar").addClass("hide");
    });
    $(".input-bar-fake").click(function() {
        $(".input-bar").removeClass("hide");
        $(".input-bar").addClass("show");
        $("#contact-search").select();
    })

    $("#microphone").click(function() {  // messages sent
        var nomeInput = $("#message-input").val();
        $("#message-input").val('');
        var timer = time();

        var messageSent = $('.template .message.sent').clone();
        messageSent.find('.testo-messaggio').text(nomeInput);
        messageSent.find('.orario').text(timer);
        $(".mss-scroll-bar").append(messageSent);
        setTimeout(function() {  // messages received
            var messageReceived = $('.template .message.received').clone();
            messageReceived.find('.testo-messaggio').text("Ok");
            messageReceived.find('.orario').text(timer);
            $(".mss-scroll-bar").append(messageReceived);
        },1000);
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

function time() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var hoursMinutes = hours + ":" + minutes;
    return hoursMinutes;
}
