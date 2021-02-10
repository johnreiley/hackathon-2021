document.getElementById('addProjectForm').onsubmit = (e) => {
  e.preventDefault();
  
  let title = document.getElementById('title').value;
  let image = document.getElementById('image').value;
  let location = document.getElementById('location').value;
  let time = document.getElementById('time').value;
  let dateStart = document.getElementById('startDate').value;
  let dateEnd = document.getElementById('endDate').value;
  let limit = document.getElementById('limit').value;
  let description = document.getElementById('description').value;
  let tags = Array.from(document.getElementById('tags').value.split(',').map(t => t.trim()));
  
  let project = {
    title,
    description,
    location,
    dateStart: new Date(`${dateStart} ${time}`),
    dateEnd: dateEnd ? new Date(dateEnd) : undefined,
    organizer: userId,
    image,
    tags,
    limit
  }

  fetch('/api/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(project)
  })
  .then(res => res.json())
  .then((data) => {
    console.log(data);
    if (data.success) {
      // window.location.href = `/projects/${res.data._id}`;
      window.location.href = '/projects';
    } else {
      // uh oh
      window.alert('There was a form validation error');
    }
  })
  .catch(err => {
    // show an error on the form
    window.alert('OOPS, something went wrong');
  })
}