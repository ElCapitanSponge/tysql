import path from 'path'
import { tysql } from '../../dist/tysql'

class test {
    public t: tysql
    constructor(public path: string, public env: string) {

        this.t = new tysql(path, env)
    }
}
let pool__use: boolean = true
let p: string = path.join(__dirname, '../')
let test__bind: test = new test(p, '.env')

let close__connection = () => {
    console.log('=== CLOSE ===')
    test__bind.t.close()
        .then(response => console.log('close ::: response', response))
        .catch(error => {
            console.error('close ::: error', error)
            process.exitCode = 9
            process.exit()
        })
}

let test__queries  = () => {
    console.log('=== QUERY ===')
    console.log('== PREPARED ==')
    test__bind.t.query('SELECT SUM(? + ?)', [1, 2])
        .then(response => console.log('query ::: response', response))
        .catch(error => {
            console.error('query ::: error', error)
            process.exitCode = 9
            process.exit()
        })
    console.log('== NON-PREPARED ==')
    test__bind.t.query('SELECT SUM(1 + 2)')
        .then(response => console.log('query ::: response', response))
        .then(() => close__connection())
        .catch(error => {
            console.error('query ::: error', error)
            process.exitCode = 9
            process.exit()
        })
}

console.log('test__bind.t.db__loaded()', test__bind.t.db__loaded())
console.log('=== DB CONNECTION ===')
console.log('test__bind.t.db__load()',test__bind.t.db__load(pool__use))
test__bind.t.db__init()
    .then(response => {
        console.log('db__init ::: response', response)
        test__queries()
    })
    .catch(error => {
        console.error('db__init ::: error', error)
        process.exitCode = 9
        process.exit()
    })
