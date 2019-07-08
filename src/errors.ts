export class EmptyMapError extends Error {
    public constructor() {
        super(
            'The map has neither zones nor quadrants. Please provide a map with on of those two properties ' +
            'to `Cartomapper`'
        );
    }
}

export class WrongQuadrantSizeError extends Error {
    public constructor(
        posX: number,
        posY: number,
        rows: number,
        cols: number,
        expectedRows: number,
        expectedCols: number
    ) {
        super(
            `Quadrant at position [${posX}][${posY}] had a size of [${rows}][${cols}], expected size` +
            ` of [${expectedRows}][${expectedCols}]. Expected size is calculated from the element at position [0][0]`
        );
    }
}

export class WrongSectorSizeError extends Error {
    public constructor(
        posX: number,
        posY: number,
        quadX: number,
        quadY: number,
        rows: number,
        cols: number,
        expectedRows: number,
        expectedCols: number
    ) {
        super(
            `Sector at position [${posX}][${posY}] in Quadrant [${quadX}][${quadY}] had a size of [${rows}][${cols}],` +
            ` expected size of [${expectedRows}] [${expectedCols}]. Expected size is calculated from the element at` +
            ` position [0][0]`
        );
    }
}

export class WrongSubsectorSizeError extends Error {
    public constructor(
        posX: number,
        posY: number,
        quadX: number,
        quadY: number,
        sectX: number,
        sectY: number,
        rows: number,
        cols: number,
        expectedRows: number,
        expectedCols: number
    ) {
        super(
            `Subsector at position [${posX}][${posY}] in Sector [${sectX}][${sectY}] in Quadrant [${quadX}][${quadY}]` +
            ` had a size of [${rows}][${cols}], expected size of [${expectedRows}] [${expectedCols}]. Expected size` +
            ` is calculated from the element at position [0][0]`
        );
    }
}

export class UnassembledError extends Error {
    public constructor() {
        super('The map state was not assembled before trying to link or render');
    }
}
