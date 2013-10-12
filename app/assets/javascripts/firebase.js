var users_ref = new Firebase('https://facebook-hack.firebaseio.com/users');
var chat_ref = new Firebase("https://facebook-hack.firebaseio.com/beacon_chat_test");

function addUser(userId){
	users_ref.push({user:userId});
}

function getUser(userId){
	
}

function addBeacon(userId, beaconInfo){
	var beacons_ref = new Firebase('https://facebook-hack.firebaseio.com/' + userId + "_beacons");
	beacons_ref.push({test:"test",test2:"test2", latitude: "19.32", longitude: "23.21"});
	return true;
}

function sendMessage(){
	chat_ref.push({message:"Sample Text", sender: "907995244"});
	return true;
}

chat_ref.on('child_added', function(snapshot){
	var message = snapshot.val();
	$("#chat").append(
		"<div>"+ message.message +"</div>"
	);
	//displayChatMessage(message.name, message.text);
});

//myDataRef.on('child_added', function(snapshot) {
  //We'll fill this in later.
//});