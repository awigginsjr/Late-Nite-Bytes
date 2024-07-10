import decode from 'jwt-decode';

class Auth {
  getToken() {
    return localStorage.getItem('token');
  }

  saveToken(token) {
    localStorage.setItem('token', token);
  }

  logout() {
    localStorage.removeItem('token');
  }

  getProfile() {
    return decode(this.getToken());
  }

  isLoggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    const decoded = decode(token);
    return decoded.exp < Date.now() / 1000;
  }
}

export default new Auth();
