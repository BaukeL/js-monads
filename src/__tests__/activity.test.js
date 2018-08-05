import Activity from '../activity';

// Set-up 

test (`Activity set-up with 'BOE' will result in 'BOE'`, () => 
    expect (Activity.unit('BOE').run({}))
    .toBe ('BOE')
)

// Mapping

test (`Activity set-up with 'BOE' and mapped to 'BOE-BA' will result in 'BOE-BA'`, () => 
    expect (
        Activity.unit('BOE')
        .map (v => v + '-BA')
        .run({})
    )
    .toBe ('BOE-BA')
)


test (`Activity set-up with 'BOE' and flat-mapped to an activity with'BOE-BA' will result in 'BOE-BA'`, () => 
    expect (
        Activity.unit('BOE')
        .flatMap (v => Activity.unit(v + '-BA'))
        .run({})
    )
    .toBe ('BOE-BA')
)

