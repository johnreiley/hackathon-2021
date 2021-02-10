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
    projectContainer.innerHTML = '';

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
        projectCard += `<p class="card-text">Open Volunteer Spots: ¯\\_(ツ)_/¯</p>`;
    } else {
        projectCard += `<p class="card-text">Open Volunteer Spots: ${project.limit - project.volunteers.length}</p>`;
    }
    // Address stuff here
    if (project.limit - project.volunteers.length !== 0) {
        projectCard += `<button class="card-link btn btn-outline-primary" onclick="volunteer('${project._id}')">Volunteer</button>`
    } else {
        projectCard += `<button class="card-link btn btn-outline-primary disabled" disabled onclick="volunteer('${project._id}')">Volunteer</button>`

    }

    projectCard += `</div>
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