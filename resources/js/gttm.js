// JavaScript Document
// function htmlToElement(html) {
//     var template = document.createElement('template');
//     template.innerHTML = html;
//     return template.content.firstChild;
// }
// document.querySelector("#intro-sound-player").components.sound.playSound();

// function fadeOutAnimStop(){
// 	this.components.sound.stopSound();
// 	this.removeAttribute('animation');
// 	this.removeEventListener("animationcomplete", fadeOutAnimStop);
// }
var i, t;

function soundFadeOut(elem){
	console.log(elem);
	i = setInterval(function(){
		var tmp = Number(elem.components.sound.attrValue.volume)-0.83;
		elem.components.sound.attrValue.volume = ""+tmp;
		console.log(elem.components.sound.attrValue.volume);
	}, 500);
	t = setTimeout(function(){
		elem.components.sound.stopSound();
		clearInterval(i);
		clearTimeout(t);
	}, 3000);
	// elem.setAttribute('animation', 'property:position; from: 0 0 0; to: 0 0 -5; easing: linear; dur: 3000');
	// elem.addEventListener('animationcomplete', fadeOutAnimStop);
}

var activeSP = null;
var arrID = ["0", "1", "2", "3"];
// setup cursor
AFRAME.registerComponent('cursor-listener', {
	init: function () {
		var cursor = document.getElementById("myCursor");
        var identifier = parseInt(this.el.getAttribute("id", 10));
		this.el.addEventListener('click', function (evt) {
			cursor.setAttribute('material', 'opacity', 0.8);
			cursor.setAttribute('geometry', 'primitive:ring; radiusInner: 0.0025; radiusOuter: 0.00375; thetaStart: 0; thetaLength: 360;');
			cursor.removeAttribute('animation');
            if(this.className == "button") {
                for(int i=0; i < 4; i++)
                    {
                        var curBut = document.getElementById(arrID[i]);
                        if(i != identifier) {
                            curBut.setAttribute("material", "src: #voteClosed");
                        } else {
                            curBut.setAttribute("material", "src: #voteThanks");
                        }
                    }
            }
			if(this.className == "blurb-view-opener"){
				this.setAttribute('visible', 'false'); //sphere
				var artifact = this.parentNode.childNodes[7]; //object
				artifact.setAttribute('position', '-2 0 0');
				this.parentNode.childNodes[1].setAttribute('visible', false); //title
				this.parentNode.childNodes[3].setAttribute('visible', true); //blurb
				this.parentNode.childNodes[5].setAttribute('position', '0 0 5'); //pink thing
				if(activeSP){
					activeSP.components.sound.stopSound();
				}
				clearInterval(i);
				clearTimeout(t);
				activeSP = this.parentNode.childNodes[11];
				activeSP.components.sound.attrValue.volume = "5";
				activeSP.components.sound.playSound();
				// this.parentNode.childNodes[11].setAttribute('position', '0 0 0');
				
			}
		});
		this.el.addEventListener('mouseenter', function (evt) {
			cursor.setAttribute('material', 'opacity', 1);
			if(this.className != "blurb-view-closer")
				cursor.setAttribute('animation', 'property:geometry.thetaLength; dur: 2000; easing: easeInOutSine; from: 0; to: 360');
		});
		this.el.addEventListener('mouseleave', function (evt) {
			cursor.setAttribute('material', 'opacity', 0.8);
			cursor.setAttribute('geometry', 'primitive:ring; radiusInner: 0.0025; radiusOuter: 0.00375; thetaStart: 0; thetaLength: 360;');
			cursor.removeAttribute('animation');
			if(this.className == "blurb-view-closer"){
				this.parentNode.childNodes[9].setAttribute('visible', 'true'); //sphere
				var artifact = this.parentNode.childNodes[7]; //object
				artifact.setAttribute('position', '0 0 0');
				this.parentNode.childNodes[1].setAttribute('visible', true); //title
				this.parentNode.childNodes[3].setAttribute('visible', false); //blurb
				this.parentNode.childNodes[5].setAttribute('position', '0 0 0'); //pink thing
				soundFadeOut(this.parentNode.childNodes[11]);
			}
		});
	}
});

// BEGIN BLURB VIEWING DELICIOUSNESS

// This creates an event listener for box with ID "0" that causes the sky transparency to fade up to 100% over five seconds.


// JavaScript Document
// This creates an event listener for box with ID "0" that causes the sky transparency to fade up to 100% over five seconds.


// var place = "outside";


