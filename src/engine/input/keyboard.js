export const key = {};

const keyString = {
	65: 'a',
	66: 'b',
	67: 'c',
	68: 'd',
	69: 'e',
	70: 'f',
	71: 'g',
	72: 'h',
	73: 'i',
	74: 'j',
	75: 'k',
	76: 'l',
	77: 'm',
	78: 'n',
	79: 'o',
	80: 'p',
	81: 'q',
	82: 'r',
	83: 's',
	84: 't',
	85: 'u',
	86: 'v',
	87: 'w',
	88: 'x',
	89: 'y',
	90: 'z',
	37: 'left',
	39: 'right',
	38: 'up',
	40: 'down',
	13: 'enter',
	32: 'space'
};

function onKeyDown(e){
	key[keyString[e.keyCode]] = true;
}

function onKeyUp(e){
	key[keyString[e.keyCode]] = false;
}

document.addEventListener("keydown", onKeyDown, false);
document.addEventListener("keyup", onKeyUp, false);
