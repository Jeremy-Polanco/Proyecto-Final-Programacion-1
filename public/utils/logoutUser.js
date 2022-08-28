export const logoutUser = async () => {
  try {
    await fetch.delete('/api/v1/auth/logout');
    localStorage.removeItem('user');
    window.location.replace('/login');
  } catch (error) {
    localStorage.removeItem('user');
    window.location.replace('/login');
  }
};
