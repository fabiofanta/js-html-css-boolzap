$(document).ready(function() {

    var source = $('#template').html();
    var template = Handlebars.compile(source);

    // objects

    var alfonso = {name:'Alfonso',lastSeen:'10:26',src:'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortRound&accessoriesType=Wayfarers&hairColor=Black&facialHairType=MoustacheMagnum&facialHairColor=Red&clotheType=BlazerSweater&clotheColor=PastelRed&eyeType=Happy&eyebrowType=RaisedExcited&mouthType=Serious&skinColor=Light', data:'1'};
    var tommaso = {name:'Tommaso',lastSeen:'09:15',src:'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Round&hairColor=Brown&facialHairType=Blank&clotheType=Overall&clotheColor=PastelYellow&eyeType=WinkWacky&eyebrowType=DefaultNatural&mouthType=Concerned&skinColor=Brown', data:'2'};
    var claudia = {name:'Claudia',lastSeen:'16:23',src:'https://avataaars.io/?avatarStyle=Circle&topType=LongHairBob&accessoriesType=Sunglasses&hatColor=PastelBlue&hairColor=PastelPink&facialHairType=MoustacheMagnum&facialHairColor=BrownDark&clotheType=GraphicShirt&clotheColor=Heather&graphicType=Cumbia&eyeType=Wink&eyebrowType=UpDownNatural&mouthType=ScreamOpen&skinColor=Pale', data:'3'};
    var antonio = {name:'Antonio',lastSeen:'10:11',src:'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortWaved&accessoriesType=Round&hairColor=BrownDark&facialHairType=MoustacheMagnum&facialHairColor=Red&clotheType=BlazerSweater&eyeType=Hearts&eyebrowType=RaisedExcitedNatural&mouthType=Grimace&skinColor=Light', data:'4'};
    var boss = {name:'Boss',lastSeen:'21:18',src:'https://avataaars.io/?avatarStyle=Circle&topType=LongHairBob&accessoriesType=Prescription01&hairColor=Blonde&facialHairType=BeardLight&facialHairColor=Blonde&clotheType=ShirtScoopNeck&clotheColor=Black&eyeType=WinkWacky&eyebrowType=UpDownNatural&mouthType=Vomit&skinColor=Pale', data:'5'};
    var erika = {name:'Erika',lastSeen:'15:23',src:'https://avataaars.io/?avatarStyle=Circle&topType=Turban&accessoriesType=Prescription01&hatColor=Blue03&hairColor=Platinum&facialHairType=Blank&facialHairColor=Black&clotheType=ShirtCrewNeck&clotheColor=PastelOrange&eyeType=Cry&eyebrowType=RaisedExcitedNatural&mouthType=Tongue&skinColor=Pale', data:'6'};
    var paola = {name:'Paola',lastSeen:'11:11',src:'https://avataaars.io/?avatarStyle=Circle&topType=LongHairBob&accessoriesType=Prescription02&hatColor=Blue02&hairColor=PastelPink&facialHairType=Blank&clotheType=GraphicShirt&clotheColor=Heather&graphicType=Skull&eyeType=Cry&eyebrowType=FlatNatural&mouthType=Serious&skinColor=Yellow', data:'7'};
    var fabio = {name:'Fabio',lastSeen:'18:21',src:'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortWaved&accessoriesType=Kurt&hairColor=Auburn&facialHairType=BeardMedium&facialHairColor=BlondeGolden&clotheType=Hoodie&clotheColor=Red&graphicType=Hola&eyeType=Happy&eyebrowType=UpDown&mouthType=Concerned&skinColor=Brown', data:'7'};
    var andrea = {name:'Andrea',lastSeen:'16:23',src:'https://avataaars.io/?avatarStyle=Circle&topType=LongHairBun&accessoriesType=Kurt&hairColor=Red&facialHairType=BeardMagestic&facialHairColor=Auburn&clotheType=Overall&clotheColor=Heather&eyeType=Side&eyebrowType=Angry&mouthType=Disbelief&skinColor=Brown', data:'8'};
    var roberto = {name:'Roberto',lastSeen:'21:18',src:'https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight2&accessoriesType=Sunglasses&hairColor=Red&facialHairType=BeardMedium&facialHairColor=Red&clotheType=GraphicShirt&clotheColor=Gray01&graphicType=Hola&eyeType=Default&eyebrowType=RaisedExcitedNatural&mouthType=Smile&skinColor=Pale', data:'9'};
    var users = [alfonso, tommaso,claudia,antonio,boss,erika,paola,fabio,andrea,roberto];

    // end objects

    //handlebars message creation template


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
        var messageContent = { mssText:text, timestamp:timer, messageClass:sentReceived };
        var message = template(messageContent);
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


});
