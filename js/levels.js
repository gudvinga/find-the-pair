export var generateLevel = function(level) {
    let Level = {
        row: 2,
        column: 2
    }

    if (level === 1) {
        return Level;
    }
    else {
        Level.row += level-1;
        Level.column += level;

        if (Level.row%2 != 0) {
            Level.row--;
        }

        if (Level.row > 4) {
            Level.row = 4;
        }
    }

    return Level;
}