function onSearch() {
  let searchQuery = document.getElementById('searchInput').value;
  window.location.href = `/projects?search=${searchQuery}`;
}