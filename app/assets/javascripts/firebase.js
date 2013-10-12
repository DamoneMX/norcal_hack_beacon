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

function addBeacon(userId, beaconInfo){
	var beacons_ref = new Firebase("https://facebook-hack.firebaseio.com/beacons");
	var reference = beacons_ref.push({test:"test",test2:"test2", latitude: "39.32", longitude: "22.21", ownerId: '333'});
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
   		var marker = new google.maps.Marker({
        	animation:google.maps.Animation.BOUNCE,
	        position: myLatlng2,
	        map: map,
	        title: '',
	        icon: 'icons/fire.png',
        });
	
		var LatLngArray  = new Array(sampleLatLong.length);
   		var infowindow = new google.maps.InfoWindow();
		var i;
		for (i=0; i < sampleLatLong.length ; i++){
    		LatLngArray[i] = new google.maps.LatLng(sampleLatLong[i][0],sampleLatLong[i][1]);

		var content = '<div class="map-content"><div id="chat_'+beacon_id+'">' + i;
        var marker = new google.maps.Marker({
            map: map,
            title: "",
            position: new google.maps.LatLng(sampleLatLong[i][0],sampleLatLong[i][1]),
			icon: 'icons/fire.png',
			animation:google.maps.Animation.BOUNCE,
        });
        google.maps.event.addListener(marker, 'click', (function(marker, content) {
            return function() {
                infowindow.setContent(content);
                infowindow.open(map, marker);
                displayConversation(beacon_id);
                active_beacon = beacon_id;
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
        
        var chats_ref = new Firebase("https://facebook-hack.firebaseio.com/chats/" + beacon_id).once('value', function(messages){ 
   	    	messages.forEach(function(child) {
   	    		var message = child.val();
   	    		//$("#chat_" + beacon_id).append("<div>"+message.text+"</div>");
   	    		console.log(message.text);
               //console.log(child.val());
                //videoIds[videoIdIndex++] = childSnapshot.name();
            });
    	});
        beacon_chats.push(chats_ref);
        
	});
	
}

function update_chats(){
}



function displayConversation(beacon_id){
	console.log(beacon_id);
	$("#conversation_holder").html("");
	var chats_ref = new Firebase("https://facebook-hack.firebaseio.com/chats/" + beacon_id).once('value', function(messages){ 
   	    messages.forEach(function(child) {
   	    var message = child.val();
		console.log(message.text );
			$("#conversation_holder").append("<div><img src='https://graph.facebook.com/"+message.sender+"/picture/?width=45&amp;height=45'>"+message.text+"</div>");
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

