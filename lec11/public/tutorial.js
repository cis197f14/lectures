// Lec 11 - React.js

// | CommentBox
//   | CommentList
//     | Comment
//   | CommentForm

var converter = new Showdown.converter();

var data = [
  {author: 'Geoff V', text: 'This is [comment](http://google.com).'},
  {author: 'John S', text: 'This is *yet another* comment.'},
  {author: 'Bob J', text: 'This is the last comment'}
];

// CommentBox
// -getInitialState
// -componentDidMount
// -handleCommentSubmit
// -render
var CommentBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      method: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className='commentBox'>
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmitted={this.handleCommentSubmit}/>
      </div>
    );
  }
});

// CommentList
// -render
var CommentList = React.createClass({
  render: function() {
    var commentComponents = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author}>{comment.text}</Comment>
      );
    });
    return (
      <div className='commentList'>
        {commentComponents}
      </div>
    );
  }
});

// CommentForm
// -handleSubmit
// -render
var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.refs.author.getDOMNode().value;
    var text = this.refs.text.getDOMNode().value;
    // Submit to server
    this.props.onCommentSubmitted({author: author, text: text});
    this.refs.author.getDOMNode().value = '';
    this.refs.text.getDOMNode().value = '';
  },
  render: function() {
    return (
      <form className='commentForm' onSubmit={this.handleSubmit}>
        <input type='text' placeholder='Your name' ref='author' />
        <input type='text' placeholder='Say something...' ref='text' />
        <button type='submit'>Post</button>
      </form>
    );
  }
});

// Comment
// -render
var Comment = React.createClass({
  render: function() {
    var rawHtml = converter.makeHtml(this.props.children.toString());
    var o = {__html: rawHtml};
    return (
      <div className='comment'>
        <h3>{this.props.author}</h3>
        <span dangerouslySetInnerHTML={o} />
      </div>
    );
  }
});

React.render(
    <CommentBox url='/comments' />,
    document.getElementById('content')
);
