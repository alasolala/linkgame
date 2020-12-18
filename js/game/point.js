import Sprite from "../base/sprite.js"
import { objects, OBJ_HEIGHT, OBJ_WIDTH } from "./object.js"
import { SIZE, MARGIN } from "../base/constant.js"

export default class Point extends Sprite{
    constructor(ctx,image,i,j,value){
        super(ctx, image, 0, 0, OBJ_HEIGHT, OBJ_WIDTH, 0, 0, SIZE, SIZE);
        this.i = i;
        this.j = j;
        this.value = value;
        this.x = MARGIN + j * SIZE;
        this.y = MARGIN + i * SIZE;
    }

    draw(){
        this.srcX = objects[this.value].x;
        this.srcY = objects[this.value].y;
        super.draw();
    }

    clear(){
        this.ctx.clearRect(this.x-1, this.y-1, SIZE+2, SIZE+2) //清除物体外的红框
    }
}

// export class DataPoint {
//     constructor(i,j,value){
//         this.i = i;
//         this.j = j;
//         this.value = value;
//         this.x = MARGIN + j * SIZE;
//         this.y = MARGIN + i * SIZE

//     }
// }