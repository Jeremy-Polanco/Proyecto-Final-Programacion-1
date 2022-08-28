const user = localStorage.getItem('user');

if (!user || user === null) {
  window.location.replace('/register');
}
