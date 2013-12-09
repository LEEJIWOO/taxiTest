var map;
var distance;
var geocoder;
var curCoord;
var geocoder;
var directionsService;
var startMarker;
var endMarker;
var curMarker;

var directionsRenderer;
var directionMarkers;
var startTime;
var memberCount;


$(document).ready(function(){

	var params = getHrefParams();
	console.log(params);
	var feedRoomNo = params.roomNo;
	var contentHeight = $(window).height();
	console.log(contentHeight);
	console.log($("#mainHeader").outerHeight());
	console.log($("#content").outerHeight());
	console.log($("#datgul").outerHeight());
//	var feedheight = $("#divStartEndLoc").outerHeight()
//	$("#datgul")

//	loginInfo();
//	개인 세션 정보로 Select

	getRoomInfo(feedRoomNo);
	getFeedList(feedRoomNo);

	$(document).on('keypress', '#reply', function(evt){

	        var keyPressed = evt.which || evt.keyCode;
	        var mbrId = getSessionItem("loginInfo").mbrId;

	        if (keyPressed == 13) {

	        	var feedContent = $("#reply").val();
	        	$("#reply").val("");
	        	addFeed(mbrId, feedContent, feedRoomNo);
	        }
	 });

	 $(document).on("click", "#btnDelete", function(event){
		 event.stopPropagation();
		 
		 var mbrId = $(this).attr("data-mbrId");
		 var feedNo = $(this).attr("data-feedNo");
		 var feedRoomNo = $(this).attr("data-feedRoomNo");

		 deleteFeed(mbrId, feedNo, feedRoomNo);
	 });

	 $("#relationView").click(function(event){
		 event.stopPropagation();
		 
		 var canvas = $("#myCanvas").get(0);
	    	canvas.width = canvas.width;
		 	var roomNo = $("#roomNo").attr("data-roomNo");
		 	showRelationInfo(roomNo);
	 });

	 $("#icons").click(function(event){
		 event.stopPropagation();
		 
		 changeHref("../home/home.html");
	 });



	 $("#outRoom").on("click", function(event){
		 event.stopPropagation();
		 
		 var mbrId = getSessionItem("loginInfo").mbrId;
		 var roomNo = $("#roomNo").attr("data-roomNo");
		 outRoom(mbrId, roomNo);
	 });
});


var searchRoute = function ( startX, startY, endX, endY, callbackFunc, waypoints ) {
	console.log("searchRoute()");
	var DirectionsRequest = {
		origin 		: new olleh.maps.Coord( startX, startY ),
		destination : new olleh.maps.Coord( endX, endY ),
		waypoints 	: waypoints,
		projection 	: olleh.maps.DirectionsProjection.UTM_K,
		travelMode	: olleh.maps.DirectionsTravelMode.DRIVING,
		priority  		: olleh.maps.DirectionsDrivePriority.PRIORITY_3
	};
	directionsService.route(DirectionsRequest, callbackFunc);
};


var directionsService_callback = function (data) {
	console.log("directionsService_callback()");
	var DirectionsResult  = directionsService.parseRoute(data);
	console.log(DirectionsResult);

	var date = parseInt(startTime);
//	var chargeVelo = 15;
//	var chargeTime = 35;
//	var defaultFare = 100;
//	var chargeFare = 120;

	if(	date >= 00 && date < 04){
		console.log("할증");

		var distanceFare =
			(DirectionsResult.result.total_distance.value / 142) * 120;

//		var durationFare =
//				Math.round(((
//					(Math.round(DirectionsResult.result.total_duration.value) * 60) - 540) / 35) * 100);

		var totalFare = Math.round(distanceFare + 3600);
			totalFare = totalFare.toString().substr(
												0, totalFare.toString().length -2).concat("00");

		console.log(totalFare);
		distance = DirectionsResult.result.total_distance.value  / 10.0;
		distance = Math.round(distance) / 100;

		$("#addedFare").text("(할증)");
		$("#roomFare").text( totalFare + "원" );
		$("#myFare").text("("+ totalFare / memberCount +"원)");

	} else {
		console.log("NO할증");

		var distanceFare =
			(DirectionsResult.result.total_distance.value / 142) * 100;

		var durationFare =
				Math.round(((
					(Math.round(DirectionsResult.result.total_duration.value) * 60) - 540) / 35) * 100) / 2;

		var totalFare = Math.round(distanceFare + 3000);
			totalFare = totalFare.toString().substr(
												0, totalFare.toString().length -2).concat("00");

		distance = DirectionsResult.result.total_distance.value  / 10.0;
		distance = Math.round(distance) / 100;
		$("#roomFare").text( totalFare + "원" );
		$("#myFare").text("("+ totalFare / memberCount +"원)");
	}

	$("#roomDistance").text( distance +"km");

	directionMarkers = [];
	var routes = DirectionsResult.result.routes;
	for( var i in routes) {
		if ( routes[i].type == "999" ) {
			directionMarkers[directionMarkers.length] = setWaypointMarker(
					new olleh.maps.Coord( routes[i].point.x, routes[i].point.y ),
					"../images/common/marker/MapMarker_Flag3_Right_Azure.png" );
		}

		if ( routes[i].type == "1000" ) {
			directionMarkers[directionMarkers.length] = setWaypointMarker(
					new olleh.maps.Coord( routes[i].point.x, routes[i].point.y ),
					"../images/common/marker/MapMarker_Flag1_Right_Chartreuse.png" );
		}

		if ( routes[i].type == "1001" ) {
			directionMarkers[directionMarkers.length] = setWaypointMarker(
					new olleh.maps.Coord( routes[i].point.x, routes[i].point.y ),
					"../images/common/marker/MapMarker_ChequeredFlag_Right_Pink.png" );
		}
	}

	var DirectionsRendererOptions = {
		directions : DirectionsResult,
		map : map,
		keepView : true,
		offMarkers : true,
		offPolylines : false
	};

	directionsRenderer = new olleh.maps.DirectionsRenderer(DirectionsRendererOptions);
	directionsRenderer.setMap(map);
};



