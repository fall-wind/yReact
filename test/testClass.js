class A {
    constructor(str) {
        this.str = str
    }

    receive(str) {
        if (this.str !== str) {
            this.str = str
            console.error(this)
        }
    }
}

const a = new A('110')
console.error(a.str)
a.receive('100')
console.error(a.str)