$(document).ready(function() {
	navigator.geolocation.getCurrentPosition(showPosition);
	getBeacons();
	update_chats();
	$(document).keypress(function(e) {
	    if(e.which == 13) 
	    	if($("#message_area").val() != ""){
	    		sendMessage(active_beacon);
	    		$("#conversation_holder").append("<div><img src='https://graph.facebook.com/"+FB.getUserID()+"/picture/?width=45&amp;height=45'>"+$("#message_area").val()+"</div>");
	    		$("#message_area").val("");
	    	}
	});
});

var myLatlng = new google.maps.LatLng(20,20);
function showPosition(position){
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
