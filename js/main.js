$(document).ready(function() {

    //handlebars message creation template

    var source = $('#template').html();
    var template = Handlebars.compile(source);
    var sourceLeftChat = $('#template-leftchat').html();
    var templateLeftChat = Handlebars.compile(sourceLeftChat);


    // objects

    var alfonso = {name:'Alfonso',lastSeen:'10:26',src:'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortRound&accessoriesType=Wayfarers&hairColor=Black&facialHairType=MoustacheMagnum&facialHairColor=Red&clotheType=BlazerSweater&clotheColor=PastelRed&eyeType=Happy&eyebrowType=RaisedExcited&mouthType=Serious&skinColor=Light', data:0, message:[{mssText:'Ciao,come stai?',timestamp:'05:12',messageClass:'sent'}]};
    var tommaso = {name:'Tommaso',lastSeen:'09:15',src:'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Round&hairColor=Brown&facialHairType=Blank&clotheType=Overall&clotheColor=PastelYellow&eyeType=WinkWacky&eyebrowType=DefaultNatural&mouthType=Concerned&skinColor=Brown', data:1,message:[{mssText:'Ciao',timestamp:'06:12',messageClass:'sent'}]};
    var claudia = {name:'Claudia',lastSeen:'16:23',src:'https://avataaars.io/?avatarStyle=Circle&topType=LongHairBob&accessoriesType=Sunglasses&hatColor=PastelBlue&hairColor=PastelPink&facialHairType=MoustacheMagnum&facialHairColor=BrownDark&clotheType=GraphicShirt&clotheColor=Heather&graphicType=Cumbia&eyeType=Wink&eyebrowType=UpDownNatural&mouthType=ScreamOpen&skinColor=Pale', data:2,message:[{mssText:'Come stai?',timestamp:'07:12',messageClass:'sent'}]};
    var antonio = {name:'Antonio',lastSeen:'10:11',src:'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortWaved&accessoriesType=Round&hairColor=BrownDark&facialHairType=MoustacheMagnum&facialHairColor=Red&clotheType=BlazerSweater&eyeType=Hearts&eyebrowType=RaisedExcitedNatural&mouthType=Grimace&skinColor=Light', data:3,message:[{mssText:'A domani!',timestamp:'08:12',messageClass:'sent'}]};
    var boss = {name:'Boss',lastSeen:'21:18',src:'https://avataaars.io/?avatarStyle=Circle&topType=LongHairBob&accessoriesType=Prescription01&hairColor=Blonde&facialHairType=BeardLight&facialHairColor=Blonde&clotheType=ShirtScoopNeck&clotheColor=Black&eyeType=WinkWacky&eyebrowType=UpDownNatural&mouthType=Vomit&skinColor=Pale', data:4,message:[{mssText:'A presto!',timestamp:'09:12',messageClass:'sent'}]};
    var erika = {name:'Erika',lastSeen:'15:23',src:'https://avataaars.io/?avatarStyle=Circle&topType=Turban&accessoriesType=Prescription01&hatColor=Blue03&hairColor=Platinum&facialHairType=Blank&facialHairColor=Black&clotheType=ShirtCrewNeck&clotheColor=PastelOrange&eyeType=Cry&eyebrowType=RaisedExcitedNatural&mouthType=Tongue&skinColor=Pale', data:5,message:[{mssText:'Vai in palestra oggi?',timestamp:'10:12',messageClass:'sent'}]};
    var paola = {name:'Paola',lastSeen:'11:11',src:'https://avataaars.io/?avatarStyle=Circle&topType=LongHairBob&accessoriesType=Prescription02&hatColor=Blue02&hairColor=PastelPink&facialHairType=Blank&clotheType=GraphicShirt&clotheColor=Heather&graphicType=Skull&eyeType=Cry&eyebrowType=FlatNatural&mouthType=Serious&skinColor=Yellow', data:6,message:[{mssText:'Sei rientrato in città?',timestamp:'11:12',messageClass:'sent'}]};
    var fabio = {name:'Fabio',lastSeen:'18:21',src:'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortWaved&accessoriesType=Kurt&hairColor=Auburn&facialHairType=BeardMedium&facialHairColor=BlondeGolden&clotheType=Hoodie&clotheColor=Red&graphicType=Hola&eyeType=Happy&eyebrowType=UpDown&mouthType=Concerned&skinColor=Brown', data:7,message:[{mssText:'Hai visto in tv cosa sta succedendo in Europa?',timestamp:'12:12',messageClass:'sent'}]};
    var andrea = {name:'Andrea',lastSeen:'16:23',src:'https://avataaars.io/?avatarStyle=Circle&topType=LongHairBun&accessoriesType=Kurt&hairColor=Red&facialHairType=BeardMagestic&facialHairColor=Auburn&clotheType=Overall&clotheColor=Heather&eyeType=Side&eyebrowType=Angry&mouthType=Disbelief&skinColor=Brown', data:8,message:[{mssText:'Ho sentito che da te è tutto ok',timestamp:'13:12',messageClass:'sent'}]};
    var roberto = {name:'Roberto',lastSeen:'21:18',src:'https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight2&accessoriesType=Sunglasses&hairColor=Red&facialHairType=BeardMedium&facialHairColor=Red&clotheType=GraphicShirt&clotheColor=Gray01&graphicType=Hola&eyeType=Default&eyebrowType=RaisedExcitedNatural&mouthType=Smile&skinColor=Pale', data:9,message:[{mssText:'Ci vediamo domani',timestamp:'14:12',messageClass:'sent'}]};
    var users = [alfonso, tommaso,claudia,antonio,boss,erika,paola,fabio,andrea,roberto];

    // end objects

    //left-side chat loader

    for (var i = 0; i < users.length; i++) {
        var chatContent = users[i];
        var message = templateLeftChat(chatContent);
        $(".chat-menu").append(message);
    };

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
        messagesSender();
        toggleIcon();
    });

