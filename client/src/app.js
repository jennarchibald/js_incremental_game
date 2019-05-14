const ClickView = require('./views/click_view');
const Game = require('./models/game');
const InfoView = require('./views/info_view');
const AutoView = require('./views/auto_view');
const autos = require('./models/autos');

window.addEventListener('DOMContentLoaded', () => {
  console.log('Javascript Loaded');

  const autoContainer = document.querySelector('.auto-wrapper');
  const autoView = new AutoView(autoContainer);
  autoView.bindEvents();

  const game = new Game(autos);
  game.bindEvents();
  game.play();

  const infoContainer = document.querySelector('.info-wrapper')
  const infoView = new InfoView(infoContainer);
  infoView.render();
  infoView.bindEvents();


  const button = document.querySelector("#click-button");
  const clickView = new ClickView(button);
  clickView.bindEvents();
})
