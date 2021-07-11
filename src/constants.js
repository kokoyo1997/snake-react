//格子行列个数
export const GRID_SIZE = 20;

//蛇的四种前进方向
export const DIRECTIONS = {
    UP: 'UP',
    BOTTOM: 'BOTTOM',
    RIGHT: 'RIGHT',
    LEFT: 'LEFT',
};

//四种方向的坐标变化
export const DIRECTION_TICKS = {
    UP: (x, y) => ({ x, y: y - 1 }),
    BOTTOM: (x, y) => ({ x, y: y + 1 }),
    RIGHT: (x, y) => ({ x: x + 1, y }),
    LEFT: (x, y) => ({ x: x - 1, y }),
};
  
//键盘code值
export const KEY_CODES_MAPPER = {
    38: 'UP',
    39: 'RIGHT',
    37: 'LEFT',
    40: 'BOTTOM',
};

export const GAMESTATE={
    READY:'ready',
    RUN:'run',
    PAUSE:'pause',
    OVER:'over'
};