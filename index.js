"use strict";

function main() {
  const data = new SimonData();
  const viewer = new SimonViewer(data);
  const controller = new Controller(data);

  data.addEventListener("clicked", function () {
    viewer.onButtonClicked();
    controller.onButtonClick();
  });

  data.addEventListener("keydown", function () {
    controller.onKeydown();
  });

  data.addEventListener("stateChanged", function () {
    viewer.onStateChanged();
  });

  data.addEventListener("sequenceExtended", function () {
    viewer.onSequenceExtended();
  });

  data.setState(GAME_STATE_WAITTING);
}

$(window).on("load", main);
