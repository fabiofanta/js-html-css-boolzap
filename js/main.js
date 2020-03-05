$(document).ready(function() {
    $("#microphone").click(function () {
        var nomeInput = $("#message-input").val();
        $("message-input").val('');

        var messaggio = $('.template .message.sent').clone();
        messaggio.find('.testo-messaggio').text(nomeInput);
        messaggio.find('.orario').text('05.05');
        $(".mss-scroll-bar").append(messaggio);
    });

});
