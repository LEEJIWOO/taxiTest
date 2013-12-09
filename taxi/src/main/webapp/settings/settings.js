$(document).ready(function() {
//	로그인 하면 강제적으로 기본 셋팅값 설정 출발지 1000m 도착지 1000m를 변경
	
	$("#btnAdd").click(function() {
		addRange();
	});
	
	$.getJSON( rootPath + "/settings/getRange.do", function(result){
		if(result.status == "success") {
			var setting = result.data;
			$("#startRange1").val(setting.startRange);
			$("#endRange1").val(setting.endRange);
		}else{
			alert("실행중 오류발생!");
			console.log(result.data);
			
		}
	});
	
	$("#btnLogoutAccept").click(function(){ 
		logout(); 
	}); 
	$("#btnLogoutCancel").click(function() {
		$("#popupLogout").popup("close");
	});

	$("#frndRefresh").click(function() {
		alert("aa");
		frndRefresh();
	});
	
	$("#btnLeave").click(function(){
		console.log("btnLeave");
		leaveMember(); 
	}); 
	$("#btnCancel").click(function(){ 
		console.log("close");
		$("#popupLeaveMember").popup("close");
	}); 
	$("#btnDeleteLocCancel").click(function() {
		$("#popupFvrtLoc").popup("close");
	});
	
	$("#btnChange").click(function(){
		fvrtLocLists();
	});
	
	$("#btnDeleteLoc").click(function() {
		deleteFvrtLoc();
	});
	
	$("#btnList").click(function(){
		listFvrtLoc();
	});
	
	$("#btnFvrtLocUpdate").click(function(){
    	fvrtLocUpdate();
	});
	
	$(".content").hide();
	$("#btnList").show();
	$("#btnList").click(function () {
	$(".content").toggle("slide");
	});
	
	$(".contents").hide();
	$("#btnChange").show();
	$("#btnChange").click(function () {
	$(".contents").toggle("slide");
	});
});
/*친구목록갱신 버튼*/
$( document ).on( "click", ".show-page-loading-msg", function() {
    var $this = $( this ),
        theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
        msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
        textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
        textonly = !!$this.jqmData( "textonly" );
        html = $this.jqmData( "html" ) || "";
    $.mobile.loading( "show", {
            text: msgText,
            textVisible: textVisible,
            theme: theme,
            textonly: textonly,
            html: html
    });
})
.on( "click", ".hide-page-loading-msg", function() {
    $.mobile.loading( "hide" );
});
//친구 목록 갱신
function frndRefresh(userInfo) { 
	console.log("왔어염");
	getFacebookMemberInfo(function(userInfo) {
		$.ajax("../member/frndRefresh.do", {
    		type: "POST",
    		data: JSON.stringify( {"userInfo": userInfo} ),
    		dataType: "json",
    		contentType: "application/json",
    		success: function(result) {
    			console.log(userInfo);
    			if(result.status == "success") {
    				alert("왔음");
//    				$.mobile.changePage("../main.html");
//    				window.location.href = "../main.html";
    				$( "#stop" ).listview('refresh');
    			} else {
    				alert("회원정보가 맞지 않습니다.");
    			}
    		}
    	});
	});
};			
//로그아웃
function logout() { 
	console.log("logout()");
//	event.preventDefault();
	$.getJSON("logout.do", function(result) { 
		if(result.status == "success") {
			alert("로그아웃이 성공적으로 되었습니다."); 
			FB.logout(function(response) {
				location.href = "../auth/auth.html"; 
			});
		} 
	}); 
};

//회원탈퇴
function leaveMember() { 
	$.getJSON("../auth/loginInfo.do", function(result) { 
		if(result.status == "success") { 
			var loginInfo=result.data; 
			$.post("../member/leaveMember.do",  
					{mbrId: loginInfo.mbrId}, 
					function(result) { 
						if(result.status == "success") { 
							alert("탈퇴가 성공적으로 되었습니다."); 
							FB.logout(function(response) {
								location.href = "../auth/auth.html"; 
							});
						} else { 
							alert("실행중 오류발생!"); 
							console.log(loginInfo); 
						} 
					}, 
			"json"); 
		} else { 
			console.log(result.data); 
		} 
	}); 
}