var room = document.getElementById("room");
var mysky = document.getElementById("sky");
var myQuad = document.getElementById("quad");
var myOuter = document.getElementById("outerRing");
var myMiddle = document.getElementById("middleRing");
var myInner = document.getElementById("innerRing");
var portal = document.getElementById("portal-plane");
var seedPod = document.getElementById("seedPod");

var isOutside = true;

function setAttributes(el, attrs) {
	for(var key in attrs) {
		el.setAttribute(key, attrs[key]);
	}
}

function initRoom(){
	moveHiddenPortal();
	document.querySelector("#ambience-sound-player").components.sound.playSound();
	var sp = document.querySelector("#intro-sound-player");
	activeSP = sp;
	setTimeout(function(){
		//enable cursor on blurb views after the intro sound
		var set = document.querySelectorAll(".blurb-view-opener");
		for(var i = 0; i < set.length; i++){
			set[i].setAttribute("cursor-listener", null);
			set[i].parentNode.childNodes[7].setAttribute('animation', 'property: rotation; from: 0 0 0; to: 0 360 0; loop: true; dur: 5000; easing: linear');
		}
	}, 50);
	sp.components.sound.playSound();
	mysky.removeEventListener("animationcomplete", initRoom);

	// sp.components.sound.stopSound();

}

var moveHiddenPortal = function(){
	if(isOutside){
		portal.setAttribute("animation", "property: position; to: 0 -36 0");
	}
	else{
		portal.setAttribute("animation", "property: position; to: 0 -3 0");
		portal.setAttribute("width", "8");
		portal.setAttribute("depth", "8");
	}
}

