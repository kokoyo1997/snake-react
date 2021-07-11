//�������и���
export const GRID_SIZE = 20;

//�ߵ�����ǰ������
export const DIRECTIONS = {
    UP: 'UP',
    BOTTOM: 'BOTTOM',
    RIGHT: 'RIGHT',
    LEFT: 'LEFT',
};

//���ַ��������仯
export const DIRECTION_TICKS = {
    UP: (x, y) => ({ x, y: y - 1 }),
    BOTTOM: (x, y) => ({ x, y: y + 1 }),
    RIGHT: (x, y) => ({ x: x + 1, y }),
    LEFT: (x, y) => ({ x: x - 1, y }),
};
  
//����codeֵ
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