# Monads for javascript

## Option

Usage:
```javascript

import Option from 'option';

// Basic value

const opt1 = Option.of ('BOE')

console.log (opt1.isSome)   // true
console.log (opt1.isNone)   // false
console.log (opt1.value())  // BOE

// Basic none (no value)

const opt2 = Option.none

console.log (opt2.isSome)   // false
console.log (opt2.isNone)   // true
opt2.value()                // throws error 'Option has no value'

// Setting null leads to none and is factual Option.none

const opt3 = Option.of (null)

console.log (opt3.isSome)   // false
console.log (opt3.isNone)   // true
opt3.value()                // throws error 'Option has no value'

// Mapping

const opt4 = Option.of ('BOE')
    .map (v => `${v}-BA`)

console.log (opt4.isSome)   // true
console.log (opt4.isNone)   // false
console.log (opt4.value())  // BOE-BA

// Flatmapping (aka mapping to another Option)

const opt5 = Option.of ('BOE')
    .flatMap (v => Option.of (`${v}-BA`))

console.log (opt5.isSome)   // true
console.log (opt5.isNone)   // false
console.log (opt5.value())  // BOE-BA

// Mapping of none

const opt6 = Option.none
    .map (v => `${v}-BA`)

console.log (opt6.isSome)   // false
console.log (opt6.isNone)   // true

// Chaining

const opt7 = opt5.flatMap (v => opt4)

console.log (opt7.isSome)   // true
console.log (opt7.isNone)   // false
console.log (opt7.value())  // BOE-BA

```


## Try

Usage:
```javascript

import Try from 'try';

// Basic value

const try1 = Try.succesfull ('BOE')

console.log (try1.get())  // BOE

// Basic failure

const try2 = Try.failure ('Some error')

try {
    try2.get()
} catch (e) {
    console.error (e)  // Result: Some error
}

// Basic

const try3 = Try.ofFailable (() => 'BA')

try {
    try2.get()
} catch (e) {
    console.error (e)  // Result: Some error
}

const try4 = Try.ofFailable (() => { throw 'Some error' })

try {
    try4.get()
} catch (e) {
    console.error (e)  // Result: Some error
}

// Side-FX

const try5 = Try.ofFailable (() => 'BA')
    .onSuccess (v => console.log (`Success: ${v}`))  // Feedbacks Success: BA
    .ofFailure (e => console.log (`Error: ${e}`))

console.log (try5.get())  // BA

const try6 = Try.ofFailable (() => { throw 'Some error' })
    .onSuccess (v => console.log (`Success: ${v}`))  
    .ofFailure (e => console.log (`Error: ${e}`))    // Feedbacks Error: Some error

try {
    try6.get()
} catch (e) {
    console.error (e)  // Result: Some error
}

// Mapping

const try7 = Try.succesfull('BOE')
    .map (v => `${v}-BA`)

console.log (try7.get())  // BOE-BA

// Flatmapping (aka mapping to another Try)

const try8 = Try.succesfull('BOE')
    .flatMap (v => Try.succesfull(`${v}-BA`))

console.log (try8.get())  // BOE-BA

// Map to option

const try9 = Try.succesfull('BOE')
    .toOption ()

console.log (try9.isSome)  // true
console.log (try9.value())  // BOE

const try10 = Try.failure('BOE')
    .toOption ()

console.log (try10.isNone)  // true


```
