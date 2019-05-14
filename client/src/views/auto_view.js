const PubSub = require('../helpers/pub_sub');

const AutoView = function(container) {
  this.container = container;
  this.autos = null;
  this.score = 0;
}


AutoView.prototype.render = function(){
  this.container.innerHTML = '';
  let indexOfNext = 0;
  for (auto of this.autos){
    if (auto.number > 0 ){
      this.renderAuto(auto);
      indexOfNext += 1;
    }
  }
  this.renderAuto(this.autos[indexOfNext]);
}

AutoView.prototype.bindEvents = function () {
  PubSub.subscribe("Game:autos-ready", (evt) => {
    this.autos = evt.detail;
    this.render();
  })
  PubSub.subscribe('Game:score-updated', (evt) => {
    this.score = evt.detail;
    this.enableButtons();
  })
};

AutoView.prototype.makeBuyButton = function (auto){
  const buyButton = document.createElement('button');
  buyButton.classList.add('buy-button');
  buyButton.id = this.autos.indexOf(auto);
  if (auto.price > this.score){
    buyButton.disabled = true
  };
  buyButton.textContent = 'Buy';
  buyButton.addEventListener('click', (evt) => {
    PubSub.publish('AutoView:auto-buy-clicked', evt.target.id);
  });
  return buyButton;
}

AutoView.prototype.renderAuto = function (auto) {
  const autoContainer = this.makeContainer(auto);

  const autoName = this.makeAutoHeading(auto.prettyName, 'h2');
  autoContainer.appendChild(autoName);

  const bought = this.makeAutoHeading(`Owned : ${auto.number}`, 'h3');
  autoContainer.appendChild(bought);

  const price = this.makeAutoHeading(`Cost : ${auto.price.toFixed(2)}`, 'h3');
  autoContainer.appendChild(price);

  const production = this.makeAutoHeading(`Produces ${auto.rate.toFixed(2)}/second`, 'h4');
  autoContainer.appendChild(production);

  const buyButton = this.makeBuyButton(auto);

  autoContainer.appendChild(buyButton);
};

AutoView.prototype.makeAutoHeading = function (content, heading) {
  const autoHeading = document.createElement(heading);
  autoHeading.textContent = content;
  return autoHeading;
};

AutoView.prototype.makeContainer = function (auto) {
  const autoContainer = document.createElement('div');
  autoContainer.classList.add(`${auto.name}-container`)
  autoContainer.classList.add(`auto`)
  this.container.appendChild(autoContainer);
  return autoContainer;
};

AutoView.prototype.enableButtons = function (score) {
  const buttons = document.querySelectorAll('button.buy-button');
  for (button of buttons){
    if (this.autos[button.id].price > this.score){
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  }
};

module.exports = AutoView;
