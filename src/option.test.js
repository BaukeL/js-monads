import Option from './option';

// Basic value

test (`Option with value should say 'BOE'`, () => 
    expect (Option.of('BOE').value())
    .toBe ('BOE')
)

test (`Option with value should be some`, () => 
    expect (Option.of('BOE').isSome)
    .toBeTruthy ()
)

test (`Option with value shouldn't be none`, () => 
    expect (Option.of('BOE').isNone)
    .toBeFalsy ()
)

// Basic none

test (`Option none should fail with exception: 'Option has no value'`, () => 
    expect(() => { 
        Option.none.value() 
    })
    .toThrow('Option has no value')
)

test (`Option with no value shouldn't be some`, () => 
    expect (Option.none.isSome)
    .toBeFalsy ()
)

test (`Option with no value should be none`, () => 
    expect (Option.none.isNone)
    .toBeTruthy ()
)

// Setting null leads to none

test (`Option with value null should fail with exception: 'Option has no value'`, () => 
    expect(() => { 
        Option.of(null).value() 
    })
    .toThrow('Option has no value')
)

test (`Option with value null shouldn't be some`, () => 
    expect (Option.of(null).isSome)
    .toBeFalsy ()
)

test (`Option with value null should be none`, () => 
    expect (Option.of(null).isNone)
    .toBeTruthy ()
)

// Mapping

test (`Option with value 'BOE' mapped to 'BOE' + '-BA' should say 'BOE-BA'`, () => 
    expect (Option.of('BOE').map (v => `${v}-BA`).value())
    .toBe ('BOE-BA')
)

test (`Option with value 'BOE' mapped to 'BOE' + '-BA' should be some`, () => 
    expect (Option.of('BOE').map (v => `${v}-BA`).isSome)
    .toBeTruthy ()
)

test (`Option with value 'BOE' mapped to 'BOE' + '-BA' shouldn't be none`, () => 
    expect (Option.of('BOE').map (v => `${v}-BA`).isNone)
    .toBeFalsy ()
)

// Flatmapping

test (`Option with value 'BOE' mapped to option with 'BOE' + '-BA' should say 'BOE-BA'`, () => 
    expect (Option.of('BOE').flatMap (v => Option.of(`${v}-BA`)).value())
    .toBe ('BOE-BA')
)

test (`Option with value 'BOE' mapped to 'BOE' + '-BA' should be some`, () => 
    expect (Option.of('BOE').flatMap (v => Option.of(`${v}-BA`)).isSome)
    .toBeTruthy ()
)

test (`Option with value 'BOE' mapped to 'BOE' + '-BA' shouldn't be none`, () => 
    expect (Option.of('BOE').flatMap (v => Option.of(`${v}-BA`)).isNone)
    .toBeFalsy ()
)

// Mapping of none

test (`None mapped to 'BOE' + '-BA' should not be some`, () => 
    expect (Option.none.map (v => `${v}-BA`).isSome)
    .toBeFalsy ()
)

test (`None mapped to 'BOE' + '-BA' should be none`, () => 
    expect (Option.none.map (v => `${v}-BA`).isNone)
    .toBeTruthy ()
)

