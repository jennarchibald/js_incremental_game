const PubSub = require('../helpers/pub_sub');

const InfoView = function(container){
  this.container = container;
  this.score = 0;
}

InfoView.prototype.bindEvents = function () {
  PubSub.subscribe('Game:score-updated', (evt) => {
    this.score = evt.detail;
    this.render();
  })
};

InfoView.prototype.render = function () {
  this.container.innerHTML = ''
  const score = document.createElement('h2');
  score.textContent = this.score.toFixed(2);
  this.container.appendChild(score);
};

module.exports = InfoView;
