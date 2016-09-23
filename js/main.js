$(document).ready(function(){
	$(".btn").click(function(){
		clearData();	
		var instagram = $("#username").val();
		$.getJSON("https://gramgainer.com/search.php?username=" + instagram + "", function(data){
			var followers = commaSeparateNumber(data.entry_data.ProfilePage[0].user.followed_by.count);
			$(".user").append("<h4 class='userdata'>" + data.entry_data.ProfilePage[0].user.username+ "</h4>");
			$(".user").append("<img id='userpic' class='userdata' src='" + data.entry_data.ProfilePage[0].user.profile_pic_url_hd + "'height=100 width=100>");

			$(".posts").prepend("<h4 class='userdata'>" + data.entry_data.ProfilePage[0].user.media.count + "</h4>");
			$(".followers").prepend("<h4 class='userdata' id='curFollowers'>" + followers + "</h4>");
			$(".following").prepend("<h4 class='userdata' id='data'>" + data.entry_data.ProfilePage[0].user.follows.count + "</h4>");
			printPosts(data);
			$(".results").show();
			$(".images").show();
			$(".followNotification").prepend("<h4 class='userdata' id='notification' style='color:red;'>Adding Followers..</h4>");
			incFollowers(data);
			popUp();
		});
	});

	$('#username').keypress(function (e) {
 		var key = e.which;
 		if(key == 13){
    			$(".btn").click();
    			return false;  
  		}
	});  

	function printPosts(pics){
		var temp = pics.entry_data.ProfilePage[0].user.media.nodes;
		for(var i=0;i<pics.entry_data.ProfilePage[0].user.media.nodes.length;i++){
			$(".images").append("<img class='userpost col-xs-4 userdata' src='" + pics.entry_data.ProfilePage[0].user.media.nodes[i].thumbnail_src + "'height=300 width=180>");
		}
	}

	// Clear all Data on the page everytime the user clicks the button
	function clearData(){
		$(".userdata").remove();
	}

	// Creates the increasing number effect
	function incFollowers(info){
		// Animate the element's value from 400 to 400000:
		var temp = info.entry_data.ProfilePage[0].user.followed_by.count;
		var newTemp = temp+2500;
		var currency = $("#currency"); //[make sure this is a unique variable name]
		$({someValue: temp}).animate({someValue: newTemp}, {
		duration: 5000,
		easing:'swing', // can be anything
	
		step: function() { // called on every step
			// Update the element's text with rounded-up value:	
			$("#curFollowers").text(commaSeparateNumber(Math.round(this.someValue)));
			},
		
		done: function() {
			$("#notification").html("<h4 class='userdata' id='notification' style='color:red;'>DONE!</h4>");
			$('[data-popup=popup-1]').fadeIn(350);
		}
	});
}
 
	/**
	* Format the number, so it will be seperated by comma
	*/
	function commaSeparateNumber(val){
		while (/(\d+)(\d{3})/.test(val.toString())){
		val = val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
		}
	return val;
	}


	function popUp() {
		//----- Open
		$('[data-popup-open]').on('click', function(e) {
			var targeted_popup_class = jQuery(this).attr('data-popup-open');
			$('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);

			e.preventDefault();
		});

		//----- Close
		$('[data-popup-close]').on('click', function(e) {
			var targeted_popup_class = jQuery(this).attr('data-popup-close');
			$('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
	
			e.preventDefault();
		});
	}
});