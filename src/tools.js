import {
    GRID_SIZE
} from "./constants";

//��ָ����[min,max]�ڲ���һ���������
const getRandomNumberFromRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//��ȡһ��������꣨���ڲ���ʳ����߳�ʼλ��
export const getRandomCoordinate = () => {
    return {
        x: getRandomNumberFromRange(0, GRID_SIZE - 1),
        y: getRandomNumberFromRange(0, GRID_SIZE - 1)
    }
}
//����ʳ��պó�����������
export const getRandomFood = (snake) => {
    let food = getRandomCoordinate();
    snake.forEach(ele => {
        if (food.x === ele.x && food.y === ele.y) food = getRandomFood(snake);
    });
    return food;
}

//��ȡ����ʱ��
export const getCurTime = () => {
    let d = new Date();
    let h = "" + d.getHours(),
        m = "" + d.getMinutes();
    let res = (h.length === 2 ? h : "0" + h) + ":" + (m.length === 2 ? m : "0" + m);
    return res;
}

//��ȡ�������¼�����߷�
export const getHighest = () => {
    let score = localStorage.getItem("snake-hs");
    return score == undefined ? 0 : score;
}
//ˢ����߷�
export const updateHighest = (score, hs) => {
    let max = Math.max(hs, score);
    localStorage.setItem("snake-hs", max);
}
//��������->����
const idx2Loc = (idx) => {
    return [idx % GRID_SIZE, Math.floor(idx / GRID_SIZE)];
}
//��������->����
const loc2Idx = (x, y) => {
    return y * GRID_SIZE + x;
}
//���������ж��ǲ����߸�
export const isSnake = (idx, snake) => {
    let [x, y] = idx2Loc(idx);
    for (let ele of snake) {
        if (ele.x === x && ele.y === y) return true;
    }
    return false;
}
//���������ж��ǲ���ʳ���
export const isFood = (idx, food) => {
    let [x, y] = idx2Loc(idx);
    if (food.x === x && food.y === y) return true;
    return false;
}
//��ȡ��ͷ����
export const getSnakeHead = (snake) => {
    return snake[0];
}

//�Ƿ�ײǽ
export const hitBorder = snake => {
    let head = getSnakeHead(snake);
    if (head.x < 0 || head.y < 0 || head.x >= GRID_SIZE || head.y >= GRID_SIZE) return true;
    return false;
}
//�Ƿ�Ե��Լ�
export const eatSelf = snake => {
    let head = getSnakeHead(snake);
    for (let i = snake.length-1; i > 0; i--) {
        if (head.x === snake[i].x && head.y === snake[i].y) return i;
    }
    return -1;
}

//�Ƿ�Ե�ʳ��
export const eatFood = (snake,food) => {
    let head=getSnakeHead(snake);
    if(head.x===food.x&&head.y===food.y) return true;
    return false
}