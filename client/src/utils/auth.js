const jwtDecode = (await import('jwt-decode')).default;
// import jwtDecode from 'jwt-decode';

// create a new class to instantiate for a user
class AuthService {
  // get user data
  getProfile() {
    return jwtDecode(this.getToken());
  }

  // check if user's logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    console.log('token from auth loggedIn: ',token);
    return token && !this.isTokenExpired(token) ? true : false; // handwaiving here
  }

  // check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  login(token) {
    console.log('token from auth login',token);
    // Saves user token to localStorage
    localStorage.setItem('id_token', token);
    window.location.assign('/');
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    // this will reload the page and send to the home page
    window.location.assign('/');
  }
}

export default new AuthService();
