var beacons = new Array();
$(document).ready(function() {
	navigator.geolocation.getCurrentPosition(showPosition);
	getBeacons();
	update_chats();
	$(document).keypress(function(e) {
	    if(e.which == 13) 
	    	if($("#message_area").val() != ""){
	    		if(FB.getUserID() == ""){
	    			console.log("not logged in");
	    			$('#myModal').modal()
	    			return;
	    		}
	    		else{
		    		sendMessage(active_beacon);
		    		$("#conversation_holder").prepend("<div class='panel panel-default'><div class='panel-body'><img height='50' width='50' src='https://graph.facebook.com/"+FB.getUserID()+"/picture/?width=45&amp;height=45'>  "+$("#message_area").val()+"</div></div></div>");
		    		$("#message_area").val("");
	    		}
	    	}
	});
	
	var beacn_id = 0;
	var beacons_ref = new Firebase("https://facebook-hack.firebaseio.com/beacons").once('value', function(messages){ 
   	    messages.forEach(function(child) {
   	    	beacn_id = child.ac.path.m[1];
   	    	var chats_ref = new Firebase("https://facebook-hack.firebaseio.com/chats/" + beacn_id);
   	    	beacons[beacn_id] = new Array();
   	    	chats_ref.once('value', function(childs){
   	    		childs.forEach(function(conv){
   	    			console.log("adding childs" + conv.ac.path.m[1]);
   	    			beacons[beacn_id].push(conv.ac.path.m[1]);
   	    		});
   	    	}); 
			chats_ref.on('child_added', function(snapshot) { 
				//console.log("active beacon: ") + active_beacon;
				//console.log("child has been added to chats for: " + beacn_id); //no funciona por q 
				console.log("has been triggered");
				var snap = snapshot.val();
				$("#conversation_holder").prepend("<div class='panel panel-default'><div class='panel-body'><img height='50' width='50' src='https://graph.facebook.com/"+snap.sender+"/picture/?width=45&amp;height=45'>  "+snap.text+"</div></div></div>");
			});
	   	    //var message = child.val();
	   	    //console.log(message);
	   	    //console.log("done with beacons");
    	});
    }); 
	
	
	/*
	var chats_ref = new Firebase("https://facebook-hack.firebaseio.com/chats/" + beacon_id);
	chats_ref.on('child_added', function(snapshot) { 
		console.log("child has been added to chats");
	});
	*/
});



var myLatlng = new google.maps.LatLng(37.4846756,-122.1483885);
function showPosition(position){
	//console.log(position.coords.latitude + " "  + position.coords.longitude); 37.4846756 -122.1483885
     myLatlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
     google.maps.event.addDomListener(window, 'load', initialize);
}
    
var map;
function initialize(){    
    var mapOptions = {
zoom: 4,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);


}
