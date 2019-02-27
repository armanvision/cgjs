export const renderer = {
    render() {  console.log('renderer loading spritesheet ...'); }
};

export function setSidescrollerCenter(sc) {
    sidescrollerCenter = sc;
}

export function setSpriteOffsetX(x) { // adjust pos, arman made bad sprites :(
    spriteOffsetX = x;
}
//###########################################################################
// canvas rendering
//

export const canvas = document.querySelector('main').appendChild(document.createElement('canvas'));
const ctx = canvas.getContext("2d");
const spritesheet = new Image;
export const screen = { x: 960, y: 540 };
let canvasOffset = { x: 0, y: 0};
let spriteOffsetX = 0;
let sidescrollerCenter = false;
let dpx = 1;

// init canvas size
canvas.style.width = screen.x + 'px';
canvas.style.height = screen.y + 'px';
canvas.style.marginTop = (-screen.y / 2) + 'px';
canvas.style.marginLeft = (-screen.x / 2) + 'px';
// init canvas resolution
canvas.width = screen.x;
canvas.height = screen.y;

spritesheet.onload = () => {
    console.log ("spritesheet loaded --rendering");
    
    renderer.render = (assets) => {        
        if(sidescrollerCenter) scroll();
        ctx.clearRect(-canvasOffset.x, -canvasOffset.y, canvas.width, canvas.height);
        for(let go in assets) {
            if(assets[go].sprite)
                ctx.drawImage( spritesheet
                             , assets[go].sprite.position.x, assets[go].sprite.position.y
                             , assets[go].sprite.scale.x, assets[go].sprite.scale.y
                             , assets[go].transform.position.x * dpx, assets[go].transform.position.y * dpx
                             , assets[go].transform.scale.x * dpx, assets[go].transform.scale.y * dpx );
        }
        if(sidescrollerCenter) ctx.restore();
    }
}
spritesheet.src = "images/spritesheet.png";

function scroll() {
    ctx.save();
    canvasOffset.x = 0;
    canvasOffset.y = 0;
    
    if ( sidescrollerCenter.collider.transform.position.x + spriteOffsetX / 2
        + sidescrollerCenter.collider.transform.scale.x / 2 > screen.x / 2) {

        canvasOffset.x = ( screen.x / 2 + spriteOffsetX / 2
                            - sidescrollerCenter.collider.transform.scale.x / 2
                            - sidescrollerCenter.collider.transform.position.x
                            ) * dpx;

        ctx.translate(canvasOffset.x, 0);
    }
    if (sidescrollerCenter.collider.transform.position.y
        - sidescrollerCenter.collider.transform.scale.y < 0) {
        canvasOffset.y = -(sidescrollerCenter.collider.transform.position.y
                            - sidescrollerCenter.collider.transform.scale.y) * dpx;
        ctx.translate(0, canvasOffset.y);
    }
}

//###########################################################################
// canvas size
//

resize();

function resize() {   
    let width = document.documentElement.clientWidth;   // ?TODO ctx.scale
    let height = document.documentElement.clientHeight;    
    // landscape
    if(width / height > screen.x / screen.y)
        width = height * screen.x / screen.y;
    else // portrait
        height = width * screen.y / screen.x;
	// max size
	if(width > screen.x) {
		width = screen.x;
		height = screen.y;
    }
    // set canvas size
	canvas.style.width = width + 'px';
	canvas.style.height = height + 'px';
	canvas.style.marginTop = (-height / 2) + 'px';
    canvas.style.marginLeft = (-width / 2) + 'px';
    // set canvas resolution
    canvas.width = width;
	canvas.height = height;
    // set size-ratio for objects
    dpx = width / screen.x;
}

window.addEventListener('resize', resize, false);
window.addEventListener('orientationchange', resize, false);