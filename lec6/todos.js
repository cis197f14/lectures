// The model is the data for the application
var TodoModel = Backbone.Model.extend({
  defaults: {
    done: false,
    text: ''
  },
  initialize: function(options) {
    this.set(options);
  },
  toggle: function() {
    this.set('done', !this.get('done'));
  }
});

// The view is going render the model and bind events
var TodoView = Backbone.View.extend({
  tagName: 'li',
  initialize: function(options) {
    this.model = options.model;
    this.tmpl = _.template($('#todo-template').html());

    // the third argument is the context
    this.model.on('change', this.render, this);
  },
  events: {
    'click .todo-check': 'toggleTodo'
  },
  toggleTodo: function() {
    this.model.toggle();
  },
  render: function() {
    var compiled = this.tmpl( this.model.toJSON() );
    this.$el.html( compiled );
    return this;
  }
});

// A fancy array of models
var Todos = Backbone.Collection.extend({
  model: TodoModel,
  remaining: function() {
    var left = this.where({done: false});
    return left.length;
  }
});

// A view for the entire front-end application
var AppView = Backbone.View.extend({
  initialize: function() {
    this.collection = new Todos([ {text: 'Brush teeth'} ]);
    this.tmpl = _.template($('#app-template').html());

    // the third argument is the context
    this.collection.on('all', this.render, this);
  },
  events: {
    'keypress #todo-text': 'createOnEnter'
  },
  createOnEnter: function(e) {
    // 13 is the Enter key
    if (e.which === 13) {
      var text = $('#todo-text').val();
      // Create a new model and add it to the Collection
      var todomodel = new TodoModel({text: text});
      this.collection.add(todomodel);
    }
  },
  render: function() {
    var compiled = this.tmpl({collection: this.collection});
    this.$el.html(compiled);

    // Render all the models in the collection
    var compiledViews = this.collection.map(function(todo) {
      var todoview = new TodoView({model: todo});
      return todoview.render().el;
    });

    this.$el.find('#todo-list').html( compiledViews );
    return this;
  }
});


$(document).ready(function() {
  window.app = new AppView();
  $('#todos').html( app.render().el );
});
