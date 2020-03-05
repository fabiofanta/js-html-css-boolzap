$(document).ready(function() {
    $("#microphone").click(function () {
        var nomeInput = $("#message-input").val();
        $("#message-input").val('');
        var timer = time();

        var messaggio = $('.template .message.sent').clone();
        messaggio.find('.testo-messaggio').text(nomeInput);
        messaggio.find('.orario').text(timer);
        $(".mss-scroll-bar").append(messaggio);
    });

});

function time() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var hoursMinutes = hours + ":" + minutes;
    return hoursMinutes;
}
