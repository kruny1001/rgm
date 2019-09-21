
class betInfo {
    constructor(id) {
        this.histories = [id]
    }
}

class UserInfo extends betInfo{
    constructor(id) {
        super(id)
        this.name = 'kevin'
        this.points = 0
        
    }
}

class UserAction extends UserInfo {
    constructor(id){
        super(id)
    }
    
    printName(){ console.log(`hello ${this.name}`) }
    loadUserInfo(){ console.log("user loaded")}
    loadUserBet(){ console.log("bet loaded")}
}

class User extends UserAction {
    constructor(id){
        super(id)
        this.loadUserInfo()
        this.loadUserBet()
    }
}

let userObj = new User(1)
userObj.printName()
console.log(userObj.name)
console.log(userObj.histories)