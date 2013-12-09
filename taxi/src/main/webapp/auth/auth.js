$(document).ready(function() {
	/* 임시 사용자 로그인 */ 
	console.log("tempLogin()...........");
	console.log(rootPath);
	$.ajax( rootPath + "/auth/login.do", {
		type: "POST",
		data: JSON.stringify( {mbrId: 10000001, friendList: [{}]} ),
		dataType: "json",
		contentType: "application/json",
		success: function(result) {
			if(result.status == "success") {
//				console.log(result.data);
				setSessionItem("loginInfo", result.data);
				console.log(getSessionItem("loginInfo"));
				
//				$.mobile.changePage("../home/home.html");
				changeHref("../home/home.html");
			} else {
				alert("회원정보가 맞지 않습니다.");
			}
		}
	});
	
	 
//	initFacebook();
//	
//	// 폰번호 입력시 validatePhone() 호출
//	$("#content").on('keyup','#txtPhone', function(e) {
//	   if (validatePhone('txtPhone')) {
//	       $('#spnPhoneStatus').text('Valid');
//	       $('#spnPhoneStatus').css('color', 'green');
//	       $("#next").css("display", "");
//	       
//	   } else {
//	      $('#spnPhoneStatus').text('Invalid');
//	      $('#spnPhoneStatus').css('color', 'red');
//	      $("#next").css("display", "none");
//	   }
//	});
//	
//	$("#btnPhoneNo").on('click', function(){
//		signUp( $("#txtPhone").val() );
//	});
});

initFacebook = function() {
	console.log("initFacebook()");
	window.fbAsyncInit = function() {
        FB.init({
			appId      : '536450846448669', 
			status     : true,        
			cookie     : true,          
			xfbml      : true,
			/* oauth : true */
        });
        
        getFacebookLoginStatus();
        
        FB.Event.subscribe('auth.login', function(response) {
        	getFacebookLoginStatus(); 
        });

	};
	(function(d){
		var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement('script'); js.id = id; js.async = true;
		js.src = "//connect.facebook.net/ko_KR/all.js";
		ref.parentNode.insertBefore(js, ref);
	}(document));
        
};

var getFacebookLoginStatus = function() {
	console.log("getFacebookLoginStatus()");
	FB.getLoginStatus(function(response) {
//		console.log(response);
	        if (response.status === 'connected') {
	        	$.ajax( rootPath + "/auth/isSignUp.do", {
	        		type: "POST",
	        		data: JSON.stringify( { mbrId: parseInt( response.authResponse.userID ) } ),
	        		dataType: "json",
	        		contentType: "application/json",
	        		success: function(result) {
	        			if(result.status == "success") {
	        				if (result.data) {
	        					login();
	    					} else {
	    						$.mobile.changePage("#divPhonePage");
	    					}
	        			} else {
	        				alert("시스템오류");
	        			}
	        		}
	        	});
	        	
	        	
//	        	$.ajax({
//	        		url:  rootPath + "/auth/isSignUp.do",
//	        		type: "POST",
//	        		data: {
//	        			mbrId: response.authResponse.userID
//	        		},
//	        		dataType: "json",
//	        		success: function(result) {
//	        			if (result.status == "success") {
//	        				if (result.data) {
//	        					login();
//	    					} else {
//	    						signUp();
//	    					}
//	        			} else {
//	        				alert("실행중 오류 발생");
//	        				console.log(result.data);
//	        			}
//	        		},
//	        		error: function(message) {
//	        			alert("서버와의 통신이 원활하지 않습니다.\n잠시 후 다시 시도하세요.");
//	        		}
//	        	});        	
	        	
//				$.post(  rootPath + "/auth/isSignUp.do", {
//					mbrId: mbrId
//				},
//				function(result) {
//					console.log("isSign");
//					console.log(result);
//					if (result.status == "success") {
//						if (result.data == true) {
//							login();
//						} else {
//							signUp();
//						}
//						
//					} else {
//						alert("실행중 오류 발생");
//						console.log(result.data);
//					}
//				},
//				"json");
	        	
	        } else if (response.status === 'not_authorized') {
	        	console.log("not_authorized");
	        	$.mobile.changePage("#divLoginPage");
	        	
	        } else {
	        	console.log("not_member");
	        	$.mobile.changePage("#divLoginPage");
	        	
	        }
	});
};



var signUp = function(phoneNo) {
	console.log("signUp()");
	console.log(phoneNo);
	getFacebookMemberInfo(function(userInfo) {
		userInfo.mbrPhoneNo = phoneNo;
		$.ajax( rootPath + "/auth/signup.do", {
    		type: "POST",
    		data: JSON.stringify( userInfo ),
    		dataType: "json",
    		contentType: "application/json",
    		success: function(result) {
    			if(result.status == "fail") {
    				alert("이메일이나 암호가 맞지 않습니다.");
    			} else {
    				alert("회원가입 성공");
    				login();
    			}
    		}
    	});
	});
};

var login = function() {
	console.log("login()");
	getFacebookMemberInfo(function(userInfo) {
		$.ajax( rootPath + "/auth/login.do", {
    		type: "POST",
    		data: JSON.stringify( userInfo ),
    		dataType: "json",
    		contentType: "application/json",
    		success: function(result) {
    			if(result.status == "success") {
    				setSessionItem("loginInfo", result.data);
//    				$.mobile.changePage("../home/home.html");
    				changeHref("../home/home.html");
    			} else {
    				alert("회원정보가 맞지 않습니다.");
    			}
    		}
    	});
	});
};

var getFacebookMemberInfo = function(callback) {
	console.log("getFacebookMemberInfo()");
	var userInfo = null;
	FB.api('me?fields=id,name,gender,picture.type(small)', 
			function(user) {
		if (user) {
        	userInfo = {
        			mbrId: 			parseInt( user.id ),
        			mbrName: 		user.name,
        			mbrGender:		user.gender,
        			mbrPhotoUrl: 	user.picture.data.url,
        			friendList:		[]
        	};
        }
		FB.api('/me/friends?fields=id,name,picture.type(small)', function(friends) {
            if (friends) {
            	userInfo.friendList = [friends.data.length];
            	for(var i = 0; i < friends.data.length; i++) {
            		userInfo.friendList[i] = {
                			frndId: 			parseInt( friends.data[i].id ),
                			mbrId:			userInfo.mbrId,
                			frndName: 		friends.data[i].name,
                			frndPhotoUrl: 	friends.data[i].picture.data.url
                	};
            	}
            	callback(userInfo);
            }
        });
	});  
	
};

// Phone Number 유효성 검사
var validatePhone = function(txtPhone) {
	console.log("validatePhone()");
    var testPhone = document.getElementById(txtPhone).value;
    var filter = /^[0-9-+]+$/;
    
    if(testPhone != '' && testPhone.length > 12 && testPhone.length < 14){
    	if (filter.test(testPhone)) {
    		return true;
    	} else {
    		return false;
    	}
    	return false;
    };
};