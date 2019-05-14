const PubSub = require('../helpers/pub_sub');

const ClickView = function(button) {
  this.button = button;
}

ClickView.prototype.bindEvents = function () {
  this.button.addEventListener('click', () => {
    PubSub.publish('ClickView:button-click')
  })
};

module.exports = ClickView;
