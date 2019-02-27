Idea
----
build a framework for games using the canvas-api



TODO
----
physic.js (only module not programmed by myself)



IDE
---

Node.js (js-runtime, npm)
Webpack (dev-server, bundler)
  - Plug-In: babel (transpile ES6 to ES5)
Git (version control)
VS Code (editor)


======================================================================================================
######################################################################################################
======================================================================================================


DOK
===


Instanzen von GameObject landen im globalen gameObject Objekt.

Ordner src/game/scripts:
------------------------
Alle Module werden automatisch eingehängt (durch index.js).
Funktionen die "update" heissen, werden automatisch dem update-loop in main.js hinzugefügt.
=> einfach script erstellen und los programmieren


######################################################################################################


sprite.js:
==========

Array in sprite.js: 

Koordinaten aller sprites, mit Benennung (id).
Falls animierte sprites: speed, frame-Anzahl und ob einmaliger Durchlauf (once:Bool).


######################################################################################################


GameObject-Instanzen(factory):
==============================

GameObject(name:String, spriteId:String, animateable:Bool)

Parameter:
----------
name: Attribut im globalen gameObject-Objekt
spriteId: aus sprite.js

Attribute:
----------
// automatisch mit (0,0) instanziert
name.transform.position:Vector2d

// automatisch mit (1,1) instanziert.
// Wenn eine spriteId als Parameter mitgegeben wurde: automatisch Grösse des sprite.
name.transform.scale:Vector2d
                            

name.velocity:Vector2 // Richtungsvektor
name.gravity = false;

Methoden:
---------
name.setCollider(spriteId);
name.changeSprite(id_Des_Nächsten_Sprite);


######################################################################################################


globale Methoden und Objekte:
-----------------------------

vector.js:
==========
new Vector(x, y) // (0,0) wenn ohne Parameter

vec.set(vec2, y)
// ein Parameter: addiert einen vector
// 2 Parameter: addiert parameter 1 zu x und parameter 2 zu y 

vec.zero() // setzt beide Koordinaten auf null
vec.multiply(scalar) // scalar-Produkt
vec.magnitude()
vec.angle()
vec.normalize()
vec.setLength(länge)
vec.add(vec2) // addiert vec2 zu vec
vec.equal(vec2): Bool // vec x,y identisch mit vec2 x,y?


render.js:
==========
FIX: sidescroller Methode: setSidescrollerCenter(Object_das_zentriert_wird);
screen: Vector2d // Grösse des canvas


input.js:
==========
Object input:

Properties mouse und key:

key:
----
input.key.Name_des_key_zB_a: bool // true wenn gedrückt

mouse:
------
input.mouse.lmb: bool // true wenn Rechte Mouse Taste gedrückt
input.mouse.mmb: bool // true wenn Mittlere Mouse Taste gedrückt
input.mouse.rmb: bool // true wenn Linke Mouse Taste gedrückt
input.mouse.position:vector2 // Position des Mouse-Zeigers


collision.js:
=============
collides(object1: GameObject, object2: GameObject): Bool // Kollision zweier Objecte
canvasBorder(object: GameObject, screen:vector2d): Bool // Kollision mit Rand
stayInsideCanvas(object: GameObject, screen:vector2d)


###########################################################################################


folder-structure
----------------

ProjectFolder
|
|-- dist |-- main.js
|        |-- manifest.json
|        |-- style.css
|
|
|-- images
|
|
|-- src |-- engine |-- input |-- input.js
|       |          |         |-- keyboard.js
|       |          |         |-- mouse.js
|       |          |         |-- touch.js
|       |          |
|       |          |
|       |          |-- physic |-- collision.js
|       |          |          |-- physic.js
|       |          |
|       |          |
|       |          |-- util |-- vector2.js
|       |          |
|       |          |
|       |          |-- gameobject.js
|       |          |-- mainloop.js
|       |          |-- renderer.js
|       |
|       |
|       |-- game |-- assets |-- sprites.js
|       |        |
|       |        |
|       |        |-- scripts|-- fps |-- fps.js
|       |        |          |
|       |        |          |-- environment.js
|       |        |          |-- player.js
|       |
|       |
|       |-- index.js
|
|
|-- index.html
|
+
|-- .git |-- ...
|-- node_modules |-- ...
|-- .babelrc
|-- .gitignore
|-- package.json
|-- readme.txt
|-- webpack.config.js
