import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert2'
import './ChatMessages.scss';
import { Session } from 'meteor/session';

const Messages = new Mongo.Collection('messages');
let limit = 50;

class ChatMessages extends Component {
  showProfile(user) {
    swal({
      title: user.username,
      text: `${user.profile.contributions} Contributions`,
      showConfirmButton: false,
      backdrop: `
        rgb(174, 152, 255)
        url("https://sweetalert2.github.io/images/nyan-cat.gif")
        center left
        no-repeat
      `
    });
  }

  renderMessages() {
    return this.props.messages.map((message) => (
      <div className="message-container" key={message._id}>
          <p><span onClick={() => this.showProfile(message.user)}>{message.user.username}</span> - {message.message}</p>
      </div>
    ));
  }
  // state = {
    
  // }

  render() {
    return (
      <div className="chat-messages-wrapper">
        <div className="chat-messages-container">
          {this.renderMessages()}
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('public.messages');
  Meteor.subscribe('public.users');

  let limit = Session.get('limit')

  if (limit == undefined) {
    limit = 60;
    Session.set('limit', limit)
  }

  let messages = Messages.find({}, {sort: {date: -1}, limit: limit});
  let messagesArr = [];

  window.onscroll = (event) => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      Session.set('limit', limit + 50)
    }
  };

  messages.forEach((document) => {
    document.user = Meteor.users.findOne({_id: document.userId});

    messagesArr.push(document)
  })

  // console.log(messagesArr);

  return {
    messages: messagesArr,
  };
})(ChatMessages);







// import { Meteor } from 'meteor/meteor';
// import { ReactiveVar } from 'meteor/reactive-var';
// import React, { Component } from 'react';
// import { createContainer } from 'meteor/react-meteor-data';

// const DEFAULT_LIMIT = 10
// const LIMIT_INCREMENT = 10
// const limit = new ReactiveVar(DEFAULT_LIMIT)

// export default createContainer(props => {
//   const subscriptionsReady = [
//     Meteor.subscribe('foo', {limit: limit.get()}),
//   ].every(subscription => subscription.ready())

//   const cursor = Foo.find({}, {
//     sort: {bar: 1},
//     limit: limit.get(),
//   })

//   return {
//     subscriptionsLoading: !subscriptionsReady,
//     records: cursor && cursor.fetch(),
//     count: cursor && cursor.count(),
//   }
// }, class extends Component {
//   constructor (props) {
//     super(props)
//     limit.set(DEFAULT_LIMIT)
//   }

//   shouldComponentUpdate (nextProps, nextState) {
//     const {subscriptionsLoading, count} = nextProps
//     if (!subscriptionsLoading && count === 0) {
//       return true
//     }
//     return count > 0
//   }

//   loadMore = (e) => {
//     if (e) e.preventDefault()
//     limit.set(limit.get() + LIMIT_INCREMENT)
//   }

//   render () {
//     const {
//       subscriptionsLoading,
//       records,
//       count,
//     } = this.props

//     return <div>
//       {
//         records.length === 0
//           ? !subscriptionsLoading && <div>Nothing to show</div>
//           : <ul>records.map(record => <li key={record._id}>{record.foo}</li>)</ul>
//       }
//       {
//         subscriptionsLoading && <div>Loading...</div>
//       }
//       {
//         !subscriptionsLoading && count >= DEFAULT_LIMIT && <button onClick={this.loadMore}>Load More</button>
//       }
//     </div>;
//   }
// })
// 2