function createRequest(event) {
  event.preventDefault();

  const amount = document.getElementById('input-amount').value;
  const description = document.getElementById('input-description').value;
  const type = document.getElementById('input-type').value;
  const author = JSON.parse(localStorage.getItem('user')).username;
  const password = JSON.parse(localStorage.getItem('user')).password;

  const request = {
    amount,
    description,
    type,
    author,
    password
  };
  
  fetch('../requests', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  })
  .then(resp => resp.json())
  .then(resp => {
    window.location.href = '../home/home.html';
  })
  .catch(err => {
    console.log(err);
  });
}