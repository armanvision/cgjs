// tests collision between two gameobjects
export function collides(go1, go2) {
	return !(  go1.transform.position.x + go1.transform.scale.x <= go2.transform.position.x
			|| go1.transform.position.x > go2.transform.position.x + go2.transform.scale.x
			|| go1.transform.position.y + go1.transform.scale.y <= go2.transform.position.y
			|| go1.transform.position.y > go2.transform.position.y + go2.transform.scale.y );
}

// tests collision between one gameobject and all canvas-borders
// screen is defined in assets.js
export function canvasBorder(go, screen) {
	return  (  go.transform.position.x <= 0
			|| go.transform.position.x + go.transform.scale.x > screen.x
			||	go.transform.position.y <= 0
			||	go.transform.position.y + go.transform.scale.y > screen.y );
}

// adjusts position of gameobject go, if outside of canvas (no additional collision test needed)
// screen is defined in assets.js
export function stayInsideCanvas(go, screen) {
	// left, right
	if(go.transform.position.x < 0)
		go.transform.position.x = 0;
	else if(go.transform.position.x > screen.x - go.transform.scale.x)
		go.transform.position.x = screen.x - go.transform.scale.x;
	// top, botton
	if(go.transform.position.y < 0)
		go.transform.position.y = 0;
	else if(go.transform.position.y > screen.y - go.transform.scale.y)
		go.transform.position.y = screen.y - go.transform.scale.y;
}
