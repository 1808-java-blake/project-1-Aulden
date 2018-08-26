function addMovieToTable(user) {
  const tbody = document.getElementById('request-table-body');
  tbody.innerHTML += `
  <tr>
    <th scope="row">${user.username}</th>
    <td>${user.password}</td>
    <td>${user.firstName}</td>
  </tr>
  `
}

fetch('http://localhost:3000/users')
  .then(res => res.json())
  .then(res => {
    res.forEach(movie => {
      addMovieToTable(movie);
    })
  })
  .catch(err => {
    console.log(err);
  });