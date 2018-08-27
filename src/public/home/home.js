function addRequestToTable(request) {
  const tbody = document.getElementById('request-table-body');
  let resolver = 0;
  if(request.resolver === 0){
      resolver = "N/A";
  }
  else{
      resolver = request.resolver;
  }

  tbody.innerHTML += `
  <tr>
    <th scope="row">${request.id}</th>
    <td>${request.amount}</td>
    <td>${request.submitted.slice(0, 10)}</td>
    <td>${request.resolved.slice(0, 10)}</td>
    <td>${request.description}</td>
    <td>${JSON.parse(localStorage.getItem('user')).username}</td>
    <td>${resolver}</td>
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