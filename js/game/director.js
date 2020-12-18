import Point from "./point.js"
import Mattrix from "../base/matrix.js"
import { isLink } from "./utils.js"
import { SIZE, MARGIN, LATTICE_NUM } from "../base/constant.js"
import { points } from "../base/globalData.js"

export default class Director {
    constructor(canvas,ctx){
        let M = Mattrix.getInstance()
        this.matrix =  M.matrix
        this.canvas = canvas
        this.ctx = ctx
        this.init()
    }

    init(){
        //初始化界面
        this.initView()
        //初始化音效
        this.initAudio()
        //注册事件
        this.registerEvent(this.canvas, this.ctx)

    }

    initView(){
        const image = new Image()
        image.src = 'res/image/fruit.png'
        image.onload = () => {
            for(let i=0; i< LATTICE_NUM; i++){
                for(let j=0; j< LATTICE_NUM; j++){
                    let point = new Point(this.ctx,image,i,j,this.matrix[i][j]);
                    point.draw();
                    points[`${i}${j}`] = point
                }
            }
        }
    }

    initAudio(){
        //第一次点击音效
        this.firstClick = document.createElement("AUDIO");
        this.firstClick.src = "res/audio/first.mp3";
        //第二次点击音效
        this.secondClick = document.createElement("AUDIO");
        this.secondClick.src = "res/audio/second.mp3";
        //连接消除音效
        this.linkBgm = document.createElement("AUDIO");
        this.linkBgm.src = "res/audio/link.mp3";
    }

    registerEvent(canvas, ctx){
        let first = null
        
        canvas.addEventListener('click',(ev)=>{
            let x = ev.offsetX, 
                y = ev.offsetY;

            if( x < MARGIN 
                || y < MARGIN 
                || x > canvas.width - MARGIN 
                || y > canvas.height - MARGIN ){
                return
            }
            let ix = parseInt((x - MARGIN) / SIZE), 
                iy = parseInt((y - MARGIN) / SIZE);
            let num = this.matrix[iy][ix];
            
            if(first){  
                let second = points[`${iy}${ix}`]
                if(num == first.value && isLink(first,second)){
                    this.linkBgm.play();
                    //清空画布
                    first.clear();
                    second.clear();
                    //清空point的数
                    first.value = undefined;
                    second.value = undefined;
                }else{
                    this.secondClick.play();
                    //先清空画布，再重新绘制第一次点击的物体
                    first.clear();
                    first.draw(); 
                }
                
                first = null;
            }else{
                this.firstClick.play()
                first = points[`${iy}${ix}`]
                ctx.beginPath();
                ctx.rect(first.x, first.y, SIZE, SIZE);
                ctx.strokeStyle = "red";
                ctx.stroke();
            }
        })
    }
}