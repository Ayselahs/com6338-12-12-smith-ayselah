const words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
]

let wins = 0
let losses = 0
let currentWord

class Word {
  constructor(word) {
    this.word = word
    this.displayWord = word.replaceAll(/[\w]/g, "_")
    this.remainingGuesses = 10
    this.incorrectLetters = []
    this.correctLetters = []
  }
 // implement the guessLetter function:
  // guessLetter(letter) {}
  guessLetter(letter) {
    if (this.correctLetters.includes(letter) || this.incorrectLetters.includes(letter)) {return; }
    // if letter is in word, add to correctLetters
    if (this.word.includes(letter)) {
      this.correctLetters.push(letter)
    } else {
      // else add to incorrectLetters and subtract from remainingGuesses
      this.incorrectLetters.push(letter)
      this.remainingGuesses--
    }
    // update displayWord
    this.displayWord = this.word
      .split('')
      .map(letter => (this.correctLetters.includes(letter) ? letter : '_'))
      .join('')
    
  }

 // implement the updateScreen function:
  // updateScreen() {}
  updateScreen() {
    // update DOM elements
    document.getElementById('word-to-guess').textContent = this.displayWord
    document.getElementById('remaining-guesses').textContent = this.remainingGuesses
    document.getElementById('incorrect-letters').textContent = this.incorrectLetters.join(', ')
    
  }

 // implement the isGameOver function:
  // isGameOver() {}
  isGameOver() {
    // return true if displayWord is equal to word or remainingGuesses is less than or equal to 0
    return this.displayWord === this.word || this.remainingGuesses <= 0
  }

 // implement the getWinOrLoss function:
  // getWinOrLoss() {}
  getWinOrLoss() {
    // return 'win' if displayWord is equal to word and remainingGuesses is greater than 0
    if (this.displayWord === this.word && this.remainingGuesses > 0) {
      return 'win'
    } else if (this.remainingGuesses <= 0 && this.displayWord !== this.word) {
      return 'loss'
    } else {
      return null
    }
    
  }
}

function newGame() {
  const randomWord = words[Math.floor(Math.random() * words.length)]
  currentWord = new Word(randomWord)
  currentWord.updateScreen()
}

document.onkeyup = function(e) {
  const pressedKey = e.key.toLowerCase()
  console.log(pressedKey)
  // early exit for non-letter key presses
  if (!/^[a-z]{1}$/g.test(pressedKey)) return

  // pass in guessed letter to word obj
  currentWord.guessLetter(pressedKey)
  
  // allow word obj to update screen
  currentWord.updateScreen()
  

  // check if game is over
  const gameOver = currentWord.isGameOver()

  // if game is over, update wins/losses and start new game
  if (gameOver) {
    const previousWord = document.getElementById('previous-word')
    const winDisplay = document.getElementById('wins')
    const lossDisplay = document.getElementById('losses')
    previousWord.textContent = currentWord.word
    const result = currentWord.getWinOrLoss()
    if (result === 'win') {
      wins++
      winDisplay.textContent = wins
    } else if (result === 'loss') {
      losses++
      lossDisplay.textContent = losses
    }
    newGame()
  }
}

newGame()