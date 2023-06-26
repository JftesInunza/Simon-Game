"use strict";

class SimonViewer {
  constructor(data) {
    this.data = data;
    this.wrongSound = $(`audio[name="wrong"]`).get(0);
  }

  blinkAllButtons() {
    this.data.forEachButton((btn) => {
      btn.blink();
    });
  }

  onStateChanged() {
    switch (this.data.state) {
      case GAME_STATE_GAMEOVER:
        this.wrongSound.play();
        this.gameoverScreen();

      case GAME_STATE_WAITTING:
        this.startBlinking();
        break;

      case GAME_STATE_PLAYING:
        this.pauseBlinking();
        this.playingScreen();
        break;

      case GAME_STATE_NEW_ROUND:
        this.updateLevel();
        break;

      default:
        return;
    }
  }

  onSequenceExtended() {
    let totalDelay = 0;
    this.data.forEachSequencedButton((btn) => {
      totalDelay += btn.animationDelay;
      setTimeout(function () {
        btn.click();
      }, totalDelay);
    });

    let self = this;
    setTimeout(function () {
      self.data.setState(GAME_STATE_PLAYING);
    }, totalDelay);
  }

  onButtonClicked() {
    this.data.clickedButton().play();
  }

  startBlinking() {
    const delay = 800;
    let self = this;

    this.blinkAllButtons();
    this.intervalId = setInterval(function () {
      self.blinkAllButtons();
    }, delay);
  }

  pauseBlinking() {
    clearInterval(this.intervalId);
  }

  gameoverScreen() {
    $("h3").text("game over, press any key to restart.");
    $("body").toggleClass("background-wrong");
    setTimeout(function () {
      $("body").toggleClass("background-wrong");
    }, 300);
  }

  playingScreen() {
    $("h3").text("follow what simon says!");
  }

  updateLevel() {
    const text = `Level ${this.data.level}`;
    $("#level").text(text);
  }
}
