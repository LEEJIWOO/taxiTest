console.log("commonjs...");

//var rootPath = "http://buru1020.cafe24.com/taxi";		//호스팅
var rootPath = "http://localhost:9999/taxi";		//로컬
//var rootPath = "http://192.168.0.45:9999/taxi";	//비트_상헌
//var rootPath = "http://192.168.0.3:9999/taxi";	//비트_지우
//var rootPath = "http://192.168.41.10:9999/taxi";	//비트_경식
//var rootPath = "http://192.168.43.61:9999/taxi";	//임시

var setSessionItem = function (key, value) {
	console.log("setSessionItem(", key,", ", value+")");
//	console.log(key, value);
	sessionStorage.setItem(key, JSON.stringify(value));
};
var getSessionItem = function (key) {
	console.log("getSessionItem(key)");
//	console.log(key);
	return JSON.parse(sessionStorage.getItem(key));	
};
var removeSessionItem = function (key) {
	console.log("removeSessionItem(key)");
	sessionStorage.removeItem(key);
};
var clearSession = function () {
	console.log("clearSession()");
	sessionStorage.clear();
};
setSessionItem("rootPath", "/" + window.location.pathname.split("/")[1]);


var changeHref = function (url, jsonObject) {
	console.log("changeHref(url, jsonObjec)");
//	console.log(url, jsonObject));
	if (jsonObject) {
		setSessionItem("hrefParams", jsonObject);
	}
	window.location.href = url;
};

var getHrefParams = function () {
	console.log("getHrefParams()");
	var hrefParams = getSessionItem("hrefParams");
//	removeSessionItem("hrefParams");
	return hrefParams; 
};
var setParams = function (url, jsonObject) {
	console.log("setParams(url, jsonObjec)");
//	console.log(url, jsonObject));
	
	if (jsonObject) {
		return url += "?params=" + JSON.stringify(jsonObject);
	} else {
		return url;
	}
};

var getParams = function (url) {
	console.log("getParams(url)");
//	console.log(url);
	
	var splitUrl = decodeURI(url).split("?params=");
	if ( splitUrl.length > 1 ) {
		return JSON.parse( splitUrl[1] );
	} else {
		return ;
	}
};


var getDate = function (dateStr) {
	console.log("getDate()");
	return new Date(dateStr.replace(" ", "T"));
};

var authCheck = function () {
	console.log("authCheck()");
	var hrefArr = window.location.href.split("/auth/");
	var curHtml = hrefArr[hrefArr.length-1];
	
	if ( curHtml != "auth.html" ) {
		$.getJSON( rootPath + "/auth/loginInfo.do", function(result) {
			console.log(result.status);
			if (result.status == "success") {
				setSessionItem("loginInfo", result.data);
				
			} else {
				alert("사용자 인증 실패!");
				window.location.href = "../auth/auth.html";
				
			}
		});
	}
};
authCheck();



/**
 * params (
 * 		x 			: 지도의 x좌표,
 * 		y 			: 지도의 y좌표,
 * 		locName	: 지명
 * 		prefix		: 앞에 수식될 문구
 * 		startSession_callback : 세션등록후 처리될 콜백 함수
 */
var setStartSession = function(x, y, locName, prefix, startSession_callback) {
	console.log("setSessionStart(x, y, locName, prefix, startSession_callback)");
//	console.log(x, y, locName, prefix, startSession_callback);
	
	if ( !prefix ) {
		prefix = "";
	}
	
	if ( locName && locName != null && locName.length > 0 ) {
		$.getJSON( rootPath + "/room/setLocationSession.do",{
			startName : locName,
			startX : x,
			startY : y,
			startPrefix :  prefix
		}, function(result) {
			startSession_callback();
		});

	} else {
	  	geocoder.geocode(
				{
			  		type: 1,
			  		isJibun: 1,
			  		x: x, 
			  		y: y
				}, 
				"setStartSession_callback");
	  	setStartSession_callback = function(data) {
	  		console.log("setStartSession_callback(data)");
//	  		console.log(data);
	  		
			var geocoderResult = geocoder.parseGeocode(data);
			if(geocoderResult["count"] != "0") {
				var infoArr = geocoderResult["infoarr"];
				for(var i=0; i<infoArr.length; i++){
					$.getJSON( rootPath + "/room/setLocationSession.do",{
						startName : infoArr[i].address,
						startX : infoArr[i].x,
						startY : infoArr[i].y,
						startPrefix :  prefix
					}, function(result) {
						startSession_callback();
					});
				}
			}
		};
		
	}
};

