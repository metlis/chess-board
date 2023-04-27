import type {Color} from '../types';
import Cell from '../Cell';

abstract class Piece {
    public white: boolean;
    public cell: Cell;

    constructor(color:Color, cell:Cell) {
        this.white = Boolean(color);
        this.cell = cell;
    }

    abstract move(): void;
}

export default Piece