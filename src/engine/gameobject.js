import { Vector2 } from "./util/vector2";
import { sprites } from "../game/assets/sprites";
import { pushUpdate } from "./mainloop";

export const gameObject = {};

export function GameObject(id, sprite, _animateable) {
    let obj = Object.create(GameObject.prototype);
    obj.transform = Transform(0, 0, 1, 1);
    obj.velocity = new Vector2();
    obj.gravity = false;
    if(sprite) addSprite(obj, _animateable, ...sprites[sprite]);
    gameObject[id] = obj;
    return gameObject[id];
}

GameObject.prototype.setCollider = function(id) {
    if(!sprites[id]) console.log('ERROR: no sprite to assign to collider: ' + id);
    else {
        this.collider = {};
        this.collider.transform = Transform( 0, 0, sprites[id][2], sprites[id][3]);
        this.colliderOrigScale = new Vector2(sprites[id][2], sprites[id][3]);
        this.colliderUpdate = (dt) => this.collider.transform.position.set(this.transform.position);
        pushUpdate(this.colliderUpdate);
    }
};

GameObject.prototype.changeSprite = function(id) {
    if(!sprites[id]) console.log('ERROR: no sprite with name: ' + id);
    else {
        let dw = this.transform.scale.x / this.sprite.lastWidth;
        this.sprite.position.set(sprites[id][0], sprites[id][1]);
        this.sprite.scale.set(sprites[id][2], sprites[id][3]);
        this.transform.scale.x = this.sprite.scale.x * dw;
        this.sprite.lastWidth = sprites[id][2];
        if(this.animateable) this.animation = Animation(sprites[id][4], sprites[id][5], sprites[id][6]);

        if(this.collider) {
            this.collider.transform.scale.set(this.colliderOrigScale);
            this.collider.transform.scale.multiply(dw);
            this.collider.transform.position.set(this.transform.position); 
        }
    }
};

function Transform(posX, posY, scaleX, scaleY) {
    let obj = Object.create(Transform.prototype);
    obj.position = new Vector2(posX, posY);
    obj.scale = new Vector2(scaleX, scaleY);
    return obj;
}

function addSprite(go, _animateable, posX, posY, scaleX, scaleY, Speed, Frames, once) {    
    go.sprite = Sprite(posX, posY, scaleX, scaleY);
    go.transform.scale.set(go.sprite.scale);
    go.animateable = _animateable;
    go.sprite.lastWidth = scaleX;
    if(_animateable) {
        go.animation = Animation(Speed, Frames, once);
        go.animate = _updateSprite.bind(go);
        pushUpdate(go.animate);
    }
}

function Sprite(posX, posY, scaleX, scaleY) {
    let obj = Object.create(Sprite.prototype);
    Object.assign(obj, Transform(posX, posY, scaleX, scaleY));
    return obj;
}

function Animation(_speed, _frames, _once) {
    let obj = Object.create(Animation.prototype);
    obj.speed = _speed;
    obj.frames = _frames;
    obj.once = _once;
    obj.index = 0;
    obj.done = false;
    return obj;
}

function _updateSprite(dt) {
    if(!this.animation.speed) return;

    var frame;

    this.animation.index += this.animation.speed * dt;

    if(this.animation.speed > 0) {
        var max = this.animation.frames;
        var idx = Math.floor(this.animation.index);
        frame = idx % max;

        if(this.animation.once && idx >= max) {
            this.animation.done = true;
            return;
        }
    }
    else frame = 0;

    this.sprite.position.x = frame * this.sprite.scale.x;
}
