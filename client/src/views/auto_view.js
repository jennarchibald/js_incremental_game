const PubSub = require('../helpers/pub_sub');

const AutoView = function(container) {
  this.container = container;
  this.autos = null;
}

AutoView.prototype.render = function(){
  this.container.innerHTML = '';
  for (auto of this.autos){
    if (auto.number > 0 ){
      this.renderAuto(auto);
    } else {
      this.renderNextAuto(auto);
      return;
    }
  }
}

AutoView.prototype.bindEvents = function () {
  PubSub.subscribe("Game:autos-ready", (evt) => {
    this.autos = evt.detail;
    this.render();
  })
};

AutoView.prototype.renderNextAuto = function(){
  const autoContainer = this.makeContainer(auto);

  const autoName = this.makeAutoHeading(auto.prettyName);
  autoContainer.appendChild(autoName);

  const price = this.makeAutoHeading(`Cost : ${auto.price.toFixed(2)}`);
  autoContainer.appendChild(price);

  const buyButton = this.makeBuyButton(auto);

  autoContainer.appendChild(buyButton);
}

AutoView.prototype.makeBuyButton = function (auto){
  const buyButton = document.createElement('button');
  buyButton.id = this.autos.indexOf(auto);
  buyButton.textContent = 'Buy';
  buyButton.addEventListener('click', (evt) => {
    PubSub.publish('AutoView:auto-buy-clicked', evt.target.id);
  });
  return buyButton;
}

AutoView.prototype.renderAuto = function (auto) {
  const autoContainer = this.makeContainer(auto);

  const autoName = this.makeAutoHeading(auto.prettyName);
  autoContainer.appendChild(autoName);

  const bought = this.makeAutoHeading(`Bought : ${auto.number}`);
  autoContainer.appendChild(bought);


  const price = this.makeAutoHeading(`Cost : ${auto.price.toFixed(2)}`);
  autoContainer.appendChild(price);

  const buyButton = this.makeBuyButton(auto);

  autoContainer.appendChild(buyButton);
};

AutoView.prototype.makeAutoHeading = function (content) {
  const autoHeading = document.createElement('h2');
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

module.exports = AutoView;
