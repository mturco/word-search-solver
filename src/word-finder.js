module.exports = class WordFinder {
  
  SetMatrix(matrix) {
    this.matrix = matrix;
    this.matrixWidth = matrix[0].length;
    this.matrixHeight = matrix.length;
    return this;
  }

  FindWord(word) {
    if (this.matrix === undefined) throw new Error("Matrix has not been set, use SetMatrix to set the matrix");
    this.wordLength = word.length;

    const possibleStartPoints = this.FindPossibleStartPointsForWord(word);
    for (let startPoint of possibleStartPoints) {
      const wordSearchResult = this.FindWordFromStartPoint(word, startPoint);
      if(wordSearchResult !== undefined) {
        return wordSearchResult;
      }
    }

    return [0, 0];
  }

  FindPossibleStartPointsForWord(word) {
    const startLetter = word[0];
    const result = [];
    for(var row = 0; row < this.matrixHeight; row++) {
      for(var column = 0; column < this.matrixWidth; column++) {
        if(this.matrix[row][column] === startLetter) {
          result.push([row, column]);
        }
      }
    }
    return result;
  }

  FindWordInDirectionLeft(word, column, row) {
    const result = {
      firstLetterPosition: [row, column], 
      match: false
    }
    if (column - ((this.wordLength - 1)) < 0) return result;
      
    for(let c = 1; c <= (this.wordLength - 1); c++) {
      if(this.matrix[row][column -c] !== word[c]) {
        return result;
      }
    }
    
    result.match = true;
    result.lastLetterPosition = [row, column - (this.wordLength - 1)];
    return result;
  }



  FindWordFromStartPoint(word, startPoint) {
    const startRow = startPoint[0];
    const startColumn = startPoint[1];

    const possibleDirections = ['l','lu','u','ru','r','rd','d','ld'];
        // exclude possible directions
    for(var d = 0; d < possibleDirections.length; d++) {
      // Left
      const resultDirectionLeft = this.FindWordInDirectionLeft(word, startColumn, startRow);
      if(resultDirectionLeft.match) return [resultDirectionLeft.firstLetterPosition, resultDirectionLeft.lastLetterPosition];
      
      
      const direction = possibleDirections[d];
      switch(direction) {
        case 'lu':
          if (startColumn - (this.wordLength - 1) >= 0 && startRow - (this.wordLength - 1) >= 0) {
            let match = true;
            for(let c = 1; c <= (this.wordLength - 1); c++) {
              if(this.matrix[startRow - c][startColumn - c] !== word[c]) {
                match = false;
              }
            }
            if(match) return [[startRow,startColumn], [startRow - (this.wordLength - 1), startColumn - (this.wordLength - 1)]];
          } else {
            // console.log('Does not fit to left up');
          }
          break;
        case 'u':
          if (startRow - (this.wordLength - 1) >= 0) {
            let match = true;
            for(let c = 1; c <= (this.wordLength - 1); c++) {
              if(this.matrix[startRow - c][startColumn] !== word[c]) {
                match = false;
              }
            }
            if(match) return [[startRow,startColumn], [startRow - (this.wordLength - 1), startColumn]];
          } else {
            // console.log('Does not fit to up');
          }
          break;
        case 'ru':
          if (startColumn + (this.wordLength - 1) < this.matrixWidth && startRow - (this.wordLength - 1) >= 0) {
            let match = true;
            for(let c = 1; c <= (this.wordLength - 1); c++) {
              if(this.matrix[startRow - c][startColumn + c] !== word[c]) {
                match = false;
              }
            }
            if(match) return [[startRow,startColumn], [startRow - (this.wordLength - 1), startColumn + (this.wordLength - 1)]];
          } else {
            // console.log('Does not fit to right up');
          }
          break;
        case 'r':
          if (startColumn + (this.wordLength - 1) < this.matrixWidth) {
            let match = true;
            for(let c = 1; c <= (this.wordLength - 1); c++) {
              if(this.matrix[startRow][startColumn + c] !== word[c]) {
                match = false;
              }
            }
            if(match) return [[startRow,startColumn], [startRow, startColumn + (this.wordLength - 1)]];
          } else {
            // console.log('Does not fit to right');
          }
          break;
        case 'rd':
          if (startColumn + (this.wordLength - 1) < this.matrixWidth && startRow + (this.wordLength - 1) < this.matrixHeight) {
            let match = true;
            for(let c = 1; c <= (this.wordLength - 1); c++) {
              if(this.matrix[startRow + c][startColumn + c] !== word[c]) {
                match = false;
              }
            }
            if(match) return [[startRow,startColumn], [startRow + (this.wordLength - 1), startColumn + (this.wordLength - 1)]];
          } else {
            // console.log('Does not fit to right down');
          }
          break;
        case 'd':
          if (startRow + (this.wordLength - 1) < this.matrixHeight) {
            let match = true;
            for(let c = 1; c <= (this.wordLength - 1); c++) {
              if(this.matrix[startRow + c][startColumn] !== word[c]) {
                match = false;
              }
            }
            if(match) return [[startRow,startColumn], [startRow + (this.wordLength - 1), startColumn]];
          } else {
            // console.log('Does not fit to down');
          }
          break;
        case 'ld':
        if (startColumn - (this.wordLength - 1) >= 0 && startRow + (this.wordLength - 1) < this.matrixHeight) {
            let match = true;
            for(let c = 1; c <= (this.wordLength - 1); c++) {
              if(this.matrix[startRow + c][startColumn - c] !== word[c]) {
                match = false;
              }
            }
            if(match) return [[startRow,startColumn], [startRow + (this.wordLength - 1), startColumn - (this.wordLength - 1)]];
          } else {
            // console.log('Does not fit to left down');
          }
          break;
      }
    }
  }
}