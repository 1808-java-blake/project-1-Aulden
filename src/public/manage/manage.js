function addRequestToTable(request) {
  const tbody = document.getElementById('request-table-body');
  tbody.innerHTML += `
  <tr>
    <th scope="row">${request.id}</th>
    <td>${request.amount}</td>
    <td>${request.submitted.slice(0, 10)}</td>
    <td>${request.resolved.slice(0, 10)}</td>
    <td>${request.description}</td>
    <td>${request.author}</td>
    <td>${request.resolver}</td>
    <td>${request.status}</td>
    <td>${request.type}</td>
  </tr>
  `
}

fetch(`http://localhost:3000/requests`)
  .then(res => res.json())
  .then(res => {
    res.forEach(request => {
      addRequestToTable(request);
    })
  })
  .catch(err => {
    console.log(err);
  });