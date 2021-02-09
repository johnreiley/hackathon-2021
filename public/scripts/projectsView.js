async function loadDoc() {
    await fetch(`/api/projects`)
    .then(res => res.json())
    .then(data => {
        displayProjects(data.data);
    })

}

function displayProjects(projects) {
    var projectContainer = document.getElementById('projects')
    projects.forEach(async (project) => {
        var organizer = await getOrganizer(project.organizer)

        var cardHtml = `    
    <div class="card">
        <img src="${project.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${project.title}</h5>
            <h6 class="card-subtitle text-muted">${organizer.name}</h6>
            <p class="card-text">${project.description}</p>
            <a href="#" class="card-link btn btn-outline-primary">Volunteer</a>
        </div>
        <div class="card-footer text-muted">
            Added 2 days ago
        </div>
    </div>`;
        projectContainer.innerHTML += cardHtml;
    });
}

async function getOrganizer(id) {
    var user = await fetch(`/api/user/${id}`)
        .then(res => res.json())
        .then(data => {

            return data.data
        })



    return user;
}