function addRequestToTable(request) {
  const tbody = document.getElementById('request-table-body');
  tbody.innerHTML += `
  <tr>
    <th scope="row">${request.id}</th>
    <td>${request.amount}</td>
    <td>${request.submitted}</td>
    <td>${request.resolved}</td>
    <td>${request.description}</td>
    <td>${request.author}</td>
    <td>${request.resolver}</td>
    <td>${request.status}</td>
    <td>${request.type}</td>
  </tr>
  `
}

let user = JSON.parse(localStorage.getItem('user'));

fetch(`http://localhost:3000/requests/user/${user.id}`)
  .then(res => res.json())
  .then(res => {
    res.forEach(request => {
      addRequestToTable(request);
    })
  })
  .catch(err => {
    console.log(err);
  });