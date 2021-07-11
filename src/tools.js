import {
    GRID_SIZE
} from "./constants";

//在指定的[min,max]内产生一个随机整数
const getRandomNumberFromRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//获取一个随机坐标（用于产生食物和蛇初始位置
export const getRandomCoordinate = () => {
    return {
        x: getRandomNumberFromRange(0, GRID_SIZE - 1),
        y: getRandomNumberFromRange(0, GRID_SIZE - 1)
    }
}
//避免食物刚好出现在蛇身上
export const getRandomFood = (snake) => {
    let food = getRandomCoordinate();
    snake.forEach(ele => {
        if (food.x === ele.x && food.y === ele.y) food = getRandomFood(snake);
    });
    return food;
}

//获取本地时间
export const getCurTime = () => {
    let d = new Date();
    let h = "" + d.getHours(),
        m = "" + d.getMinutes();
    let res = (h.length === 2 ? h : "0" + h) + ":" + (m.length === 2 ? m : "0" + m);
    return res;
}

//获取浏览器记录里的最高分
export const getHighest = () => {
    let score = localStorage.getItem("snake-hs");
    return score == undefined ? 0 : score;
}
//刷新最高分
export const updateHighest = (score, hs) => {
    let max = Math.max(hs, score);
    localStorage.setItem("snake-hs", max);
}
//格子索引->坐标
const idx2Loc = (idx) => {
    return [idx % GRID_SIZE, Math.floor(idx / GRID_SIZE)];
}
//格子坐标->索引
const loc2Idx = (x, y) => {
    return y * GRID_SIZE + x;
}
//根据索引判断是不是蛇格
export const isSnake = (idx, snake) => {
    let [x, y] = idx2Loc(idx);
    for (let ele of snake) {
        if (ele.x === x && ele.y === y) return true;
    }
    return false;
}
//根据索引判断是不是食物格
export const isFood = (idx, food) => {
    let [x, y] = idx2Loc(idx);
    if (food.x === x && food.y === y) return true;
    return false;
}
//获取蛇头坐标
export const getSnakeHead = (snake) => {
    return snake[0];
}

//是否撞墙
export const hitBorder = snake => {
    let head = getSnakeHead(snake);
    if (head.x < 0 || head.y < 0 || head.x >= GRID_SIZE || head.y >= GRID_SIZE) return true;
    return false;
}
//是否吃到自己
export const eatSelf = snake => {
    let head = getSnakeHead(snake);
    for (let i = snake.length-1; i > 0; i--) {
        if (head.x === snake[i].x && head.y === snake[i].y) return i;
    }
    return -1;
}

//是否吃到食物
export const eatFood = (snake,food) => {
    let head=getSnakeHead(snake);
    if(head.x===food.x&&head.y===food.y) return true;
    return false
}