class UserDto { 
  email;
  id;
  isActivated;
  nickname;
  
  constructor(model) { 
    this.email = model.email;
    this.id = model.id;
    this.isActivated = model.isActivated;
    this.nickname = model.nickname
    this.role = model.role
  }
}
module.exports = UserDto