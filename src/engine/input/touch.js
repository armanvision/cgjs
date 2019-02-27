import { Vector2 } from "../util/vector2";
import { canvas, screen } from "../renderer";

export const inputTouch = {
    pointerPos: new Vector2(),
    touchLeftPos: new Vector2(),
    touchRightPos: new Vector2()
};

let touchLeftId = -1;
let touchRightId = -1;

// Touch
function onTouchStart(e) {
	e.preventDefault();
	if (e.targetTouches.length > 0) {
        for (let i = 0; i < e.changedTouches.length; i++) {
            if(getPointerPos(e.changedTouches[i]).x < screen.x / 2) {
                inputTouch.touchLeft = true;
                inputTouch.touchLeftPos.set(getPointerPos(e.changedTouches[i]));
                touchLeftId = e.changedTouches[i].identifier;
                inputTouch.pointerPos.set(getPointerPos(e.changedTouches[i]));
            }
            else if(getPointerPos(e.changedTouches[i]).x > screen.x / 2) {
                inputTouch.touchRight = true;
                inputTouch.touchRightPos.set(getPointerPos(e.changedTouches[i]));
                touchRightId = e.changedTouches[i].identifier;
                inputTouch.pointerPos.set(getPointerPos(e.changedTouches[i]));
            }
        }
	}
}

function onTouchMove(e) {
	for (let i = 0; i < e.changedTouches.length; i++) {
        if(e.changedTouches[i].identifier === touchLeftId) {
            inputTouch.touchLeftPos.set(getPointerPos(e.changedTouches[i]));
        }
        else if(e.changedTouches[i].identifier === touchRightId) {
            inputTouch.touchRightPos.set(getPointerPos(e.changedTouches[i]));
        }
    }
}

function onTouchEnd(e) {
    for (let i = 0; i < e.changedTouches.length; i++) {
        if(e.changedTouches[i].identifier === touchLeftId) {
            inputTouch.touchLeft = false;
            touchLeftId = -1;
        }
        else if(e.changedTouches[i].identifier === touchRightId) {
            inputTouch.touchRight = false;
            touchRightId = -1;
        }
    }
}

canvas.addEventListener("touchstart", onTouchStart, false);
canvas.addEventListener("touchmove", onTouchMove, false);
canvas.addEventListener("touchend", onTouchEnd, false);
canvas.addEventListener("touchcancel", onTouchEnd, false);

function getPointerPos(e) {
	const rect = canvas.getBoundingClientRect();
	return {
		x: Math.round((e.clientX - rect.left) * screen.x / canvas.width),
		y: Math.round((e.clientY - rect.top) * screen.y / canvas.height)
	};
}

/* 
function touchHandler(e) {
    if(e.touches) {
        playerX = e.touches[0].pageX - canvas.offsetLeft - playerWidth / 2;
        playerY = e.touches[0].pageY - canvas.offsetTop - playerHeight / 2;
        output.innerHTML = "Touch: "+ " x: " + playerX + ", y: " + playerY;
        e.preventDefault();
    }
} */
//https://developer.mozilla.org/en-US/docs/Web/API/Touch_events