//var distance_callback = function (data) {
//console.log("distance_callback()");
//var directionsResult  = directionsService.parseRoute(data);
//var distance = directionsResult.result.total_distance.value;
//searchRooms();
//};


var setWaypointMarker = function( coord, imageUrl ) {
	console.log("setWaypointMarker()");
	var icon = new olleh.maps.MarkerImage(
		imageUrl,
		new olleh.maps.Size(40, 40),
		new olleh.maps.Pixel(0,0),
		new olleh.maps.Pixel(5, 40)
	);
	var marker = new olleh.maps.Marker({
		position: coord,
		map: map,
//		shadow: shadow,
		icon: icon,
		title : 'Current Location',
		zIndex : 1
  	});

	return marker;
};


var outRoom = function (mbrId, roomNo) {

	$.getJSON( rootPath + "/room/outRoom.do?mbrId=" + mbrId + "&roomNo=" + roomNo
											 , function(result) {
				if(result.status == "success") {
					changeHref("../home/home.html");

				} else {
					alert("실행중 오류발생!");
					console.log(result.data);
				}
		});
};


var getRoomInfo = function(roomNo) {

	$.getJSON( rootPath + "/room/getRoomInfo.do?roomNo=" + roomNo,
								function(result) {
	var roomInfo = result.data;

	if(result.status == "success") {

		console.log("init()	- getRoomInfo()");

		var startLat = roomInfo.roomPathList[0].pathLat;
		var startLng = roomInfo.roomPathList[0].pathLng;
		var endLat = roomInfo.roomPathList[1].pathLat;
		var endLng = roomInfo.roomPathList[1].pathLng;
		var dsCallBack = "directionsService_callback";

		geocoder = new olleh.maps.Geocoder("KEY");
		directionsService = new olleh.maps.DirectionsService('frKMcOKXS*l9iO5g');

		curCoord = new olleh.maps.Coord(startLng, startLat);

		console.log("loadMap()");
	  	var mapOptions = {
	     	center : curCoord,
	     	zoom : 10,
	     	mapTypeId : olleh.maps.MapTypeId.BASEMAP,
	     	mapTypeControl: false
	  	};
	  	map = new olleh.maps.Map(document.getElementById("canvas_map"), mapOptions);
		console.log(startLng, startLat, endLng, endLat, dsCallBack);
	  	searchRoute(startLng, startLat, endLng, endLat, dsCallBack);

		var d = new Date(roomInfo.roomStartTime);

		var hour = d.toTimeString().substring(0, 2);
		var minute = d.toTimeString().substring(3, 5);
		var ampm = "AM";
		startTime = hour;
		memberCount = roomInfo.roomMbrCount;

		if (hour > 12) {
			ampm = "PM";
			hour = hour - 12 ;
		}

		$("#roomStartTime").text( hour +":"+ minute );
		$("#roomStartDay").text(ampm);
		$("#imgMbrPhoto").attr( "src", getSessionItem("loginInfo").mbrPhotoUrl );
		$("#mbrName").text( getSessionItem("loginInfo").mbrName );
		$("#roomNo").attr("data-roomNo", roomInfo.roomNo);

	} else {
		alert("실행중 오류발생!");
		console.log(result.data);
	}
});
};


var getFeedList = function(feedRoomNo){
	$.getJSON( rootPath + "/feed/feedList.do?feedRoomNo="
									+ feedRoomNo, function(result) {

		if(result.status == "success") {

			var feedList = result.data;
			var mbrId = getSessionItem("loginInfo").mbrId;
			var ul = $(".listViewUl");

			$(".listViewUl #feedList").remove();

			for (var i in feedList) {
				var li = $("<li>")
							.attr("id", "feedList")
								.append( $("<img>")
									.attr("style", "width:77px;")
									.attr("src", feedList[i].mbrPhotoUrl))
								.append( $("<h2>")
									.text(feedList[i].mbrName));

					if(feedList[i].mbrId === mbrId){
								 	li.append( $("<p>")
								 			.append( $("<strong>").text(feedList[i].feedContent) )
								 			.append( $("<a>")
								 						.attr("id", "btnDelete")
								 						.attr("data-role", "button")
								 						.attr("data-inline", "true")
														.attr("data-icon","delete")
														.attr("data-iconpos", "notext")
														.attr("data-feedRoomNo", feedList[i].feedRoomNo)
														.attr("data-feedNo", feedList[i].feedNo)
														.attr("data-mbrId", feedList[i].mbrId)
								 						))
									.append( $("<p>")
												.attr("class","ui-li-aside")
												.text(feedList[i].feedRegDate) )
									.appendTo(ul);

								 	$('ul a[data-role=button]').buttonMarkup("refresh");
					$('ul').listview('refresh');

					} else {
						console.log("else");
						li.append( $("<p>")
								 .append( $("<strong>").text(feedList[i].feedContent))
									.append( $("<p>")
										.attr("class","ui-li-aside")
										.text(feedList[i].feedRegDate)))
									       .appendTo(ul);
						$('ul').listview('refresh');
						myScroll.refresh();
					}
			} // 반복문 end
		}
	});
};


