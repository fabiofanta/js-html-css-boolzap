$(document).ready(function() {

    toggleIcon();

    $('#message-input').focus(function () {
        toggleIcon();
    });

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
        toggleIcon();
    });

    $("#message-input").keyup(function(event) {
        toggleIcon();
        if (event.keyCode == 13) {
            createMsg();
            toggleIcon();
    };
    });

// input search bar filter

    $("#contact-search").keyup(function(event) {
        var type = $(this).val().toLowerCase();
        // console.log(type);
        $('.chat').removeClass("hide show");
        $('.chat').each(function() {
            // console.log($(this).text());
            if ($(this).find('.chat-name').text().toLowerCase().includes(type)) {
                $(this).addClass("show");
            } else {
                $(this).addClass("hide");
            }
        });
    });
// select chat
    $('.chat').click(function() {
        var self = $(this);
        $('.mss-scroll-bar').each(function() {
            if ($(this).data('chat') == self.data('chat') ) {
                $('.mss-scroll-bar').removeClass('active');
                $(this).addClass('active');
            }
        })
    })
});

function toggleIcon() {
    if ($('#message-input').val().length > 0 ) {
        $('#microphone').removeClass('fas fa-microphone');
        $('#microphone').addClass('fas fa-paper-plane');
        // console.log($('#message-input').val().length);
    } else {
        $('#microphone').removeClass('fas fa-paper-plane');
        $('#microphone').addClass('fas fa-microphone');
    };
};


function messagesSender(sentReceived,text) {
    var timer = time();
    var message = $('.template .message').clone();
    message.addClass(sentReceived);
    message.find('.mss-text').text(text);
    message.find('.timestamp').text(timer);
    $(".mss-scroll-bar.active").append(message);
};

function createMsg() {
    var nomeInput = $("#message-input").val().trim();
    $("#message-input").val('');
    if (nomeInput !='') {
        messagesSender("sent",nomeInput);
        scrollLastItem('.mss-scroll-bar.active');
        setTimeout(function () {
            messagesSender("received","Ok");
            scrollLastItem('.mss-scroll-bar.active');
        }, 1000);
    }
}

function scrollLastItem(element) {
    var pixelScroll = $(element).prop('scrollHeight');
    $(element).scrollTop(pixelScroll);
};

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
