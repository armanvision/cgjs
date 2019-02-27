/* arman 26.10.2018

   Importiert Module aus dem Ordner scripts und verknüpft Update-Funktionen mit dem main-loop.
   Verknüpft physic-Funktion mit dem main-loop.
   Verknüpft zuletzt die render-Funktion mit dem main-loop.
*/

import { pushFixedUpdate, pushUpdate } from "./engine/mainloop";
import { gameObject } from "./engine/gameobject";
import { physic } from "./engine/physic/physic";
import { renderer } from "./engine/renderer";

const context = require.context('./game/scripts', true, /\.js$/);

context.keys().forEach( filename => { 
    let file =  context(filename);
    if(file.fixedUpdate) pushFixedUpdate(file.fixedUpdate);
    if(file.update) pushUpdate(file.update);    
});
console.log("added update funktions");

pushUpdate( physic );
console.log("added physics engine");

pushUpdate( () => renderer.render(gameObject) );
