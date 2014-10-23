// Todo (the model)
// ** properties/methods **
// defaults
// toggle
var Todo = Backbone.Model.extend({
  defaults: function() {
    return {
      title: '',
      done: false
    };
  },
  toggle: function() {
    this.set('done', !this.get('done'));
  }
});

// TodoList (the collection)
// ** properties/methods **
// model
// done
// remaining
// saveModels
// fetchModels
var TodoList = Backbone.Collection.extend({
  model: Todo,
  initialize: function() {
    this.on('all', this.saveModels);
  },
  done: function() {
    return this.where({done: true});
  },
  remaining: function() {
    return this.where({done: false});
  },
  saveModels: function() {
    var jsons = this.invoke('toJSON');
    window.localStorage.setItem('todo-app', JSON.stringify(jsons));
  },
  fetchModels: function() {
    var todos = JSON.parse(window.localStorage.getItem('todo-app'));
    var that = this;
    _.map(todos, function(model) {
      that.add(model);
    });
  }
});

// TodoView (the view for the model)
// ** properties/methods **
// tagName
// events
// initialize
// render
// toggleDone
// edit
// close
// updateOnEnter
// destroy
var TodoView = Backbone.View.extend({
  tagName: 'li',
  events: {
    'click .toggle': 'toggleDone',
    'dblclick .view': 'edit',
    'keypress .edit': 'updateOnEnter',
    'click .destroy': 'destroy',
    'blur .edit': 'close'
  },
  initialize: function(options) {
    this.model = options.model;
    this.listenTo(this.model, 'change', this.render);
    // this.model.on('change', this.render, this);
    this.template = _.template($('#item-template').html());
  },
  render: function() {
    var html = this.template(this.model.toJSON());
    this.$el.html(html);
    return this;
  },
  toggleDone: function() {
    this.model.toggle();
  },
  edit: function() {
    this.$el.addClass('editing');
  },
  close: function() {
    this.model.set('title', this.$el.find('.edit').val());
    this.$el.removeClass('editing');
  },
  updateOnEnter: function(e) {
    if (e.which === 13) { // Enter key
      this.model.set('title', this.$el.find('.edit').val());
      this.$el.removeClass('editing');
    }
  },
  destroy: function() {
    this.model.collection.remove(this.model);
    this.stopListening();
    this.$el.remove();
  }
});

// AppView (the view for the entire app)
// ** properties/methods **
// el
// events
// initialize
// render
// addOne
// createOnEnter
// toggleAllComplete
var AppView = Backbone.View.extend({
  el: $('#todoapp'),
  events: {
    'keypress #new-todo': 'createOnEnter',
    'click #toggle-all': 'toggleAllComplete'
  },
  initialize: function(options) {
    console.log('initializing appview');
    this.todos = new TodoList();
    this.template = _.template($('#stats-template').html());

    this.listenTo(this.todos, 'all', this.render);
    this.listenTo(this.todos, 'add', this.addOne);

    this.main = this.$el.find('#main');
    this.footer = this.$el.find('footer');
    this.input = this.$el.find('#new-todo');

    this.todos.fetchModels();
  },
  render: function() {
    console.log('rendering the appview');
    var remaining = this.todos.remaining().length;
    if (this.todos.length) {
      this.main.show();
      this.footer.html(this.template({remaining: remaining}));
      this.footer.show();
    } else {
      this.main.hide();
      this.footer.hide();
    }
    return this;
  },
  createOnEnter: function(e) {
    if (e.which === 13) { // Enter key
      this.todos.add({title: this.input.val()});
      this.input.val('');
    }
  },
  addOne: function(todo) {
    console.log('adding one');
    var view = new TodoView({model: todo});
    var compiled = view.render().el;
    this.main.find('#todo-list').append(compiled);
  },
  toggleAllComplete: function() {
    this.todos.invoke('toggle');
  }
});

$(document).ready(function() {
  window.app = new AppView();
});
