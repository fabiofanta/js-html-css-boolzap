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
            };
        });
    });

// select chat

    $('.chat').click(function() {
        var self = $(this);
        $('.mss-scroll-bar').each(function() {
            if ($(this).data('chat') == self.data('chat') ) {
                $('.mss-scroll-bar').removeClass('active');
                $(this).addClass('active');
                chatLink(self);
            };
        });
    });

// dropdown menu

    $(document).on('click','.mss-container i',function(event) {
        alternateOpening($(this).siblings('.dropdown-menu'),$('.dropdown-menu'),'open');
        event.stopPropagation();
        // console.log($(this).siblings('.dropdown-menu'),$('.dropdown-menu'),'open');
        scrollLastItem('.mss-scroll-bar.active');

    });

// dropdown closing by clicking the entire body tag

    $(document).on('click','body',function() {
        $('.dropdown-menu.open').toggleClass('open');
        // console.log($('.dropdown-menu.open').toggleClass('open'));
    });

// delete messages

    $(document).on('click','.mss-delete',function() {
        $(this).parents('.mss-container').hide();
    });

});


// functions

function timestamp() {
    $('.chat').each(function() {
        var dataNumbers = $(this).data('chat');
        // console.log(timeChat);
        var timeStampOpenChat = $('.mss-scroll-bar[data-chat*='+ dataNumbers +']').find('.message.received:last-child .timestamp').text();
        console.log(timeStampOpenChat);
        var timeStampChat = $('.chat[data-chat*='+ dataNumbers +']').find('.chat-last-update');
        // console.log(timeStampChat);
        if (timeStampOpenChat != "") {
            timeStampChat.text(timeStampOpenChat);
        };
    });
};

function alternateOpening(clickedSelector,selector,toggClass) {
    if (clickedSelector.hasClass(toggClass)) {
        clickedSelector.toggleClass(toggClass);
    } else {
        selector.removeClass(toggClass);
        clickedSelector.toggleClass(toggClass);
    };
};

function chatLink(position) {
    var chatInfoName = $(position).find('.chat-name').text();
    var chatInfoLastSeen = $(position).find('.chat-last-update').text();
    var chatInfoPic = $(position).find('.left-chat img').attr('src');
    // console.log(chatInfoPic);
    $('.name-chat-open').text(chatInfoName);
    $('.preview-chat-open').text("last seen today at " + chatInfoLastSeen);
    $('.left-chat-open img').attr("src",chatInfoPic);
};

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
            timestamp();
        }, 1000);
    };
};

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