var addFeed = function(mbrId, feedContent, feedRoomNo) {
	console.log("addFeed:" + mbrId, feedContent, feedRoomNo);
	$.post( rootPath + "/feed/addFeed.do",
			{
					mbrId	:  mbrId,
			   feedRoomNo	:  feedRoomNo,
			  feedContent	:  feedContent
			},
			function(result) {
				if(result.status == "success") {
					getFeedList(feedRoomNo);

				} else {
					alert("실행중 오류발생!");
					console.log(result.data);
				}
			},
	"json");
};


var deleteFeed = function(mbrId, feedNo, feedRoomNo){

	$.getJSON( rootPath + "/feed/deleteFeed.do?mbrId=" + mbrId +
									"&feedNo=" + feedNo
										, function(result) {

				if(result.status == "success") {
					getFeedList(feedRoomNo);

				} else {
					alert("실행중 오류발생!");
					console.log(result.data);
				}
		});
};

var showRelationInfo = function(roomNo) {
	console.log("showRelationInfo()");

	$.getJSON( rootPath + "/room/getRoomInfo.do?roomNo=" + roomNo,
			function(result) {

		var roomInfo = result.data;
		console.log(roomInfo);

		if(result.status == "success") {

			console.log(screen.width);



			    var canvas = document.getElementById("myCanvas");
			    canvas.width = canvas.width;
			    var ctx = canvas.getContext("2d");

			    ctx.beginPath();
			    ctx.fillStyle="black";

//			    var img = document.getElementById("back");
//			    ctx.drawImage(img, 0, 0, 320, 320);

			    // 방장
			    if( (roomInfo.roomMbrList[2] && roomInfo.roomMbrList[2] != null)){
			    	if(roomInfo.roomMbrList[0].roomMbrId
			    		== roomInfo.roomMbrList[2].mbrId) {
			    		horizontalLine(true);
			    	}
				}

			    if( (roomInfo.roomMbrList[1] && roomInfo.roomMbrList[1] != null)){
			    	if(	roomInfo.roomMbrList[0].roomMbrId
				    		== roomInfo.roomMbrList[1].mbrId) {
					first(true);
			    	}
				}

			    if( (roomInfo.roomMbrList[3] && roomInfo.roomMbrList[3] != null)){
			    	if(roomInfo.roomMbrList[0].roomMbrId
				    		== roomInfo.roomMbrList[3].mbrId) {
					fourth(true);
			    	}
			    }

			    // 두번째 멤버
			    if( (roomInfo.roomMbrList[1] && roomInfo.roomMbrList[1] != null) &&
			    		(roomInfo.roomMbrList[3] && roomInfo.roomMbrList[3] != null)){

			    	if(roomInfo.roomMbrList[1].roomMbrId
			    			== roomInfo.roomMbrList[3].mbrId) {

			    		if( (roomInfo.roomMbrList[1].frndRelId != "" &&
				    			roomInfo.roomMbrList[1].frndRelId != null)
						    		&& (roomInfo.roomMbrList[1].frndRelName != null &&
						    				roomInfo.roomMbrList[1].frndRelName != "") ) {


			    			var fixDot1 = new Image(); // 대각선2 아래쪽 아이콘
							fixDot1.src = "../images/common/fixdot.png";
							fixDot1.onload = function() {
								ctx.drawImage(fixDot1, 100, 185, 30, 30);
								ctx.font="11px Gothic";
								ctx.fillStyle="green";
								ctx.fillText(roomInfo.roomMbrList[1].frndRelName, 137, 210);
								ctx.font="11px Gothic";
								ctx.fillStyle="crimson";

							};

						}
			    	verticalLine(true);
			    	}
			    }

			    if( (roomInfo.roomMbrList[1] && roomInfo.roomMbrList[1] != null) &&
			    				(roomInfo.roomMbrList[0] && roomInfo.roomMbrList[0] != null)){
			    	if(roomInfo.roomMbrList[1].roomMbrId
				    		== roomInfo.roomMbrList[0].mbrId) {
			    		if( (roomInfo.roomMbrList[1].frndRelId != "" &&
				    			roomInfo.roomMbrList[1].frndRelId != null)
						    		&& (roomInfo.roomMbrList[1].frndRelName != null &&
						    				roomInfo.roomMbrList[1].frndRelName != "") ) {

							var fixDot1 = new Image(); // 위쪽 선
							fixDot1.src = "../images/common/fixdot.png";
							fixDot1.onload = function() {
								ctx.drawImage(fixDot1, 140, 50, 35, 35);
								ctx.font="12px Gothic";
								ctx.fillStyle="green";
								ctx.fillText(roomInfo.roomMbrList[1].frndRelName, 140, 45);

							};

				    	}
					first(true);
			    	}
				}

			    if( (roomInfo.roomMbrList[1] && roomInfo.roomMbrList[1] != null) &&
								(roomInfo.roomMbrList[2] && roomInfo.roomMbrList[2] != null)){
			    	if(roomInfo.roomMbrList[1].roomMbrId
				    		== roomInfo.roomMbrList[2].mbrId) {
			    		if( (roomInfo.roomMbrList[1].frndRelId != "" &&
				    			roomInfo.roomMbrList[1].frndRelId != null)
						    		&& (roomInfo.roomMbrList[1].frndRelName != null &&
						    				roomInfo.roomMbrList[1].frndRelName != "") ) {

			    			var fixDot2 = new Image(); // 오른쪽
			    			fixDot2.src = "../images/common/fixdot.png";
			    			fixDot2.onload = function() {
								ctx.drawImage(fixDot2, 233, 135, 35, 35);
								ctx.font="12px Gothic";
								ctx.fillStyle="green";
								ctx.fillText(roomInfo.roomMbrList[2].frndRelName, 270, 157);

							};
						}
					second(true);
			    	}
	    		}

			    // 세번째 멤버
			    	if( (roomInfo.roomMbrList[2] && roomInfo.roomMbrList[2] != null)
			    			&& (roomInfo.roomMbrList[1] && roomInfo.roomMbrList[1] != null)){
				    	if(roomInfo.roomMbrList[2].roomMbrId
				    			== roomInfo.roomMbrList[1].mbrId) {
				    		if( (roomInfo.roomMbrList[2].frndRelId != "" &&
					    			roomInfo.roomMbrList[2].frndRelId != null)
							    		&& (roomInfo.roomMbrList[2].frndRelName != null &&
							    				roomInfo.roomMbrList[2].frndRelName != "") ) {

				    			var fixDot2 = new Image(); // 오른쪽
				    			fixDot2.src = "../images/common/fixdot.png";
				    			fixDot2.onload = function() {
									ctx.drawImage(fixDot2, 233, 135, 35, 35);
									ctx.font="12px Gothic";
									ctx.fillStyle="green";
									ctx.fillText(roomInfo.roomMbrList[2].frndRelName, 270, 157);

								};
							}
						second(true);
				    	}
					}

			    	if( (roomInfo.roomMbrList[2] && roomInfo.roomMbrList[2] != null)){
				    	if(roomInfo.roomMbrList[2].roomMbrId
					    		== roomInfo.roomMbrList[0].mbrId) {
				    		if( (roomInfo.roomMbrList[2].frndRelId != "" &&
					    			roomInfo.roomMbrList[2].frndRelId != null)
							    		&& (roomInfo.roomMbrList[2].frndRelName != null &&
							    				roomInfo.roomMbrList[2].frndRelName != "") ) {

				    			var fixDot1 = new Image(); // 대각선 위쪽 아이콘
								fixDot1.src = "../images/common/fixdot.png";
								fixDot1.onload = function() {
									ctx.drawImage(fixDot1, 106, 102, 35, 35);
									ctx.font="12px Gothic";
									ctx.fillStyle="green";
									ctx.fillText(roomInfo.roomMbrList[1].frndRelName, 140, 122);
								};

							}
						horizontalLine(true);
				    	}
					}

			    	if( (roomInfo.roomMbrList[3] && roomInfo.roomMbrList[3] != null)){
				    	if(roomInfo.roomMbrList[2].roomMbrId
					    		== roomInfo.roomMbrList[3].mbrId) {
				    		if( (roomInfo.roomMbrList[2].frndRelId != "" &&
					    			roomInfo.roomMbrList[2].frndRelId != null)
							    		&& (roomInfo.roomMbrList[2].frndRelName != null &&
							    				roomInfo.roomMbrList[2].frndRelName != "") ) {


				    			var fixDot2 = new Image(); // 아래선
				    			fixDot2.src = "../images/common/fixdot.png";
				    			fixDot2.onload = function() {
									ctx.drawImage(fixDot2, 140, 218, 35, 35);
									ctx.font="12px Gothic";
									ctx.fillStyle="green";
									ctx.fillText(roomInfo.roomMbrList[2].frndRelName, 139, 266);

								};

							}
						third(true);
				    	}
					}


				// 라스트멤버
		    	if( (roomInfo.roomMbrList[3] && roomInfo.roomMbrList[3] != null) &&
		    			(roomInfo.roomMbrList[1] && roomInfo.roomMbrList[1] != null)){
			    	if(roomInfo.roomMbrList[3].roomMbrId
			    			== roomInfo.roomMbrList[1].mbrId) {
			    		if( (roomInfo.roomMbrList[3].frndRelId != "" &&
				    			roomInfo.roomMbrList[3].frndRelId != null)
						    		&& (roomInfo.roomMbrList[3].frndRelName != null &&
						    				roomInfo.roomMbrList[3].frndRelName != "") ) {

			    			var fixDot1 = new Image(); // 대각선2 아래쪽 아이콘
							fixDot1.src = "../images/common/fixdot.png";
							fixDot1.onload = function() {
								ctx.drawImage(fixDot1, 106, 170, 35, 35);
								ctx.font="12px Gothic";
								ctx.fillStyle="green";
								ctx.fillText(roomInfo.roomMbrList[1].frndRelName, 143, 195);
							};
						}
					verticalLine(true);
			    	}
				}
		    	if( (roomInfo.roomMbrList[3] && roomInfo.roomMbrList[3] != null) &&
							(roomInfo.roomMbrList[2] && roomInfo.roomMbrList[2] != null)){
		    		if(roomInfo.roomMbrList[3].roomMbrId
		    				== roomInfo.roomMbrList[2].mbrId) {
		    			if( (roomInfo.roomMbrList[3].frndRelId != "" &&
				    			roomInfo.roomMbrList[3].frndRelId != null)
						    		&& (roomInfo.roomMbrList[3].frndRelName != null &&
						    				roomInfo.roomMbrList[3].frndRelName != "") ) {


		    				var fixDot2 = new Image(); // 아래선
			    			fixDot2.src = "../images/common/fixdot.png";
			    			fixDot2.onload = function() {
								ctx.drawImage(fixDot2, 140, 218, 35, 35);
								ctx.font="12px Gothic";
								ctx.fillStyle="green";
								ctx.fillText(roomInfo.roomMbrList[2].frndRelName, 139, 266);

							};
						}
					third(true);
		    		}
				}
		    	if( (roomInfo.roomMbrList[3] && roomInfo.roomMbrList[3] != null) &&
						(roomInfo.roomMbrList[0] && roomInfo.roomMbrList[0] != null)){
			    	if(roomInfo.roomMbrList[3].roomMbrId
				    		== roomInfo.roomMbrList[0].mbrId) {
			    		if( (roomInfo.roomMbrList[3].frndRelId != "" &
				    			roomInfo.roomMbrList[3].frndRelId != null)
						    		& (roomInfo.roomMbrList[3].frndRelName != null &
						    				roomInfo.roomMbrList[3].frndRelName != "") ) {

			    			var fixDot3 = new Image(); // 왼쪽
			    			fixDot3.src = "../images/common/fixdot.png";
			    			fixDot3.onload = function() {
								ctx.drawImage(fixDot3, 52, 135, 35, 35);
								ctx.font="12px Gothic";
								ctx.fillStyle="green";
								ctx.fillText(roomInfo.roomMbrList[2].frndRelName, 88, 158);
							};

					}
					fourth(true);
			    	}
				}

				function first(yn){
					if(yn){

						  ctx.beginPath();
						  ctx.lineWidth="5";
						  ctx.strokeStyle="#33B5E5";
						  ctx.moveTo(55, 70);
						  ctx.lineTo(240, 70);
						  ctx.stroke();

					} else {

					}
				};

			    function second(yn) {
			    	if (yn) {
			    		 ctx.beginPath();
						  ctx.lineWidth="5";
						  ctx.strokeStyle="#33B5E5";
						  ctx.moveTo(250, 55);
						  ctx.lineTo(250, 250);
						  ctx.stroke();

			    	} else {

			    	}
			    };

			    function third(yn) {
			    	if (yn) {
			    		 ctx.beginPath();
						  ctx.lineWidth="5";
						  ctx.strokeStyle="#33B5E5";
						  ctx.moveTo(235, 235);
						  ctx.lineTo(70, 235);
						  ctx.stroke();
			    	} else {

			    	}
			    };


			    function fourth(yn) {
			    	if (yn) {

			    		 ctx.beginPath();
						  ctx.lineWidth="5";
						  ctx.strokeStyle="#33B5E5";
						  ctx.moveTo(70, 240);
						  ctx.lineTo(70, 55);
						  ctx.stroke();


			    	} else {

			    	}
			    };

			    function horizontalLine(yn) {
			    	if (yn) {
			    		 ctx.beginPath();
						  ctx.lineWidth="5";
						  ctx.strokeStyle="#33B5E5";
						  ctx.moveTo(250, 240);
						  ctx.lineTo(70, 70);
						  ctx.stroke();
			    	} else {

			    	}
			    };

			    function verticalLine(yn) {
			    	if (yn) {
			  		  ctx.beginPath();
					  ctx.lineWidth="5";
					  ctx.strokeStyle="#33B5E5";
					  ctx.moveTo(250, 70);
					  ctx.lineTo(70, 240);
					  ctx.stroke();
			    	} else {

			    	}
			    };

	    		ctx.font="15px Gothic";
	    		ctx.fillStyle="black";
	    		ctx.fillText(roomInfo.roomMbrList[0].mbrName, 50, 23);

			    var photo = new Image();
			    photo.src = roomInfo.roomMbrList[0].mbrPhotoUrl;
			    photo.border = "solid";

			    var ctx1 = canvas.getContext("2d");
			    var ctx2 = canvas.getContext("2d");

	    		photo.onload = function() {
	    			ctx1.beginPath();

	    			if(roomInfo.roomMbrList[1] && roomInfo.roomMbrList[1] != null && roomInfo.roomMbrList[1] != ""){
				    		ctx2.moveTo(250, 72);
				    		ctx2.arc(250, 72, 38, 0, Math.PI * 2);
			    			ctx.font="15px Gothic";
					    	ctx.fillStyle="black";
					    	ctx.fillText(roomInfo.roomMbrList[1].mbrName, 230, 23);

				    		var photo1 = new Image();
				    		photo1.src = roomInfo.roomMbrList[1].mbrPhotoUrl;
						    photo1.onload = function() {
						    	ctx.drawImage(photo1, 208, 30, 80, 80);
				    		};
	    			}

	    			if(roomInfo.roomMbrList[2] && roomInfo.roomMbrList[2] != null && roomInfo.roomMbrList[2] != ""){
			    			ctx1.moveTo(250, 233);
			    			ctx1.arc(250, 233, 38, 0, Math.PI * 2);
			    			ctx.font="15px Gothic";
							ctx.fillStyle="black";
							ctx.fillText(roomInfo.roomMbrList[2].mbrName, 230, 290);

				    		var photo2 = new Image();
				    		photo2.src = roomInfo.roomMbrList[2].mbrPhotoUrl;
						    photo2.onload = function() {
						    	ctx.drawImage(photo2, 208, 190, 80, 80);
				    		};

	    			}

	    			if(roomInfo.roomMbrList[3] && roomInfo.roomMbrList[3] != null && roomInfo.roomMbrList[3] != ""){
		    			ctx1.moveTo(70, 233);
		    			ctx1.arc(70, 233, 38, 0, Math.PI * 2);
		    			ctx.font="15px Gothic";
						ctx.fillStyle="black";
						ctx.fillText(roomInfo.roomMbrList[3].mbrName, 50, 290);

			    		var photo3 = new Image();
			    		photo3.src = roomInfo.roomMbrList[3].mbrPhotoUrl;
					    photo3.onload = function() {
					    	ctx.drawImage(photo3, 27, 190, 80, 80);
			    		};
	    			}

	    			ctx1.moveTo(70, 72);
	    			ctx1.arc(70, 72, 38, 0, Math.PI * 2);
	    			ctx1.strokeStyle="#cccccc";
	    			ctx1.lineWidth=6;
//	    			ctx1.shadowBlur=0.5;
//	    			ctx1.shadowColor="black";
	    			ctx1.stroke();
	    			ctx2.stroke();

		    		ctx1.clip();
	    			ctx.drawImage(photo, 27, 30, 80, 80);

	    		};



	  /*
	   * 	    var canvas = document.getElementById("myCanvas");
			    canvas.width = canvas.width;
			    var ctx = canvas.getContext("2d");

			    ctx.beginPath();
			    ctx.fillStyle="black";

			    var img = document.getElementById("back");
			    ctx.drawImage(img, 0, 0, 320, 320);

			    // 방장
			    if( (roomInfo.roomMbrList[2] && roomInfo.roomMbrList[2] != null)){
			    	if(roomInfo.roomMbrList[0].roomMbrId
			    		== roomInfo.roomMbrList[2].mbrId) {
			    		horizontalLine(true);
			    	}
				}

			    if( (roomInfo.roomMbrList[1] && roomInfo.roomMbrList[1] != null)){
			    	if(	roomInfo.roomMbrList[0].roomMbrId
				    		== roomInfo.roomMbrList[1].mbrId) {
					first(true);
			    	}
				}

			    if( (roomInfo.roomMbrList[3] && roomInfo.roomMbrList[3] != null)){
			    	if(roomInfo.roomMbrList[0].roomMbrId
				    		== roomInfo.roomMbrList[3].mbrId) {
					fourth(true);
			    	}
			    }

			    // 두번째 멤버
			    if( (roomInfo.roomMbrList[1] && roomInfo.roomMbrList[1] != null) &&
			    		(roomInfo.roomMbrList[3] && roomInfo.roomMbrList[3] != null)){

			    	if(roomInfo.roomMbrList[1].roomMbrId
			    			== roomInfo.roomMbrList[3].mbrId) {

			    		if( (roomInfo.roomMbrList[1].frndRelId != "" &&
				    			roomInfo.roomMbrList[1].frndRelId != null)
						    		&& (roomInfo.roomMbrList[1].frndRelName != null &&
						    				roomInfo.roomMbrList[1].frndRelName != "") ) {


			    			var fixDot1 = new Image(); // 대각선2 아래쪽 아이콘
							fixDot1.src = "../images/common/fixdot.png";
							fixDot1.onload = function() {
								ctx.drawImage(fixDot1, 100, 185, 40, 40);
								ctx.font="11px Gothic";
								ctx.fillStyle="green";
								ctx.fillText(roomInfo.roomMbrList[1].frndRelName, 137, 210);
								ctx.font="11px Gothic";
								ctx.fillStyle="crimson";

							};

						}
			    	verticalLine(true);
			    	}
			    }

			    if( (roomInfo.roomMbrList[1] && roomInfo.roomMbrList[1] != null) &&
			    				(roomInfo.roomMbrList[0] && roomInfo.roomMbrList[0] != null)){
			    	if(roomInfo.roomMbrList[1].roomMbrId
				    		== roomInfo.roomMbrList[0].mbrId) {
			    		if( (roomInfo.roomMbrList[1].frndRelId != "" &&
				    			roomInfo.roomMbrList[1].frndRelId != null)
						    		&& (roomInfo.roomMbrList[1].frndRelName != null &&
						    				roomInfo.roomMbrList[1].frndRelName != "") ) {

							var fixDot1 = new Image(); // 위쪽 선
							fixDot1.src = "../images/common/fixdot.png";
							fixDot1.onload = function() {
								ctx.drawImage(fixDot1, 140, 35, 40, 40);
								ctx.font="11px Gothic";
								ctx.fillStyle="green";
								ctx.fillText(roomInfo.roomMbrList[1].frndRelName, 140, 30);

							};

				    	}
					first(true);
			    	}
				}

			    if( (roomInfo.roomMbrList[1] && roomInfo.roomMbrList[1] != null) &&
								(roomInfo.roomMbrList[2] && roomInfo.roomMbrList[2] != null)){
			    	if(roomInfo.roomMbrList[1].roomMbrId
				    		== roomInfo.roomMbrList[2].mbrId) {
			    		if( (roomInfo.roomMbrList[1].frndRelId != "" &&
				    			roomInfo.roomMbrList[1].frndRelId != null)
						    		&& (roomInfo.roomMbrList[1].frndRelName != null &&
						    				roomInfo.roomMbrList[1].frndRelName != "") ) {

			    			var fixDot1 = new Image(); // 오른쪽
			    			fixDot1.src = "../images/common/fixdot.png";
			    			fixDot1.onload = function() {
								ctx.drawImage(fixDot1, 250, 140, 40, 40);
								ctx.font="11px Gothic";
								ctx.fillStyle="green";
								ctx.fillText(roomInfo.roomMbrList[1].frndRelName, 217, 165);

							};

						}
					second(true);
			    	}
	    		}

			    // 세번째 멤버
			    	if( (roomInfo.roomMbrList[2] && roomInfo.roomMbrList[2] != null)
			    			&& (roomInfo.roomMbrList[1] && roomInfo.roomMbrList[1] != null)){
				    	if(roomInfo.roomMbrList[2].roomMbrId
				    			== roomInfo.roomMbrList[1].mbrId) {
				    		if( (roomInfo.roomMbrList[2].frndRelId != "" &&
					    			roomInfo.roomMbrList[2].frndRelId != null)
							    		&& (roomInfo.roomMbrList[2].frndRelName != null &&
							    				roomInfo.roomMbrList[2].frndRelName != "") ) {

				    			var fixDot2 = new Image(); // 오른쪽
				    			fixDot2.src = "../images/common/fixdot.png";
				    			fixDot2.onload = function() {
									ctx.drawImage(fixDot2, 250, 140, 40, 40);
									ctx.font="11px Gothic";
									ctx.fillStyle="green";
									ctx.fillText(roomInfo.roomMbrList[2].frndRelName, 217, 165);

								};

							}
						second(true);
				    	}
					}

			    	if( (roomInfo.roomMbrList[2] && roomInfo.roomMbrList[2] != null)){
				    	if(roomInfo.roomMbrList[2].roomMbrId
					    		== roomInfo.roomMbrList[0].mbrId) {
				    		if( (roomInfo.roomMbrList[2].frndRelId != "" &&
					    			roomInfo.roomMbrList[2].frndRelId != null)
							    		&& (roomInfo.roomMbrList[2].frndRelName != null &&
							    				roomInfo.roomMbrList[2].frndRelName != "") ) {

				    			var fixDot2 = new Image(); // 대각선1 위쪽 아이콘
				    			fixDot2.src = "../images/common/fixdot.png";
				    			fixDot2.onload = function() {
									ctx.drawImage(fixDot2, 100, 95, 40, 40);
									ctx.font="11px Gothic";
									ctx.fillStyle="green";
									ctx.fillText(roomInfo.roomMbrList[2].frndRelName, 137, 120);

				    		};

							}
						horizontalLine(true);
				    	}
					}

			    	if( (roomInfo.roomMbrList[3] && roomInfo.roomMbrList[3] != null)){
				    	if(roomInfo.roomMbrList[2].roomMbrId
					    		== roomInfo.roomMbrList[3].mbrId) {
				    		if( (roomInfo.roomMbrList[2].frndRelId != "" &&
					    			roomInfo.roomMbrList[2].frndRelId != null)
							    		&& (roomInfo.roomMbrList[2].frndRelName != null &&
							    				roomInfo.roomMbrList[2].frndRelName != "") ) {


				    			var fixDot2 = new Image(); // 아래선
				    			fixDot2.src = "../images/common/fixdot.png";
				    			fixDot2.onload = function() {
									ctx.drawImage(fixDot2, 140, 250, 40, 40);
									ctx.font="11px Gothic";
									ctx.fillStyle="green";
									ctx.fillText(roomInfo.roomMbrList[2].frndRelName, 140, 305);

								};

							}
						third(true);
				    	}
					}


				// 라스트멤버
		    	if( (roomInfo.roomMbrList[3] && roomInfo.roomMbrList[3] != null) &&
		    			(roomInfo.roomMbrList[1] && roomInfo.roomMbrList[1] != null)){
			    	if(roomInfo.roomMbrList[3].roomMbrId
			    			== roomInfo.roomMbrList[1].mbrId) {
			    		if( (roomInfo.roomMbrList[3].frndRelId != "" &&
				    			roomInfo.roomMbrList[3].frndRelId != null)
						    		&& (roomInfo.roomMbrList[3].frndRelName != null &&
						    				roomInfo.roomMbrList[3].frndRelName != "") ) {

			    			var fixDot3 = new Image(); // 대각선2 아래쪽 아이콘
							fixDot3.src = "../images/common/fixdot.png";
							fixDot3.onload = function() {
								ctx.drawImage(fixDot3, 100, 185, 40, 40);
								ctx.font="11px Gothic";
								ctx.fillStyle="green";
								ctx.fillText(roomInfo.roomMbrList[3].frndRelName, 137, 210);
								ctx.font="11px Gothic";
								ctx.fillStyle="crimson";

							};
						}
					verticalLine(true);
			    	}
				}
		    	if( (roomInfo.roomMbrList[3] && roomInfo.roomMbrList[3] != null) &&
							(roomInfo.roomMbrList[2] && roomInfo.roomMbrList[2] != null)){
		    		if(roomInfo.roomMbrList[3].roomMbrId
		    				== roomInfo.roomMbrList[2].mbrId) {
		    			if( (roomInfo.roomMbrList[3].frndRelId != "" &&
				    			roomInfo.roomMbrList[3].frndRelId != null)
						    		&& (roomInfo.roomMbrList[3].frndRelName != null &&
						    				roomInfo.roomMbrList[3].frndRelName != "") ) {


		    				var fixDot3 = new Image(); // 아래선
							fixDot3.src = "../images/common/fixdot.png";
							fixDot3.onload = function() {
								ctx.drawImage(fixDot3, 140, 250, 40, 40);
								ctx.font="11px Gothic";
								ctx.fillStyle="green";
								ctx.fillText(roomInfo.roomMbrList[3].frndRelName, 140, 305);

							};
						}
					third(true);
		    		}
				}
		    	if( (roomInfo.roomMbrList[3] && roomInfo.roomMbrList[3] != null) &&
						(roomInfo.roomMbrList[0] && roomInfo.roomMbrList[0] != null)){
			    	if(roomInfo.roomMbrList[3].roomMbrId
				    		== roomInfo.roomMbrList[0].mbrId) {
			    		if( (roomInfo.roomMbrList[3].frndRelId != "" &
				    			roomInfo.roomMbrList[3].frndRelId != null)
						    		& (roomInfo.roomMbrList[3].frndRelName != null &
						    				roomInfo.roomMbrList[3].frndRelName != "") ) {

			    			var fixDot3 = new Image(); // 왼쪽
			    			fixDot3.src = "../images/common/fixdot.png";
			    			fixDot3.onload = function() {
								ctx.drawImage(fixDot3, 35, 140, 40, 40);
								ctx.font="11px Gothic";
								ctx.fillStyle="green";
								ctx.fillText(roomInfo.roomMbrList[3].frndRelName, 75, 165);
							};

					}
					fourth(true);
			    	}
				}

				function first(yn){
					if(yn){

						  ctx.beginPath();
						  ctx.lineWidth="5";
						  ctx.strokeStyle="crimson";
						  ctx.moveTo(55, 55);
						  ctx.lineTo(270, 55);
						  ctx.stroke();

					} else {

					}
				};

			    function second(yn) {
			    	if (yn) {
			    		 ctx.beginPath();
						  ctx.lineWidth="5";
						  ctx.strokeStyle="crimson";
						  ctx.moveTo(270, 55);
						  ctx.lineTo(270, 270);
						  ctx.stroke();

			    	} else {

			    	}
			    };

			    function third(yn) {
			    	if (yn) {

			    		 ctx.beginPath();
						  ctx.lineWidth="5";
						  ctx.strokeStyle="crimson";
						  ctx.moveTo(270, 270);
						  ctx.lineTo(55, 270);
						  ctx.stroke();


			    	} else {

			    	}
			    };

			    function fourth(yn) {
			    	if (yn) {

			    		 ctx.beginPath();
						  ctx.lineWidth="5";
						  ctx.strokeStyle="crimson";
						  ctx.moveTo(55, 270);
						  ctx.lineTo(55, 55);
						  ctx.stroke();


			    	} else {

			    	}
			    };

			    function horizontalLine(yn) {
			    	if (yn) {
			    		 ctx.beginPath();
						  ctx.lineWidth="5";
						  ctx.strokeStyle="crimson";
						  ctx.moveTo(270, 270);
						  ctx.lineTo(55, 55);
						  ctx.stroke();
			    	} else {

			    	}
			    };

			    function verticalLine(yn) {
			    	if (yn) {
			    		ctx.beginPath();
						  ctx.lineWidth="5";
						  ctx.strokeStyle="crimson";
						  ctx.moveTo(270, 55);
						  ctx.lineTo(55, 270);
						  ctx.stroke();
			    	} else {

			    	}
			    };

	    		ctx.font="13px Gothic";
	    		ctx.fillStyle="black";
	    		ctx.fillText(roomInfo.roomMbrList[0].mbrName, 34, 18);

			    var photo = new Image();
			    photo.src = roomInfo.roomMbrList[0].mbrPhotoUrl;
			    photo.border = "solid";

			    var ctx1 = canvas.getContext("2d");
			    var ctx2 = canvas.getContext("2d");

	    		photo.onload = function() {
	    			ctx1.beginPath();

	    			if(roomInfo.roomMbrList[1] && roomInfo.roomMbrList[1] != null && roomInfo.roomMbrList[1] != ""){
				    		ctx2.moveTo(270, 62);
				    		ctx2.arc(270, 62, 38, 0, Math.PI * 2);
			    			ctx.font="13px Gothic";
					    	ctx.fillStyle="black";
					    	ctx.fillText(roomInfo.roomMbrList[1].mbrName, 250, 18);

				    		var photo1 = new Image();
				    		photo1.src = roomInfo.roomMbrList[1].mbrPhotoUrl;
						    photo1.onload = function() {
						    	ctx.drawImage(photo1, 228, 22, 80, 80);
				    		};
	    			}

	    			if(roomInfo.roomMbrList[2] && roomInfo.roomMbrList[2] != null && roomInfo.roomMbrList[2] != ""){
			    			ctx1.moveTo(270, 263);
			    			ctx1.arc(270, 263, 38, 0, Math.PI * 2);
			    			ctx.font="13px Gothic";
							ctx.fillStyle="black";
							ctx.fillText(roomInfo.roomMbrList[2].mbrName, 250, 315);

				    		var photo2 = new Image();
				    		photo2.src = roomInfo.roomMbrList[2].mbrPhotoUrl;
						    photo2.onload = function() {
						    	ctx.drawImage(photo2, 228, 222, 80, 80);
				    		};

	    			}

	    			if(roomInfo.roomMbrList[3] && roomInfo.roomMbrList[3] != null && roomInfo.roomMbrList[3] != ""){
		    			ctx1.moveTo(50, 263);
		    			ctx1.arc(55, 263, 38, 0, Math.PI * 2);
		    			ctx.font="13px Gothic";
						ctx.fillStyle="black";
						ctx.fillText(roomInfo.roomMbrList[3].mbrName, 34, 315);

			    		var photo3 = new Image();
			    		photo3.src = roomInfo.roomMbrList[3].mbrPhotoUrl;
					    photo3.onload = function() {
					    	ctx.drawImage(photo3, 17, 222, 80, 80);
			    		};
	    			}

	    			ctx1.moveTo(55, 62);
	    			ctx1.arc(55, 62, 38, 0, Math.PI * 2);
	    			ctx1.strokeStyle="#cccccc";
	    			ctx1.lineWidth=6;
//	    			ctx1.shadowBlur=0.5;
//	    			ctx1.shadowColor="black";
	    			ctx1.stroke();
	    			ctx2.stroke();

		    		ctx1.clip();
	    			ctx.drawImage(photo, 17, 20, 80, 80);

	    		};
	   *
	   */










		} // if(success)

	}); // getJSON
}; // end



