"use strict";

const GAME_STATE_WAITTING = 0;
const GAME_STATE_PLAYING = 1;
const GAME_STATE_GAMEOVER = 2;
const GAME_STATE_NEW_ROUND = 3;

class SimonData {
  constructor() {
    this.listeners = {
      stateChanged: [],
      sequenceExtended: [],
      clicked: [],
      keydown: [],
    };
    this.resetGame();
    this.init();
  }

  init() {
    let self = this;
    this.buttons = $("button").map(function (index) {
      return new SimonButton(this, index);
    });

    $("button").on("click", function (event) {
      self.onClick(event, this);
    });

    $(document).on("keydown", function (event) {
      self.onKeydown(event);
    });
  }

  onClick(event, btn) {
    event.preventDefault();
    if (this.state === GAME_STATE_NEW_ROUND) {
      return;
    }

    this.userIn = $(btn).attr("data-id");
    this.inputCounter++;
    this.notify("clicked");
  }

  onKeydown(event) {
    event.preventDefault();
    this.notify("keydown");
  }

  addEventListener(event, callback) {
    if (!(event in this.listeners)) {
      return alert(`Unknown event ${event}`);
    }
    this.listeners[event].push(callback);
  }

  notify(event) {
    this.listeners[event].forEach((callback) => {
      callback();
    });
  }

  forEachButton(callback) {
    for (let i = 0; i < this.buttons.length; i++) {
      callback(this.buttons[i], i);
    }
  }

  forEachSequencedButton(callback) {
    let self = this;
    this.sequence.forEach((btnId, index) => {
      callback(self.buttons[btnId], index);
    });
  }

  resetGame() {
    this.sequence = [];
    this.level = 1;
    this.resetCounter();
  }

  resetCounter() {
    this.userIn = -1;
    this.inputCounter = -1;
  }

  newRound() {
    this.resetCounter();
    this.extendSequence();
    this.level++;
  }

  extendSequence() {
    const randButtonId = this.getRandomButton();
    this.sequence.push(randButtonId);
    this.notify("sequenceExtended");
  }

  getRandomButton() {
    let rand = Math.floor(Math.random() * this.buttons.length);
    if (this.sequence.length < 2) {
      return rand;
    }
    if (rand == this.sequence.at(-2)) {
      return this.getRandomButton();
    }
    if (this.sequence.length > 4 && rand == this.sequence.at(-1)) {
      return this.getRandomButton();
    }
    if (this.sequence.length > 7 && rand == this.sequence.at(-3)) {
      return this.getRandomButton();
    }
    return rand;
  }

  setState(state) {
    this.state = state;
    this.notify("stateChanged");
  }

  clickedButton() {
    return this.buttons[this.userIn];
  }

  isUserInValid() {
    if (this.inputCounter < 0 || this.inputCounter >= this.sequence.length) {
      return false;
    }
    return this.sequence[this.inputCounter] == this.userIn;
  }

  isRoundOver() {
    return this.inputCounter === this.sequence.length - 1;
  }
}
