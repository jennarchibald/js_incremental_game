const PubSub = require('../helpers/pub_sub');

const InfoView = function(container, title){
  this.container = container;
  this.title = title;
  this.score = 0;
  this.increment = 0.00;
}

InfoView.prototype.bindEvents = function () {
  PubSub.subscribe('Game:score-updated', (evt) => {
    this.score = evt.detail;
    this.render();
  })
  PubSub.subscribe('Game:increment-updated', (evt) => {
    this.increment = evt.detail;
    this.render();
  })
  this.renderTitle();
  window.setInterval(()=> {
        this.renderTitle();
  }, 1000);
};

InfoView.prototype.renderTitle = function () {
  this.title.textContent = this.score.toFixed(2);
};

InfoView.prototype.render = function () {
  this.container.innerHTML = ''
  const score = document.createElement('h2');
  score.textContent = this.score.toFixed(2);
  this.container.appendChild(score);
  const increment = document.createElement('h3');
  increment.textContent = this.increment.toFixed(2) + "/second";
  this.container.appendChild(increment);
};

module.exports = InfoView;