/**
 * params (
 * 		x 			: 지도의 x좌표,
 * 		y 			: 지도의 y좌표,
 * 		locName	: 지명
 * 		prefix		: 앞에 수식될 문구
 * 		endSession_callback : 세션등록후 처리될 콜백 함수
 */
var setEndSession = function(x, y, locName, prefix, endSession_callback) {
	console.log("setEndSession(x, y, locName, prefix, startSession_callback)");
//	console.log(x, y, locName, prefix, startSession_callback);
	
	if ( !prefix ) {
		prefix = "";
	}
	
	if ( locName && locName != null && locName.length > 0 ) {
		$.getJSON( rootPath + "/room/setLocationSession.do",{
			endName : locName,
			endX : x,
			endY : y,
			endPrefix :  prefix
		}, function(result) {
			endSession_callback();
		});

	} else {
	  	geocoder.geocode(
				{
			  		type: 1,
			  		isJibun: 1,
			  		x: x, 
			  		y: y
				}, 
				"setEndSession_callback");
	  	setEndSession_callback = function(data) {
	  		console.log("setEndSession_callback(data)");
//	  		console.log(data);
	  		
			var geocoderResult = geocoder.parseGeocode(data);
			if(geocoderResult["count"] != "0") {
				var infoArr = geocoderResult["infoarr"];
				for(var i=0; i<infoArr.length; i++){
					$.getJSON( rootPath + "/room/setLocationSession.do",{
						endName : infoArr[i].address,
						endX : infoArr[i].x,
						endY : infoArr[i].y,
						endPrefix :  prefix
					}, function(result) {
						endSession_callback();
					});
				}
			}
		};
		
	}
};

/**
 * 거리에 따라 보여지는 형식 변경
 * 1000m 이하: m
 * 1000m 이상: km
 */
var changeDistanceUnit = function(distance) {
	if ( distance < 1000 ) {
		return distance + "m"; 
	} else {
		distance = distance  / 10.0;
		distance = Math.round(distance) / 100;
		return distance.toString() + "km";
	}
};

/**
 * 택시요금 계산
 */
var calcTaxiFare = function(distance) {
	
	var distanceFare = (distance / 142) * 100;

	var durationFare =
			Math.round(((
				(Math.round(distance) * 60) - 540) / 35) * 100) / 2;

	var totalFare = Math.round(distanceFare + 3000);
	totalFare = totalFare.toString().substr(
										0, totalFare.toString().length -2).concat("00원");
	
	return totalFare;
} ;







// Swipe Up & Down
(function() {
    var supportTouch = $.support.touch,
            scrollEvent = "touchmove scroll",
            touchStartEvent = supportTouch ? "touchstart" : "mousedown",
            touchStopEvent = supportTouch ? "touchend" : "mouseup",
            touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
    $.event.special.swipeupdown = {
        setup: function() {
            var thisObject = this;
            var $this = $(thisObject);
            $this.bind(touchStartEvent, function(event) {
                var data = event.originalEvent.touches ?
                        event.originalEvent.touches[ 0 ] :
                        event,
                        start = {
                            time: (new Date).getTime(),
                            coords: [ data.pageX, data.pageY ],
                            origin: $(event.target)
                        },
                        stop;

                function moveHandler(event) {
                    if (!start) {
                        return;
                    }
                    var data = event.originalEvent.touches ?
                            event.originalEvent.touches[ 0 ] :
                            event;
                    stop = {
                        time: (new Date).getTime(),
                        coords: [ data.pageX, data.pageY ]
                    };

                    // prevent scrolling
                    if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
                        event.preventDefault();
                    }
                }
                $this
                        .bind(touchMoveEvent, moveHandler)
                        .one(touchStopEvent, function(event) {
                    $this.unbind(touchMoveEvent, moveHandler);
                    if (start && stop) {
                        if (stop.time - start.time < 1000 &&
                                Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
                                Math.abs(start.coords[0] - stop.coords[0]) < 75) {
                            start.origin
                                    .trigger("swipeupdown")
                                    .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                        }
                    }
                    start = stop = undefined;
                });
            });
        }
    };
    $.each({
        swipedown: "swipeupdown",
        swipeup: "swipeupdown"
    }, function(event, sourceEvent){
        $.event.special[event] = {
            setup: function(){
                $(this).bind(sourceEvent, $.noop);
            }
        };
    });

})();