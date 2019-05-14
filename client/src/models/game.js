const PubSub = require('../helpers/pub_sub');

const Game = function(autos){
  this.score = 0;
  this.autos = autos;
};

Game.prototype.bindEvents = function(){
  PubSub.subscribe('ClickView:button-click', () => {
    this.score += 1;
    PubSub.publish('Game:score-updated', this.score);
  })

  PubSub.publish("Game:autos-ready", this.autos)

  PubSub.subscribe('AutoView:auto-buy-clicked', (evt) => {
    this.handleBuy(evt.detail);
  })

}

Game.prototype.handleBuy = function (index) {
  const auto = this.autos[index];
  if (this.score < auto.price){
    return;
  } else {
    this.score -= auto.price;
    this.autos[index].number += 1;
    this.autos[index].price *= 1.15;
    PubSub.publish("Game:autos-ready", this.autos)
    PubSub.publish('Game:score-updated', this.score);
  }
};

Game.prototype.play = function(){
  window.setInterval(() => {
    let increment = 0;
    for (auto of this.autos){
      increment += auto.number * auto.rate;
    }
    this.score += increment;
    PubSub.publish('Game:score-updated', this.score);
  }, 1000);
}


module.exports = Game;
