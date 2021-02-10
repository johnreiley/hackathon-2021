const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');


fetch(`/api/projects/${id}`)
    .then(response => response.json())
    .then(data => renderProjectInfo(data.data));

function renderProjectInfo(project) {
    console.log(project)
    var html = `${project.title}`;
    document.getElementById('recContainer').innerHTML = html;
}


async function renderProjectInfo(project) {
    var projectContainer = document.getElementById('project-container')

    var organizer = await getOrganizer(project.organizer)
    console.log(project)
    var startDate = new Date(project.dateStart)
    var projectCard = `    
<div id="project" class="card m-2">
    <img src="${project.image}" class="card-img-top" alt="Header Image">
    <div class="card-body">
        <h5 class="card-title">${project.title}</h5>
        <h6 class="card-subtitle text-muted">${organizer.name}</h6>
        <p class="card-text">${project.description}</p>
        <p class="card-text">Date: ${startDate.toLocaleDateString()}</p>
        <p class="card-text">Time: ${startDate.toLocaleTimeString()}</p>`;
    if (project.limit === undefined) {
        projectCard += `<p class="card-text">Open Voulenteer Spots: ¯\\_(ツ)_/¯</p>`;
    } else {
        projectCard += `<p class="card-text">Open Voulenteer Spots: ${project.limit}</p>`;
    }
    // Address stuff here
    projectCard += `<a href="#" class="card-link btn btn-outline-primary">Volunteer</a>
    </div>
</div>`;
    projectContainer.innerHTML += projectCard;
}

async function getOrganizer(id) {
    var user = await fetch(`/api/user/${id}`)
        .then(res => res.json())
        .then(data => {
            return data.data
        })
    return user;
}