var users_ref = new Firebase('https://facebook-hack.firebaseio.com/users');

var active_beacon = 0; 

function addUser(userId){
	users_ref.push({user:userId});
	//var chat_ref = new Firebase("https://facebook-hack.firebaseio.com/beacon_chat_test");
	//var chat_ref = new Firebase("https://facebook-hack.firebaseio.com/users/"+ userId);
	//chat_ref.set(userId)
}

function getUser(userId){
	
}

//function addBeacon(userId, beaconInfo){
function addBeacon(){
	var beacons_ref = new Firebase("https://facebook-hack.firebaseio.com/beacons"); //37.4846756 -122.1483885
	var reference = beacons_ref.push({test:"FROGGIE FEVER 13TH BIRTHDAY BASH",test2:"test2", latitude: "-18.665695", longitude: "35.529562", ownerId: FB.getUserID()});
	return true;
}

function test(){
	$("#chat_-J5h91IHfbwXYWM-QtjS").html("TEINFDSNFS");
}

var beacon_chats = new Array();
function getBeacons(){
	var beacons_ref = new Firebase("https://facebook-hack.firebaseio.com/beacons");
	beacons_ref.on('child_added', function(snapshot) {
		beacon = snapshot.val();
		var beacon_id = snapshot.ac.path.m[1];
		console.log("adding marker in: " + beacon.latitude);
		console.log(map);
		var sampleLatLong = [[beacon.latitude, beacon.longitude]]
		var myLatlng2 = new google.maps.LatLng(beacon.latitude,beacon.longitude);
		/*
   		var marker = new google.maps.Marker({
        	animation:google.maps.Animation.BOUNCE,
	        position: myLatlng2,
	        map: map,
	        title: '',
	        icon: 'icons/fire.png',
        });*/
	
		var LatLngArray  = new Array(sampleLatLong.length);
   		var infowindow = new google.maps.InfoWindow();
		var i;
		for (i=0; i < sampleLatLong.length ; i++){
    		LatLngArray[i] = new google.maps.LatLng(sampleLatLong[i][0],sampleLatLong[i][1]);

		
		
		var count = 1;
		var chats_ref = new Firebase("https://facebook-hack.firebaseio.com/chats/" + beacon_id).once('value', function(messages){ 
		 	for(var x in messages.val())
		 		count++;
    	});
    	var content = '<div class="map-content"><div id="chat_'+beacon_id+'">' + beacon.test + "";
        beacon_chats.push(chats_ref);
		var pinIcon = function(size) {
		 return new google.maps.MarkerImage(
		    "icons/fire.png",
		    null, /* size is determined at runtime */
		    null, /* origin is 0,0 */
		    null, /* anchor is bottom center of the scaled image */
		    new google.maps.Size(32 * size , 32 * size)
		);
		}
        var marker = new google.maps.Marker({
            map: map,
            title: "",
            position: new google.maps.LatLng(sampleLatLong[i][0],sampleLatLong[i][1]),
			icon: pinIcon(count),
			size: new google.maps.Size(200, 200),
			animation:google.maps.Animation.BOUNCE,
        });
        google.maps.event.addListener(marker, 'click', (function(marker, content) {
            return function() {
            	console.log("triggered click");
                displayConversation(beacon_id);
                active_beacon = beacon_id;
            }
        })(marker, content));
        
        google.maps.event.addListener(marker, 'mouseover', (function(marker, content) {
            return function() {
                infowindow.setContent(content);
                infowindow.open(map, marker);
            }
        })(marker, content));
        }
        
        /*
        var chats_ref = new Firebase("https://facebook-hack.firebaseio.com/chats/" + beacon_id);
        chats_ref.on('child_added', function(snap) { 
        	console.log(snap.ac.path.m[1]);
        	var message = snap.val();
        	
        	console.log("looking to inset message: " + message.text);
        	$("#chat_" + beacon_id).append("<div>"+message.text+"</div>");
        });*/
        
       
        
	});
	
}

function update_chats(){
}



function displayConversation(beacon_id){
	console.log(beacon_id);
	$("#conversation_holder").html("");
	var chats_ref = new Firebase("https://facebook-hack.firebaseio.com/chats/" + beacon_id).once('value', function(messages){ 
		console.log(messages);
   	    messages.forEach(function(child) {
   	    var message = child.val();
		console.log(message.text );
			$("#conversation_holder").prepend("<div class='panel panel-default'><div class='panel-body'><img  width='50' height='50' src='https://graph.facebook.com/"+message.sender+"/picture/?width=45&amp;height=45'>  "+message.text+"</div></div></div>");
    	});
    });
    
    $("#conversation_div").collapse('show');
}

google.maps.event.addDomListener(window, 'load', initialize);
function sendMessage(beacon_id){
	
	var chat_ref = new Firebase("https://facebook-hack.firebaseio.com/chats/" + active_beacon);
	chat_ref.push({text: $("#message_area").val(), sender: FB.getUserID()});
	console.log("message sent");
	return true;
}

