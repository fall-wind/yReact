let arr = []

for (let i = 0; i < 1000; i++) {
    arr.push(i)
}
let a, b
function test() {
    const startDate = new Date().getTime()
    const len = arr.length
    for(let i = 0; i < len; i++) {
        console.log(i)
    }
    a = new Date().getTime() - startDate
}
test()


function test1() {
    const startDate = new Date().getTime()
    arr.map(it => {
        console.log(it)
    })
    b = new Date().getTime() - startDate
}
test1()

console.log(a, b)
