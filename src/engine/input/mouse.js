import { Vector2 } from "../util/vector2";
import { canvas, screen } from "../renderer";

export const mouse = {
	position: new Vector2()
};

const buttonString = {
	0: 'lmb',
	1: 'mmb',
	2: 'rmb'
};

function getPointerPos(e) {
	const rect = canvas.getBoundingClientRect();
	return {
		x: Math.round((e.clientX - rect.left) * screen.x / canvas.width),
		y: Math.round((e.clientY - rect.top) * screen.y / canvas.height)
	};
}

// EVENT HANDLER
function onMouseDown(e) {
	e.preventDefault();
	mouse[buttonString[e.button]] = true;
	mouse.position.set(getPointerPos(e));
}

function onMouseMove(e) {
	mouse.position.set(getPointerPos(e));
}

function onMouseUp(e) {
	mouse[buttonString[e.button]] = false;
}
// END EVENT HANDLERS

canvas.addEventListener("mousedown", onMouseDown, false);
canvas.addEventListener("mousemove", onMouseMove, false);
canvas.addEventListener("mouseup", onMouseUp, false);
canvas.oncontextmenu = () => false;

/* export function clickedRect(point, area) {
    return (  point.x > area.pos.x
           && point.x < area.pos.x + area.size.x
           && point.y > area.pos.y
           && point.y < area.pos.y + area.size.y);
}

export function clickedCirqle(point, center, radius) {
    return Math.hypot(point.x - center.x, point.y - center.y) < radius ? true : false;
} */