//send message by pushing 'enter'

    $("#message-input").keyup(function(event) {
        toggleIcon();
        if (event.keyCode == 13) {
            messagesSender();
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
        var data = $(this).data('chat');
        mediaQuery();
        $('.container-right').addClass('show');
        $('.mss-scroll-bar').data("chat", data);
        chatLink(this); // right top-bar link
        $(".mss-scroll-bar").text(''); // delete mss.scroll-bar
        mssLoader(data); // load messages from array

        // update top bar right contents (timestamp etc)
    });

    // close chat media-query max-width:768px

    $('.left-chat-open').before().click(function() {
        $('.container-left').toggleClass('hide');
        $('.container-right').toggleClass('show');
    });

// dropdown menu

    $(document).on('click','.mss-container i',function(event) {
        alternateOpening($(this).siblings('.dropdown-menu'),$('.dropdown-menu'),'open');
        event.stopPropagation();
        // console.log($(this).siblings('.dropdown-menu'),$('.dropdown-menu'),'open');
        scrollLastItem('.mss-scroll-bar');

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

    function updatePreviews(data,user) {
        var timeStampOpenChatActive = $('.mss-scroll-bar').find('.message.received:last-child .timestamp').text();
        var chatPreviewText = $('.mss-scroll-bar').find('.message.received:last-child .mss-text').text();
        user.lastSeen = timeStampOpenChatActive; // push timestamp data to array
        // update text in chat-last-update
        // update text in preview-chat
        $('.preview-chat-open').text("last seen today at " + timeStampOpenChatActive);
        $('.chat[data-chat*='+ data +']').find('.chat-last-update').text(timeStampOpenChatActive);
        $('.chat[data-chat*='+ data +']').find('.chat-preview').text(chatPreviewText);
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

    function createMsg(sentReceived,text,time) {
        var messageContent = { mssText:text, timestamp:time, messageClass:sentReceived };
        var message = template(messageContent);
        return message;
    };

    function messagesSender() {
        var timestamp = time();
        var data = $(".mss-scroll-bar").data('chat');
        var object = objectFinder(data);
        var nomeInput = $("#message-input").val().trim();
        $("#message-input").val('');
        if (nomeInput !='') {
            var collectedMessage = createMsg("sent",nomeInput,timestamp);
            $(".mss-scroll-bar").append(collectedMessage);
            pushToArray('sent',nomeInput,timestamp,object);
            scrollLastItem('.mss-scroll-bar');
            setTimeout(function() {
                var autoResponder = createMsg("received",'Ok',timestamp);
                $(".mss-scroll-bar").append(autoResponder);
                pushToArray('received','Ok',timestamp,object);
                scrollLastItem('.mss-scroll-bar');
            }, 1000);
            setTimeout(function() {
                updatePreviews(data,object);
            }, 1000);
        };
    };

    function mssLoader(dataChat) {
        for (var i = 0; i < users[dataChat].message.length; i++) {
            var scrollContent = users[dataChat].message[i];
            // console.log(scrollContent);
            var message = template(scrollContent);
            $(".mss-scroll-bar").append(message);
        };
    };

    function pushToArray(sentReceived,text,time,user) {
        var newObject = {mssText:text,timestamp:time,messageClass:sentReceived};
        user.message.push(newObject);
    };

    function objectFinder(dataChat) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].data == dataChat) {
                var object = users[i];
            };
        };
        return object;
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

    function mediaQuery() {
        var x = window.matchMedia("(max-width: 768px)")
        if (x.matches) { // If media query matches
            $('.container-left').toggleClass('hide');
            $('.container-right').toggleClass('show');
    };
}

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
