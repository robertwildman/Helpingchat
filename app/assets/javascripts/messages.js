window.userFriendships = [];
var roomaddress, roomempty;
roomempty = true;
userconnected = false;

$(document).ready(function() {
	$('#messagesend').click( function() {
			var message = $('#messagetextinput').val();
			$('#messagetextinput').val('');
			// tell server to execute 'sendchat' and send along one parameter
			if(userconnected == false)
			{
				alert("You need to start chat before you can send messages!");
			}else
			{
			socket.emit('sendchat', message);
			pmessage = $("<p></p>").append(message);
			$("<div></div>").attr('class','yourbubble bubble pull-right').append(pmessage).appendTo('#chat');
			$("<br>").appendTo('#chat');
			document.getElementById("chat").scrollTop = document.getElementById("chat").scrollHeight;
			$(this).focus();
			}
		});

		// when the client hits ENTER on their keyboard
		$('#messagetextinput').keypress(function(e) {
			if(e.which == 13) {
				$(this).blur();
				$('#messagesend').focus().click();
				$(this).focus();
			}
		});
	$('#startchat').click(function(event) {
			startnewroom();
		});
	$('#startchatting').click(function(event) {
		name = $('#chat_username_input').val();
		issue = $('#chat_issue_input').val();
		if(name.length > 0 && issue.length > 0)
		{
			startnewroom();
		}
		});
	$('#endchat').hide();
	$('#chat-header-text').text('Welcome to Helping Chat!');
});


function startnewroom() {
	$.ajax({
		url: '/getstartinfo',
		dataType: 'json',
		type: 'GET',
		success: function(data) {
		if(userconnected == true){
				//User is currently in a chat
				$('#chat').html('');
				userconnected = true;
				socket.emit('switchRoom',data.roomaddress,$('#issue').text(),data.roomstatus);
			}else{
				$('#chat').html('');
				userconnected = true;
				socket.emit('adduser',data.roomaddress,data.username,$('#issue').text(),data.roomstatus);
			}
			//This will display 2 buttons and remove the start chatting button
			//First button is View Person Second is new Person
			$(".startchatbutton").remove();
		}
		});
}




function wasitsentbyme(sentid) {
	if (sentid == '<%= @userid =>') {

	} else {

	}
}

function namechangedfunction() {

	var username = document.getElementById('username_input').value;
	$('#nametext1').text("Your current usernamme is: " + username);
	$('#name').text(username);
	$('#namechangedtext').text("Your name has been changed to: " + username);
	$('#namechanged').modal('show');
	$('#changename').modal('hide');
	socket.emit('updatename', username);
}


function issuechangedfunction() {

	var issue = document.getElementById('issue_input').value;
	$('#issuetext1').text("Your current issue is: " + issue);
	$('#issue').text(issue);
	$('#issuechangedtext').text("Your issue has been changed to: " + issue);
	$('#issuechanged').modal('show');
	$('#changeissue').modal('hide');
	socket.emit('updateissue', issue);
}