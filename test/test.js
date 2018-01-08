function greeter(person) {
    return "Hello, " + person.age + person.name;
}
var Student = /** @class */ (function () {
    function Student(name, age) {
        this.name = name;
        this.age = age;
        this.nameAndAge = name + "-" + age;
    }
    return Student;
}());
var user = {
    age: 11,
    name: '22'
};
var user1 = new Student('ss', 11);
document.body.innerHTML = greeter(user1);
