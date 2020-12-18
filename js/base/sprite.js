export default class Sprite { //精灵类
    constructor(
        ctx,
        img,
        srcX,
        srcY,
        srcWidth,
        srcHeight,
        x,
        y,
        width,
        height
    ){
        this.ctx = ctx;
        this.img = img;
        this.srcX = srcX;
        this.srcY = srcY;
        this.srcWidth = srcWidth;
        this.srcHeight = srcHeight;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(){
        this.ctx.drawImage(
            this.img,
            this.srcX,
            this.srcY,
            this.srcWidth,
            this.srcHeight,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }
}