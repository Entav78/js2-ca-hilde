/*Delete this file

export class Auth {
  constructor(apiEndpoint) {
    this.apiEndpoint = apiEndpoint;
  }

  async register(data) {
    try {
      const response = await fetch(`${this.apiEndpoint}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Registration failed.");
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Error during registration: ${error.message}`);
    }
  }

  async login(data) {
    try {
      const response = await fetch(`${this.apiEndpoint}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Login failed.");
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Error during login: ${error.message}`);
    }
  }

  async handleRegister(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const user = await this.register(data);
      alert("Registration successful!");
      window.location.href = "/auth/login/";
    } catch (error) {
      alert(`Registration failed: ${error.message}`);
    }
  }

  async handleLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const user = await this.login(data);
      alert("Login successful!");
      window.location.href = "/profile/";
    } catch (error) {
      alert(`Login failed: ${error.message}`);
    }
  }
}
*/