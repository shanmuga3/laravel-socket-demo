'use strict';

import './bootstrap';

const socket = require('socket.io-client')('http://localhost:6574');

/**
 * Init Component
 */
const $window = $(window);
const $usernameInput = $('.user-name');
const $messages = $('.messages');
const $inputMessage = $('#user-message');

/**
 * Vars
 */
let username;
let $currentInput = $usernameInput.focus();

/**
 * Keyboard Events
 */
$window.keydown(function (event) {

    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
        $currentInput.focus();
    }

    /**
     * When user press enter key
     */
    if (event.which === 13) {
        chat.handlePressEnter();
    }
});

/**
 * Chat Functionalities
 */
const chat = {

    handlePressEnter: () => {
        if (username === undefined) {
            chat.loginUser($usernameInput.val().trim());
        } else {
            if (chat.isValidInputMessage()) {
                chat.sendMessage($inputMessage.val().trim());
            } else {
                alert('Please type message');
                chat.setInputFocus();
            }
        }

    },

    isValidInputMessage: () => $inputMessage.val().length > 0 ? true : false,

    sendMessage: (message) => {
        $currentInput.val('');
        chat.setInputFocus();
        const data = {
            time: (new Date()).getTime(),
            user: username,
            message: message
        };
        socket.emit('chat-message', data);
    },

    loginUser: (user) => {
        $('.main-page').addClass('d-none');
        $('.chat-page').removeClass('d-none');
        username = user;
        chat.setInputFocus();
        socket.emit('user-join', username);
    },

    setInputFocus: () => {
        $currentInput = $inputMessage.focus();
    },

    log: (message, options) => {
        const element = $('<div>').addClass('text-center').addClass('log').text(message);
        chat.addMessageElement(element, options);
    },

    addChatMessage:(data) => {
        let alignClass = (data.user == username) ? 'text-start' : 'text-end';
        $( ".messages").append("<div class='"+alignClass+"'><strong>"+data.user+"</strong><p>"+data.message+"</p></div>" );
    },

    addMessageElement: (element, options) => {
        const $element = $(element);

        if (!options) options = {};
        if (typeof options.fade === undefined) options.fade = true;
        if (typeof options.prepend === undefined) options.prepend = false;
        if (options.fade) $element.hide().fadeIn(150);

        if (options.prepend) {
            $messages.prepend($element);
        } else {
            $messages.append($element);
        }

        $messages[0].scrollTop = $messages[0].scrollHeight;
    }
};


/**
 * Events
 */
socket.on('connect', () => {
    console.log('connected');
});

socket.on('chat-message', (data) => {
	console.log(data);
    chat.addChatMessage(data);
});

socket.on('user-join', (data) => {
    chat.log(data + ' joined at this room');
});

socket.on('user-unjoin', (data) => {
    chat.log(data + ' left this room');
});

$(".send-msg").click(function(e){
    e.preventDefault();
    var token = $("input[name='_token']").val();
    var user = $("input[name='user']").val();
    var msg = $(".msg").val();
    if(msg != ''){
        $.ajax({
            type: "POST",
            url: sendMessageUrl,
            dataType: "json",
            data: {'_token':token,'message':msg,'user':user},
            success:function(data){
                socket.emit('chat-message', data);
                $(".msg").val('');
            }
        });
    }else{
        alert("Please Add Message.");
    }
});