const User = require('./user');

const generateSeq = num => () => ++num;

class Users {
  constructor() {
    this.users = [];
  }

  add(id, name, books) {
    return this.users.push(new User(id, name, books));
  }

  remove(id) {
    const position = this.users.findIndex(user => user.id === id);
    return this.users.slice(position, 1);
  }

  findUser(id) {
    return this.users.find(user => user.id === id);
  }

  assignBook(userId, bookId, bookName) {
    const user = this.findUser(userId);
    return user.assign(bookId, bookName);
  }

  returnBook(userId, bookId) {
    const user = this.findUser(userId);
    return user.return(bookId);
  }

  static load(userList) {
    const users = new Users;
    userList.forEach(({id, name, books}) => users.add(id, name, books));
    const generateUserId = generateSeq(userList[userList.length - 1].id);
    return {users, generateUserId};
  }
}

module.exports = Users;