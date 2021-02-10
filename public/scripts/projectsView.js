async function loadDoc() {
    let urlParams = new URLSearchParams(window.location.search);
    let baseUrl = `/api/projects`;
    let url = urlParams.has('search') ? `${baseUrl}?search=${urlParams.get('search')}` : baseUrl;
    await fetch(url)
    .then(res => res.json())
    .then(data => {
        displayProjects(data.data);
    })

}

function displayProjects(projects) {
    var projectContainer = document.getElementById('projects')
    projects.forEach(async (project) => {
        var organizer = await getOrganizer(project.organizer)
        var today = new Date()
        var projectDate = new Date(project.dateStart)
        var one_day = 1000 * 60 * 60 * 24;
        var timeLeft = Math.ceil((projectDate.getTime() - today.getTime()) / (one_day))
        if (timeLeft > 0){
            var cardHtml = `    
        <div class="card">
            <img src="${project.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${project.title}</h5>
                <h6 class="card-subtitle text-muted">${organizer.name}</h6>
                <p class="card-text">${project.description}</p>
                <a href="/project?id=${project._id}" class="card-link btn btn-outline-secondary">More Info</a>
            </div>
            <div class="card-footer text-muted">
                Days left until project ${timeLeft}
            </div>
        </div>`;
            projectContainer.innerHTML += cardHtml;
        }
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