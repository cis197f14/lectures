var Person = Backbone.Model.extend({
  initialize: function(options) {
    console.log("Initializing the model");
    console.log(options);
    this.set("age", options.age);

    var that = this;
    this.on('change:age', this.changedAge);
    this.on('change:selected', this.changedSelected);
  },

  changedAge: function() {
    console.log("You've just turned " + this.get("age"));
  },
  changedSelected: function() {
  }
});

var geoff = new Person({age: '21'});