function deleteFvrtLoc() {
	console.log("!!!@");
	//$.getJSON("deleteFvrtLoc.do", function(result) {
	//console.log(어흥);
	//console.log(result.data);
	//console.log($(that).attr("fvrtLocNo"));
	
	$.getJSON("../member/deleteFavoritePlace.do?fvrtLocNo=" + $("#fvrtLocNo").attr("fvrtlocno"), function(result) {
		if(result.status == "success") {
			console.log(result.data);
			console.log(result);
			$("#popupFvrtLoc").popup("close");
			listFvrtLoc();
		} else {
			alert("실행중 오류발생!");
			console.log(result.data);
		}
	});
}
/*반경등록*/
function addRange(){
	$.post("updateRange.do", 
			{
		startRange: $("#startRange").val(),
		endRange: $("#endRange").val(),

			},
			function(result) {
				if(result.status == "success") {
				/*
				    $("li#selection select.select option").each(function(){
				        if($(this).val()==500){ // EDITED THIS LINE
				            $(this).attr("selected","selected");    
				        }else if($(this).val()==1000){ // EDITED THIS LINE
				            $(this).attr("selected","selected");
				        }else if($(this).val()==2000){
				        	$(this).attr("selected","selected");
				        }else if($(this).val()==3000){
				        	$(this).attr("selected","selected");
				        }
				        console.log(result.data);
				    });*/
					alert("등록되었습니다");
				} else {
					alert("실행중 오류발생!");
					console.log(result.data);
				}
			},
	"json");
	$.getJSON("getRange.do", function(result){
		if(result.status == "success") {
		var setting = result.data;
		$("#startRange1").val(setting.startRange);
		$("#endRange1").val(setting.endRange);
		}else{
				alert("실행중 오류발생!");
				console.log(result.data);
			
		}
	});
}
/*function addRange(){
	$.post("updateRange.do", 
			{
		startRange: $("#startRange").val(),
		endRange: $("#endRange").val(),
			},
			function(result) {
				if(result.status == "success") {
					alert("등록되었습니다");
				} else {
					alert("실행중 오류발생!");
					console.log(result.data);
				}
			},
	"json");
}*/

function listFvrtLoc(){
	$.getJSON("../member/getFavoritePlaces.do", function(result) {
		if(result.status == "success") {
			console.log(result);
			var fvrtLoc = result.data;
			var ul = $("#favoriteUl");
			$("#favoriteUl li").remove();
			for (var i in fvrtLoc) {
				$("<li>")
				.attr("data-theme","g")
				.attr("data-icon", "delete")
				.attr("id","fvrtLocNo")
				.attr("fvrtLocNo", fvrtLoc[i].fvrtLocNo)
				.attr("data-rank", fvrtLoc[i].fvrtLocRank)
				.append($("<a>")
						
						.attr("data-rel","popup")
						.attr("href","#popupFvrtLoc")
						.attr("data-fvrt_no", fvrtLoc[i].fvrtLocNo)
						.attr("id","selectView")
						.append($("<div>")
						.text(fvrtLoc[i].fvrtLocName) 
						.addClass("projectView")	
						))
						.appendTo(ul);
				$("#favoriteUl").listview("refresh");	
			}
		} else {
			console.log(result.data);
		}
	});
}

function selected(obj) {
	// HTML로 부터 변경된 값 가져오는 함수
	/*alert(obj[obj.selectedIndex].value);*/
}
/*즐겨찾기 우선순위 변경*/
$(function() {
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
    $( "#sortable" ).listview('refresh');
  });
function fvrtLocLists(){
$.getJSON("../member/getFavoritePlaces.do", function(result) { 
	if(result.status == "success") {
		var FvrtLoc = result.data;
		var ol = $("#sortable");
		$("#sortable li").remove();
		for(var i=0; i<FvrtLoc.length; i++){
			
			     $("<li>")
			        .attr("data-theme","g")
			     	.attr("data-fvrtNo", FvrtLoc[i].fvrtLocNo)
			     	.attr("data-rank", FvrtLoc[i].fvrtLocRank)
			     	.append($("<a>")
			     	.append($("<div>")
			     	.text(FvrtLoc[i].fvrtLocName)))
			        .appendTo(ol);
			         $( "#sortable" ).listview('refresh');
		}
	}else { 
		alert("실행중 오류발생!"); 
		console.log(getFvrtLoc); 
	}
},"json");
};
/*즐겨찾기 우선순위 변경 저장클릭시 이동*/
var fvrtLocUpdate = function(){
	var fvrtArr = [];
	for(var index = 0; index < $("#sortable>li").size(); index++ ) {
		fvrtArr[index] = {
				fvrtLocNo : $($("#sortable>li").get(index)).attr("data-fvrtNo"),
				fvrtLocName : $($("#sortable>li").get(index)).text(),
				fvrtLocRank : index + 1
		};
	};
	console.log(fvrtArr);
	rankUpdate(fvrtArr);
};
function rankUpdate(fvrtArr) {
	$(document).ready(function(){
	$.ajax("../member/changeFavoritePlaces.do", {
		type: "POST",
		data: JSON.stringify( { "fvrtArr" : fvrtArr} ) ,
		dataType: "json",
		contentType: "application/json",
		success: function(result) {
			console.log(fvrtArr);
			if(result.status == "success") {
    			console.log(result.data);
    			fvrtLocLists();
    			$("#sortable").listview('refresh');
            	location.href = "../settings/settings.html";
			} else {
			alert("실패");
		}
	},
});
});	
};
