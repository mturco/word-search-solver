'use strict';
const WordFinder = require('./word-finder.js');

module.exports = function(letterMatrix, wordList) {
  var wordFinder = new WordFinder().SetMatrix(letterMatrix);
  const result = [];
  for(var i = 0; i < wordList.length; i++) {
    const location = wordFinder.FindWord(wordList[i]);
    const wordResult = {
      word: wordList[i],
      found: false
    }

    if( location[0][0] + location[0][1] + location[1][0] + location[1][1] > 0 ) {
      wordResult.found = true;
      wordResult.firstLetter = location[0];
      wordResult.lastLetter = location[1];
    }
    result.push(wordResult);
  }
  return result;
};
