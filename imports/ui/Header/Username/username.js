import swal from 'sweetalert2'

// refactor code
export const Username = (title) => {
    let gif = '';

    let tryAgain = (title) => {
      Username(title);
    }

    Meteor.call('gif.get', (error, result) => {
      if (!error) {
        gif = result.data.data.image_url;
      }

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
        `
      }).then((result) => {
        if (result.value) {
          if (result.value.length > 3) {
            Meteor.call('username.update', result.value, (error, result) => {
              if (error) {
                tryAgain('Username Taken, Try Again');
              }
            });
          } else {
            tryAgain('Usernames must be at least 4 characters');
          }
        }
      });
    });
  }