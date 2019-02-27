const showFps = active ? document.body.appendChild(document.createElement('div')) : 0;

let active = true;
let fps = 0;
let fpstime = 0;
let framecount = 0;

export function update(dt) {
    if(!active) return;

    if (fpstime > 0.25) {
        fps = Math.round(framecount / fpstime);
        showFps.textContent = fps;
        fpstime = 0;
        framecount = 0;
    }
    
    fpstime += dt;
    framecount++;
}