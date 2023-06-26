"use strict";

class Controller {
  constructor(data) {
    this.data = data;
  }

  onKeydown() {
    switch (this.data.state) {
      case GAME_STATE_WAITTING:
      case GAME_STATE_GAMEOVER:
        this.startGame();
        break;

      case GAME_STATE_PLAYING:
      case GAME_STATE_NEW_ROUND:
        break;

      default:
        alert(`Unknown Game State ${this.data.state}`);
    }
  }

  startGame() {
    this.data.resetGame();
    this.data.setState(GAME_STATE_NEW_ROUND);
    this.data.newRound();
    console.log("Game Started");
  }

  onButtonClick() {
    if (this.data.state !== GAME_STATE_PLAYING) {
      return;
    }

    if (!this.data.isUserInValid()) {
      this.data.setState(GAME_STATE_GAMEOVER);
      console.log("Game Over");
      return;
    }

    if (this.data.isRoundOver()) {
      this.data.setState(GAME_STATE_NEW_ROUND);
      this.data.newRound();
      console.log("New Round");
    }
  }
}
