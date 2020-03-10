$(document).ready(function() {

    toggleIcon(); // show send button if text is keep on #message-input

    $('#message-input').focus(function () {
        toggleIcon(); // toggle send button when #message-input is focus
    });

// input search bar

    $(".input-bar-fake").click(function() {
    openInputMenu(); // open Input Menu
    });

    $(".input-bar i").click(function() {
        closeInputMenu(); // close Input Menu
    });

// messages sent/received

    $("#microphone").click(function() { //send message by pushing send button
        createMsg();
        toggleIcon();
    });

//send message by pushing 'enter'

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
            if ($(this).find('.chat-detail').text().toLowerCase().includes(type)) {
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
                chatLink(self); // update top bar right contents (timestamp etc)
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

function updateChatElement(fromElement,toElement) {
    $('.chat').each(function() {
        var dataNumbers = $(this).data('chat');
        // console.log(timeChat);
        var takeElementToOpenChat = $('.mss-scroll-bar[data-chat*='+ dataNumbers +']').find(fromElement).text();
        // console.log(timeStampOpenChat);
        var putElementToPreview = $('.chat[data-chat*='+ dataNumbers +']').find(toElement);
        // console.log(timeStampChat);
        if (takeElementToOpenChat != "") {
            putElementToPreview.text(takeElementToOpenChat);
        };
    });
};

function updatePreviews() {
    // update timestamp in chat-last-update
    updateChatElement('.message:last-child .timestamp','.chat-last-update');
    // update timestamp in preview-chat-open
    var timeStampOpenChatActive = $('.mss-scroll-bar.active').find('.message.received:last-child .timestamp').text();
    $('.preview-chat-open').text("last seen today at " + timeStampOpenChatActive);
    // update chat-preview
    updateChatElement('.message:last-child .mss-text','.chat-preview');
}

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
            updatePreviews();
            scrollLastItem('.mss-scroll-bar.active');
        }, 1000);
    };
};

function scrollLastItem(element) {
    var pixelScroll = $(element).prop('scrollHeight');
    $(element).scrollTop(pixelScroll);
};

function addRemoveClass(add,remove) {
    $(".input-bar").removeClass(remove);
    $(".input-bar").addClass(add);
}

function closeInputMenu() {
    addRemoveClass("hide","show")
    $("#contact-search").val('');
    $(".chat").removeClass("hide");
    $(".chat").addClass("show");
};

function openInputMenu() {
    addRemoveClass("show","hide")
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
