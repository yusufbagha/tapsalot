import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session'
import swal from 'sweetalert2'
import './Contributions.scss';

export class Contributions extends Component {
  // Changes Username
  
  changeUsername(title) {
    let tryAgain = (title) => {
      this.changeUsername(title);
    }

    let gif = 'https://sweetalert2.github.io/images/nyan-cat.gif'

    // Meteor.call('gif.get', (error, result) => {
    //   if (!error) {
    //     gif = result.data.data.image_url;
    //   }

    //   console.log(result.data.data)

      swal({
        padding: '1.5em',
        title: title,
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off',
          maxlength: 10,
        },
        focusConfirm: false,
        confirmButtonText:  'Change Username',
        backdrop: `
          rgb(174, 152, 255)
          url(${gif})
          center left
          no-repeat
        `
      }).then((result) => {
        if (result.value) {
          if (result.value.length > 3) {
            // Calls 'username.update' Method
            Meteor.call('username.update', result.value, (error, result) => {
              if (error) {
                // Runs tryAgain() On Error From Server
                tryAgain('Username Taken, Try Again');
              }
            });
          } else {
            tryAgain('Usernames must be at least 4 characters');
          }
        }
      });
    // });

    // SweetAlert
    // swal({
    //   padding: '1.5em',
    //   title: title,
    //   input: 'text',
    //   inputAttributes: {
    //     autocapitalize: 'off',
    //     maxlength: 10,
    //   },
    //   focusConfirm: false,
    //   confirmButtonText:  'Change Username',
    //   backdrop: `
    //     rgb(174, 152, 255)
    //     url(${gif})
    //     center left
    //     no-repeat
    //   `
    // }).then((result) => {
    //   if (result.value) {
    //     if (result.value.length > 3) {
    //       // Calls 'username.update' Method
    //       Meteor.call('username.update', result.value, (error, result) => {
    //         if (error) {
    //           // Runs tryAgain() On Error From Server
    //           tryAgain('Username Taken, Try Again');
    //         }
    //       });
    //     } else {
    //       tryAgain('Usernames must be at least 4 characters');
    //     }
    //   }
    // });
  }

  render() {
    return (
      <div className="contributions-container">
        {/* Number Of Contributions */}
        <p>
          { this.props.currentUser ? 
            <span>{ this.props.currentUser.profile.contributions }</span> : '0' } Contributions 
        </p>

        {/* Username Blank If Not Logged In */}
        <p className="contributions-username" onClick={() => this.changeUsername()}>
          { this.props.currentUser ? 
          <span>
            <span>{ this.props.currentUser.username }</span>
            <i className="fas fa-pen"></i>
          </span> : '' } 
        </p>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    currentUser: Meteor.user(),
  };
})(Contributions);

// Comments

/* 

  # Random things occur when opening changeUsername() view

  # Giphy dev key : 'JV5ojFZAjMYai9rQLlA7xOOXaWsVjHr3'
  # NOTE : DO NOT PUT PRODUCTION KEYS IN CLIENT

*/