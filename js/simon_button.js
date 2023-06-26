"use strict";

class SimonButton {
  constructor(btn, id) {
    this.btn = btn;
    this.id = id;
    this.itemIndex = 0;
    this.animationDelay = 600;
    this.initButton();
  }

  initButton() {
    this.color = $(this.btn).attr("id");
    this.sound = $(`audio[name="${this.color}"]`).get(0);
    $(this.btn).css({ "background-color": this.color });
    $(this.btn).attr("data-id", this.id);
    this.soundURL = `./sounds/${this.btn.id}.mp3`;
  }

  play() {
    let sound = new Audio(this.soundURL);
    sound.play();
  }

  blink() {
    $(this.btn).fadeTo(this.animationDelay / 2, 0.3);
    $(this.btn).fadeTo(this.animationDelay / 2, 1);
  }

  click() {
    this.play();
    this.blink();
  }
}
