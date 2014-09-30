(function() {
  var Player = function($el, options) {
    options = options || {row: 0, col: 0};

    this.$el = $el;
    this.row = options.row;
    this.col = options.col;

    this.move(); // initial move
    this._setupPlayer();
  };

  Player.prototype.move = function() {
    this.$el.find('.tile').removeClass('flowers');
    var $rows = this.$el.find('.row');
    var $row = $rows.eq(this.row);
    var $cols = $row.find('.tile');
    var $col = $cols.eq(this.col);
    $col.addClass('flowers');
  };

  Player.prototype._setupPlayer = function() {
    var that = this;

    $(document).on('keydown', function(e) {
      console.log(e.which);
      switch (e.which) {
        case 37: // left
          that.col--;
          break;
        case 38: // up
          that.row--;
          break;
        case 39: // right
          that.col++;
          break;
        case 40: // down
          that.row++;
          break;
        default: return;
      }
      that.move();
    });
  };

  $(document).ready(function() {
    var $el = $('.map');
    var player = new Player($el, {row: 1, col: 1});
  });
})();
