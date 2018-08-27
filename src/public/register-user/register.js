function registerUser(event) {
  event.preventDefault();
  let username = document.getElementById('inputUsername').value;
  let password = document.getElementById('inputPassword').value;
  let firstName = document.getElementById('inputFirstName').value;
  let lastName = document.getElementById('inputLastName').value;
  let email = document.getElementById('inputEmail').value;

  const user = { username, password, firstName, lastName, email };
  fetch('../users', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(user)
  })
    .then(resp => {
      if (resp.status === 401) {
        document.getElementById('error-message').innerText = 'Please try again';
      } else if (resp.status === 200) {
        return resp.json();
      } else {
        document.getElementById('error-message').innerText = 'Failed to Register at this time';
      }
      throw 'Failed to register';
    })
    .then(resp => {
      window.location.href = '../';
    })
    .catch(err => {
      console.log(err);
    });
}