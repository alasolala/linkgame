import { LATTICE_NUM } from "../base/constant.js"
import { points } from "../base/globalData.js"
function isNeighbor(num1, num2){
    return Math.abs(num1 - num2) == 1
}

function isBorder(num){
    return num == 0 || num == LATTICE_NUM - 1
}


function isLinearH(i, j1, j2){
    let min = j1 > j2 ? j2 : j1
    let sub = Math.abs(j1-j2)
    let temp = 1
    while(temp < sub){
        if(points[`${i}${min + temp}`].value !== undefined){
            return false
        }
        temp ++
    }
    return true
}

function isLinearV(j, i1, i2){
    let min = i1 > i2 ? i2 : i1
    let sub = Math.abs(i1-i2)
    let temp = 1
    while(temp < sub){
        if(points[`${min + temp}${j}`].value !== undefined){
            return false
        }
        temp ++
    }
    return true
}

function isSimpleLink(p1,p2,allowBorder){
    if(p1.i == p2.i){
        if(isNeighbor(p1.j, p2.j)) return true
        if(allowBorder && isBorder(p1.i)) return true
        if(isLinearH(p1.i, p1.j, p2.j)) return true
    }

    if(p1.j == p2.j){
        if(isNeighbor(p1.i, p2.i)) return true
        if(allowBorder && isBorder(p1.j)) return true
        if(isLinearV(p1.j, p1.i, p2.i)) return true
    }
    return false
}

function isOneCornerLink(p1,p2){
    //找两个交叉点的任意一个c, 判断值是否为空，如果为空，判断交叉点是否分别与p1、p2 SimpleLink
    let c
    if(points[`${p1.i}${p2.j}`].value === undefined){
        c = points[`${p1.i}${p2.j}`]
        if((isSimpleLink(p1,c) && isSimpleLink(p2,c,true))
            || (isSimpleLink(p1,c,true) && isSimpleLink(p2,c))) return true
    }
    if(points[`${p2.i}${p1.j}`].value === undefined){
        c = points[`${p2.i}${p1.j}`]
        if((isSimpleLink(p1,c) && isSimpleLink(p2,c,true))
            || (isSimpleLink(p1,c,true) && isSimpleLink(p2,c))) return true
    }
    return false
}

function isTwoCornerLink(p1,p2){
    //分别从横向和纵向遍历p1,p2所在的行和列，找到两个辅助点c1和c2,判断p1和c1、c1和c2、c2和p2是否SimpleLink
    //找到任何一对满足条件的c1和c2即返回true
    let c1, c2

    //行(j递增)
    for(let j=0; j < LATTICE_NUM; j++){
        if(points[`${p1.i}${j}`].value !== undefined) continue
        if(points[`${p2.i}${j}`].value !== undefined) continue
        c1 = points[`${p1.i}${j}`]
        c2 = points[`${p2.i}${j}`]
        if(isSimpleLink(p1,c1) 
            && isSimpleLink(c1,c2,true) 
            && isSimpleLink(p2,c2)) return true
    }

    //列(i递增)
    for(let i=0; i < LATTICE_NUM; i++){
        if(points[`${i}${p1.j}`].value !== undefined) continue
        if(points[`${i}${p2.j}`].value !== undefined) continue
        c1 = points[`${i}${p1.j}`]
        c2 = points[`${i}${p2.j}`]
        if(isSimpleLink(p1,c1) 
            && isSimpleLink(c1,c2,true) 
            && isSimpleLink(p2,c2)) return true
    }


    return false
}

export function isLink(p1,p2){
    if(isSimpleLink(p1,p2,true)){
        return true
    }
    if(isOneCornerLink(p1,p2)){
        return true
    }
    if(isTwoCornerLink(p1,p2)){
        return true
    }

    return false
}