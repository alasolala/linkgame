import { LATTICE_NUM, OBJECT_NUM } from "./constant.js"
let objectNum = OBJECT_NUM
export default class Matrix{
    constructor(){
        this.array = this.getArr()
        this.matrix = this.getMatrix()
    }

    getArr(){
        let total = LATTICE_NUM * LATTICE_NUM
        let arr = [], first = true
        for(let i=0; i<total; i++){
            if(objectNum<0){
                objectNum = OBJECT_NUM
            }
            if(first){
                arr.push(objectNum)
            }else{
                arr.push(objectNum--)
            }
            first = !first
            
        }
        return arr
    }

    shuffle(){
        this.array.sort( () => {
            return .5 - Math.random();
        });
    }

    getMatrix(){
        this.shuffle()
        let matrix = []
        for(let i=0; i<LATTICE_NUM; i++){
            matrix.push(this.array.slice(i*LATTICE_NUM, (i+1)*LATTICE_NUM))
        }
        return matrix
    }

    static getInstance(){
        if(!Matrix.instance){
            Matrix.instance = new Matrix()
        }
        return Matrix.instance
    }
}

