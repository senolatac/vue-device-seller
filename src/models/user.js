export default class User {
    constructor(id, username, password, name, role, token) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.name = name;
        this.role = role;
        this.token = token;
    }
}
