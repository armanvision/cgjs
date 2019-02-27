import { Vector2 } from "../util/vector2";
import { gameObject } from "../gameobject";
import { screen } from "../renderer";
import { collides, canvasBorder, stayInsideCanvas } from "./collisions";

// gravity + re-positioning
// collision/collision-border + re-positioning

const g = 10;

export function physic(dt) {
    for(let go in gameObject) {
        if(gameObject[go].gravity) gravity(gameObject[go], dt);
        if(gameObject[go].collider) {
            for(let col in gameObject) {
                if(go !== col) collision(gameObject[go], gameObject[col]);
            }
        }        
    }
}

function gravity(go, dt) {
    go.velocity.y += g * dt;
    //if(go.velocity.y > g) go.velocity.y = g;
    go.transform.position.y += g * dt;
}

/* nicht von mir, von mir schnell überarbeitet, buggy */
function collision(go, col) {
    if(collides(go, col)){

        let playerX = go.transform.position.x;
        let playerY = go.transform.position.y;
        let playerRight = go.transform.position.x + go.transform.scale.x;
        let playerBottom = go.transform.position.y + go.transform.scale.y;

        let stoneX = col.transform.position.x;
        let stoneY = col.transform.position.y;
        let stoneRight = col.transform.position.x + col.transform.scale.x;
        let stoneBottom = col.transform.position.y + col.transform.scale.y;

        let collisionHeightOben = Math.abs(playerBottom - stoneY);
        let collisionHeightUnten = Math.abs(playerY - stoneBottom);

        // x-achse
        if( go.velocity.y >= 0
            &&go.velocity.x >= 0 
			&& collisionHeightOben > Math.abs(playerRight - stoneX)) {
            //kolision bei der Bewegung nach rechts auf X Achse
            //console.log("von links X");
            go.velocity.x = 0;
            go.transform.position.x = stoneX - go.transform.scale.x;
        }
        if( go.velocity.y >= 0
            &&go.velocity.x <= 0 
			&& collisionHeightOben > Math.abs(playerX - stoneRight)) {
            //kolision bei der Bewegung nach links auf X Achse
            //console.log("von rechts X");
            go.velocity.x = 0;
            go.transform.position.x = stoneRight;
        }

        // y-achse
        if(  go.velocity.y >= 0
            && go.velocity.x >= 0
            && collisionHeightOben < Math.abs(playerRight - stoneX)) {
                //kollision bei der Bewegung nach unten rechts auf Y Achse
                //console.log("von oben links");
                go.velocity.zero();
                go.transform.position.y = stoneY - go.transform.scale.y;
        }
        if(  go.velocity.y >= 0
          && go.velocity.x <= 0
          && collisionHeightOben < Math.abs(playerRight - stoneX)) {
                //kollision bei der Bewegung nach unten links auf Y Achse
                //console.log("von oben rechts ");
                go.velocity.zero();
                go.transform.position.y = stoneY - go.transform.scale.y;
        }
		if(  go.velocity.y < 0
          && go.velocity.x > 0
		  && Math.abs(playerY - stoneBottom) > Math.abs(playerRight - stoneX)){
			  // kollision bei der Bewegung nach oben rechts auf X Achse
				//console.log("von links X");
				go.velocity.x = 0;
				go.transform.position.x = stoneX - go.transform.scale.x;
		  }
		if(  go.velocity.y < 0
          && go.velocity.x > 0
		  && Math.abs(playerY - stoneBottom) < Math.abs(playerRight - stoneX)){
			  // kollision bei der Bewegung nach oben rechts auf Y Achse
				//console.log("von unten links");
                go.velocity.zero();
                go.transform.position.y = stoneBottom;
		  }
		if(  go.velocity.y < 0
          && go.velocity.x < 0
		  && Math.abs(playerY - stoneBottom) > Math.abs(stoneRight - playerX)){
			  // kollision bei der Bewegung nach oben links auf X Achse
				//console.log("von rechts X");
				go.velocity.x = 0;
				go.transform.position.x = stoneRight;
		  }
		 if(  go.velocity.y < 0
          && go.velocity.x < 0
		  && Math.abs(playerY - stoneBottom) < Math.abs(stoneRight - playerX)){
			  // kollision bei der Bewegung nach oben links auf Y Achse
				//console.log("von unten rechts");
                go.velocity.zero();
                go.transform.position.y = stoneBottom;
		  }
    }
}