portal.addEventListener('click', function()
{
	if (isOutside){
		// place="inside";

		room.setAttribute('class',"unclickable");
		isOutside = false;
		document.querySelector('a-entity').flushToDOM(true); // what is this for? -Nate
		// setTimeout(function(){
		// 	setAttributes(portal, {
		// 		"position":"0 5 0",
		// 		"height":"100"
		// 	});
		// 	console.log(portal.getAttribute("height"));
		// }, 8000);

		//animation to pull user into room location


		// var zoomup = document.createElement("a-animation");
		// setAttributes(zoomup, {
		// "id": "zoomUp",
		// "attribute": "position",
		// "dur": "5000",
		// "delay": "200",
		// "to": "0 -74.5 0"
		// });
		mysky.setAttribute("animation", "property: position; dur:5000; delay: 200; to: 0 -74.5 0; ");

		mysky.addEventListener("animationcomplete", initRoom);
		// moveHiddenPortal();

		//animation to fade in the outside world panorama


		var fadeUp = document.createElement("a-animation");
		setAttributes(fadeUp, {
			"id": "zoomUp",
			"attribute": "opacity",
			"dur": "200",
			"to": "100"
		});

		//animatioin to fade in the room panorama


		var roomFadeUp = document.createElement("a-animation");
		setAttributes(roomFadeUp, {
			"attribute": "opacity",
			"dur": "200",
			"delay": "3300",
			"to": "1"
		});

		//fades seed up when entering room



		var fadeSeedUp = document.createElement("a-animation");
		setAttributes(fadeSeedUp, {
			"attribute": "opacity",
			"dur": "200",
			"delay": "3300",
			"to": "1"
		});


		// animation to move portal down when entering room

		var fadeOuterPortalOut = document.createElement("a-animation");
		setAttributes(fadeOuterPortalOut, {
			"attribute": "opacity",
			"dur": "200",
			"delay": "3300",
			"to": "0"
		});


		var fadeMiddlePortalOut = document.createElement("a-animation");
		setAttributes(fadeMiddlePortalOut, {
			"attribute": "opacity",
			"dur": "200",
			"delay": "3300",
			"to": "0"
		});


		var fadeInnerPortalOut = document.createElement("a-animation");
		setAttributes(fadeInnerPortalOut, {
			"attribute": "opacity",
			"dur": "200",
			"delay": "3300",
			"to": "0"
		});

		var fadeOuterPortalUp = document.createElement("a-animation");
		setAttributes(fadeOuterPortalUp, {
			"attribute": "opacity",
			"dur": "200",
			"delay": "5000",
			"to": "1"
		});



		var fadeMiddlePortalUp = document.createElement("a-animation");
		setAttributes(fadeMiddlePortalUp, {
			"attribute": "opacity",
			"dur": "200",
			"delay": "5000",
			"to": "1"
		});


		var fadeInnerPortalUp = document.createElement("a-animation");
		setAttributes(fadeInnerPortalUp, {
			"attribute": "opacity",
			"dur": "200",
			"delay": "5000",
			"to": "1"
		});



		var scaleOuterPortalDown = document.createElement("a-animation");
		setAttributes(scaleOuterPortalDown, {
			"attribute": "scale",
			"dur": "200",
			"delay": "3300",
			"to": "0.5 0.5 0.5"
		});


		var scaleMiddlePortalDown = document.createElement("a-animation");
		setAttributes(scaleMiddlePortalDown, {
			"attribute": "scale",
			"dur": "200",
			"delay": "3300",
			"to": "0.5 0.5 0.5"
		});



		var scaleInnerPortalDown = document.createElement("a-animation");
		setAttributes(scaleInnerPortalDown, {
			"attribute": "scale",
			"dur": "200",
			"delay": "3300",
			"to": "0.5 0.5 0.5"
		});


		//Animation to scale portal for being inside room



		var moveOuterPortalDown = document.createElement("a-animation");
		setAttributes(moveOuterPortalDown, {
			"attribute": "position",
			"dur": "200",
			"delay": "3300",
			"to": "0 -3 0"
		});



		var moveMiddlePortalDown = document.createElement("a-animation");
		setAttributes(moveMiddlePortalDown, {
			"attribute": "position",
			"dur": "200",
			"delay": "3300",
			"to": "0 -3 0"
		});

		var moveInnerPortalDown = document.createElement("a-animation");
		setAttributes(moveInnerPortalDown, {
			"attribute": "position",
			"dur": "200",
			"delay": "3300",
			"to": "0 -3 0"
		});



		var changeOuterMaterial = document.createElement("a-animation");
		setAttributes(changeOuterMaterial, {
			"attribute": "mtl",
			"dur": "200",
			"delay": "3800",
			"to": "white"
		});

		var changeMiddleMaterial = document.createElement("a-animation");
		setAttributes(changeMiddleMaterial, {
			"attribute": "mtl",
			"dur": "200",
			"delay": "3800",
			"to": "white"
		});


		var changeInnerMaterial = document.createElement("a-animation");
		setAttributes(changeInnerMaterial, {
			"attribute": "mtl",
			"dur": "200",
			"delay": "3800",
			"to": "white"
		});



		myQuad.appendChild(fadeUp);
		// mysky.appendChild(zoomup);
		room.appendChild(roomFadeUp);
		myOuter.appendChild(scaleOuterPortalDown);
		myOuter.appendChild(moveOuterPortalDown);
		myMiddle.appendChild(scaleMiddlePortalDown);
		myMiddle.appendChild(moveMiddlePortalDown);
		myInner.appendChild(scaleInnerPortalDown);
		myInner.appendChild(moveInnerPortalDown);
		myOuter.appendChild(changeOuterMaterial);
		myMiddle.appendChild(changeMiddleMaterial);
		myInner.appendChild(changeInnerMaterial);
		myOuter.appendChild(fadeOuterPortalOut);
		myMiddle.appendChild(fadeMiddlePortalOut);
		myInner.appendChild(fadeInnerPortalOut);
		myOuter.appendChild(fadeOuterPortalUp);
		myMiddle.appendChild(fadeMiddlePortalUp);
		myInner.appendChild(fadeInnerPortalUp);
		seedPod.appendChild(fadeSeedUp);

	}

// });


// backPortol.addEventListener('click',function(){

// 	"use strict";

else{
	//animation to pull user into room location
	isOutside = true;

	var zoomdown = document.createElement("a-animation");
	setAttributes(zoomdown, {
		"id": "zoomUp",
		"attribute": "position",
		"dur": "5000",
		"delay": "200",
		"to": "0 0 0"
	});

		//animation to fade out the outside world panorama once you land back on earth



		var fadeUp = document.createElement("a-animation");
		setAttributes(fadeUp, {
			"id": "zoomUp",
			"attribute": "opacity",
			"dur": "4000",
			"delay": "200",
			"to": "0"
		});

		//animatioin to fade out the room panorama


		var roomFadeOut = document.createElement("a-animation");
		setAttributes(roomFadeOut, {
			"attribute": "opacity",
			"dur": "200",
			"delay": "3300",
			"to": "0"
		});


		var fadeSeedDown = document.createElement("a-animation");
		setAttributes(fadeSeedDown, {
			"attribute": "opacity",
			"dur": "200",
			"delay": "1000",
			"to": "0"
		});


		// animation to move portal down when entering room
		var fadeOuterPortalOut = document.createElement("a-animation");
		setAttributes(fadeOuterPortalOut, {
			"attribute": "opacity",
			"dur": "200",
			"delay": "3300",
			"to": "1"
		});


		var fadeMiddlePortalOut = document.createElement("a-animation");
		setAttributes(fadeMiddlePortalOut, {
			"attribute": "opacity",
			"dur": "200",
			"delay": "3300",
			"to": "1"
		});


		var fadeInnerPortalOut = document.createElement("a-animation");
		setAttributes(fadeInnerPortalOut, {
			"attribute": "opacity",
			"dur": "200",
			"delay": "3300",
			"to": "1"
		});


		var fadeOuterPortalUp = document.createElement("a-animation");
		setAttributes(fadeOuterPortalUp, {
			"attribute": "opacity",
			"dur": "200",
			"delay": "5000",
			"to": "1"
		});


		var fadeMiddlePortalUp = document.createElement("a-animation");
		setAttributes(fadeMiddlePortalUp, {
			"attribute": "opacity",
			"dur": "200",
			"delay": "5000",
			"to": "1"
		});

		var fadeInnerPortalUp = document.createElement("a-animation");
		setAttributes(fadeInnerPortalUp, {
			"attribute": "opacity",
			"dur": "200",
			"delay": "5000",
			"to": "1"
		});


		var scaleOuterPortalUp = document.createElement("a-animation");
		setAttributes(scaleOuterPortalUp, {
			"attribute": "scale",
			"dur": "200",
			"delay": "3300",
			"to": "10 10 10"
		});


		var scaleMiddlePortalUp = document.createElement("a-animation");
		setAttributes(scaleMiddlePortalUp, {
			"attribute": "scale",
			"dur": "200",
			"delay": "3300",
			"to": "10 10 10"
		});



		var scaleInnerPortalUp = document.createElement("a-animation");
		setAttributes(scaleInnerPortalUp, {
			"attribute": "scale",
			"dur": "200",
			"delay": "3300",
			"to": "10 10 10"
		});


		//Animation to scale portal for being inside room


		var moveOuterPortalUp = document.createElement("a-animation");
		setAttributes(moveOuterPortalUp, {
			"attribute": "position",
			"dur": "200",
			"delay": "3300",
			"to": "0 0 0"
		});


		var moveMiddlePortalUp = document.createElement("a-animation");
		setAttributes(moveMiddlePortalUp, {
			"attribute": "position",
			"dur": "200",
			"delay": "3300",
			"to": "0 0 0"
		});


		var moveInnerPortalUp = document.createElement("a-animation");
		setAttributes(moveInnerPortalUp, {
			"attribute": "position",
			"dur": "200",
			"delay": "3300",
			"to": "0 0 0"
		});


		var changeOuterMaterial = document.createElement("a-animation");
		setAttributes(changeOuterMaterial, {
			"attribute": "mtl",
			"dur": "200",
			"delay": "3800",
			"to": "#74FF31"
		});


		var changeMiddleMaterial = document.createElement("a-animation");
		setAttributes(changeMiddleMaterial, {
			"attribute": "mtl",
			"dur": "200",
			"delay": "3800",
			"to": "#74FF31"
		});


		var changeInnerMaterial = document.createElement("a-animation");
		setAttributes(changeInnerMaterial, {
			"attribute": "mtl",
			"dur": "200",
			"delay": "3800",
			"to": "#74FF31"
		});






		myQuad.appendChild(fadeUp);
		mysky.appendChild(zoomdown);
		room.appendChild(roomFadeOut);
		myOuter.appendChild(scaleOuterPortalUp);
		myOuter.appendChild(moveOuterPortalUp);
		myMiddle.appendChild(scaleMiddlePortalUp);
		myMiddle.appendChild(moveMiddlePortalUp);
		myInner.appendChild(scaleInnerPortalUp);
		myInner.appendChild(moveInnerPortalUp);
		myOuter.appendChild(changeOuterMaterial);
		myMiddle.appendChild(changeMiddleMaterial);
		myInner.appendChild(changeInnerMaterial);
		myOuter.appendChild(fadeOuterPortalOut);
		myMiddle.appendChild(fadeMiddlePortalOut);
		myInner.appendChild(fadeInnerPortalOut);
		myOuter.appendChild(fadeOuterPortalUp);
		myMiddle.appendChild(fadeMiddlePortalUp);
		myInner.appendChild(fadeInnerPortalUp);
		seedPod.appendChild(fadeSeedDown);
	}

});




