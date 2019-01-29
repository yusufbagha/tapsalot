import swal from 'sweetalert2'

export const Profile = (user) => {
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