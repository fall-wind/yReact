interface Person {
    age: number,
    name: string,
}

function greeter(person: Person) {
    return "Hello, " + person.age + person.name;
}

class Student {
    nameAndAge: string
    constructor(public name: string,public age: number) {
        this.nameAndAge = `${name}-${age}`
    }
}

let user = {
    age: 11,
    name: '22'
};

const user1 = new Student('ss', 11)

document.body.innerHTML = greeter(user1)