/*  arman 26.10.2018

	Enthält main-loop mit requestAnimationFrame;
	- Berechnet deltaTime (vergangene Zeit seit dem letztem frame);
	- Ruft jedes Frame die Funktionen im Array update auf. Parameter der Funktionen: deltaTime;
	- Ruft jedes frame die Funktionen im Array fixedUpdate so oft auf,
	  bis die in der Variable fixedDelta festgelegte Anzahl an Updates pro Zeiteinheit ausgeführt wurde;
	
	Schnittstellen:
		pushFixedUpdate(fn): fügt fixedUpdate-Array eine Funktion hinzu;
		pushUpdate(fn): fügt update-Array eine Funktion hinzu;
*/

export function pushFixedUpdate(fixedUpdateFn) {
	if(typeof fixedUpdateFn === 'function') fixedUpdate.push(fixedUpdateFn);
}
export function pushUpdate(updateFn) {
	if(typeof updateFn === 'function') update.push(updateFn);
}

const fixedUpdate = [];
const update = [];
const fixedDelta = 1 / 120;
let lastframe = 0;
let	deltaTime = 0;
let	frameDelta = 0;

function mainLoop(tframe) {
	window.requestAnimationFrame(mainLoop);

	deltaTime = (tframe - lastframe) / 1000;	
	lastframe = tframe;

	frameDelta += deltaTime;
	while (frameDelta >= fixedDelta) {
		for(let fn of fixedUpdate) fn();
		frameDelta -= fixedDelta;
	};

	for(let fn of update) fn(deltaTime);
}

// start mainLoop
console.log('starting main-loop');
mainLoop(0);
