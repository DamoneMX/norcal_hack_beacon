$(document).ready(function() {
	console.log("Loading library");
	$.ajaxSetup({ cache: true });
	$.getScript("//connect.facebook.net/en_US/all/debug.js", function(){
	FB.init({
		appId: '1409756135920296', 
   		status     : true, // check login status
   		cookie     : true, // enable cookies to allow the server to access the session
    	xfbml      : true  // parse XFBML
	});     
	
	$('#loginbutton,#feedbutton').removeAttr('disabled');
	FB.getLoginStatus(updateStatusCallback);
		console.log("done loading");
	});
		   // event is fired for any authentication related change, such as login, logout or session refresh
});
		
function updateStatusCallback(){
	console.log("login has worked");
	FB.Event.subscribe('auth.authResponseChange', function(response) {
	 	if (response.status === 'connected') {
	 	 	console.log("correct connection");
	 	 	registerUser();
	    } else if (response.status === 'not_authorized') {
	    	console.log("not authorized");
	    	FB.login();
	    } else {
	    	console.log("else case");
	    	FB.login();
	    }
	});
}

function registerUser(){
	console.log("will register user");
	FB.api('/me', function(response) { 
		//console.log(response.id);
		addUser(response.id);
	});	
}

function getActiveUser(){
	console.log("registered user");
	FB.api('/me', function(response) { 
		console.log(response);
		return(response.id);
	});	
}

function testAPI() {
	console.log('Welcome!  Fetching your information.... ');
	//SELECT link FROM photo WHERE owner = A 
	FB.api('/me', function(response) { 
		//console.log('Good to see you, ' + response.name + '.');
		console.log(response);
	});		    
		    
    FB.api('/me/friends?limit=2000&offset=0', function(response) { //gets friends
		for(var x in response.data)
		 	$("#friends_list").append("<div data-id='"+response.data[x].id+"'><img  width='50' height='50' src='https://graph.facebook.com/"+response.data[x].id+"/picture/?width=45&amp;height=45'>"+response.data[x].name+"</div>");
	});
}

function logout(){
 	FB.logout(function(response) {
		console.log("user has logged out");
	});
}