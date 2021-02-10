function onSearch() {
  let searchQuery = document.getElementById('searchInput').value;
  if (searchQuery) {
    window.location.href = `/projects?search=${searchQuery}`;
  } else {
    window.location.href = "/projects";
  }
}