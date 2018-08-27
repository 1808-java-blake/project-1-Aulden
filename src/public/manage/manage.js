function addRequestToTable(request) {
  const tbody = document.getElementById('request-table-body');

  let resolver = 0;
  if(request.resolver === 0){
      resolver = "N/A";
  }
  else{
      resolver = request.resolver;
  }

  let appr = "";
  if(request.status === "PENDING"){
    appr = `<select onchange="changeReqStatus(${request.id})">
                <option value=""></option>
                <option value="1">Approve</option>
                <option value="2">Deny</option>
            </select>`;
  }
  tbody.innerHTML += `
  <tr>
    <th scope="row">${appr}</th>
    <td>${request.id}</td>
    <td>${request.amount}</td>
    <td>${request.submitted.slice(0, 10)}</td>
    <td>${request.resolved.slice(0, 10)}</td>
    <td>${request.description}</td>
    <td>${request.author}</td>
    <td>${resolver}</td>
    <td>${request.status}</td>
    <td>${request.type}</td>
  </tr>
  `
}

function changeReqStatus(id){
    let tbl = document.getElementById("request-table");
    let tags = tbl.getElementsByTagName("td");
    for(let i=0; i<tags.length; i++){
        if(tags[i].innerText == id){
            let th = tags[i].parentElement.getElementsByTagName("th")[0];
            let val = th.getElementsByTagName("select")[0].value;
            if(val == 1){
                approval(id);
            }
            else if(val == 2){
                denial(id);
            }
        }
    }
}

function approval(id){
    fetch(`http://localhost:3000/requests/approve/${id}`, {
        method: 'PUT',
        body: localStorage.getItem('user')
    })
        .then(resp => resp.json())
        .then(resp => {
            window.location = 'http://localhost:3000/manage/manage.html';
        })
        .catch(err => {
            console.log(err);
        });
}

function denial(id){
    fetch(`http://localhost:3000/requests/deny/${id}`, {
        method: 'PUT',
    })
        .then(resp => resp.json())
        .then(resp => {
            window.location = 'http://localhost:3000/manage/manage.html';
        })
        .catch(err => {
            console.log(err);
        });
}

document.getElementById("sort").addEventListener("change", () => {
    let val = document.getElementById("sort").value;


    if(val === "default"){
        getAll();
    }
    else{
        getSpecific(val);
    }
});

function getAll() {
    fetch(`http://localhost:3000/requests`)
        .then(res => res.json())
        .then(res => {
            document.getElementById("request-table-body").innerHTML = '';
            res.forEach(request => {
                addRequestToTable(request);
            })
        })
        .catch(err => {
            console.log(err);
        });
}

function getSpecific(val) {
    fetch(`http://localhost:3000/requests/status/${val}`)
        .then(res => res.json())
        .then(res => {
            document.getElementById("request-table-body").innerHTML = '';
            res.forEach(request => {
                addRequestToTable(request);
            })
        })
        .catch(err => {
            console.log(err);
        });
}

getAll();