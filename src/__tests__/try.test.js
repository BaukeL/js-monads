import Try from '../try';

// Construction

test (`Try succesfull with 'BOE'`, () => 
    expect (Try.succesfull ('BOE').get())
    .toBe  ('BOE')
)

test (`Try failure with exception: 'Some error'`, () => 
    expect(() => Try.failure ('Some error').get())
    .toThrow('Some error')
)

test (`Try of failable leads to 'BA'`, () => 
    expect (Try.ofFailable (() => 'BA').get())
    .toBe ('BA')
)

test (`Try of failable leads to exception: 'Some error'`, () => 
    expect (() => Try.ofFailable (() => { throw 'Some error' }).get())
    .toThrow('Some error')
)

// Side-fx

test (`Succesfull try calls onSuccess with activity value`, () => {

    let sideFxValue = "";
    Try.ofFailable (() => 'BA')
        .onSuccess (v => sideFxValue = v)
        .onFailure (e => sideFxValue = e);

    expect (sideFxValue).toBe ('BA');
})

test (`Failed try calls onFailure with found error`, () => {

    let sideFxValue = "";
    Try.ofFailable (() => { throw 'Some error' })
        .onFailure (e => sideFxValue = e)
        .onSuccess (v => sideFxValue = v);

    expect (sideFxValue).toBe ('Some error')
})

// Mapping

test (`Try succesfull with 'BOE' mapped to 'BOE-BA' must be 'BOE-BA'`, () => 
    expect (
        Try.succesfull ('BOE')  
        .map (v => `${v}-BA`)
        .get()
    )
    .toBe ('BOE-BA')
)

test (`Try failure with 'Some error' mapped to 'BOE-BA' must throw 'Some error'`, () => 
    expect (() =>
        Try.failure ('Some error')
        .map (v => `${v}-BA`)
        .get()
    )
    .toThrow ('Some error')
)

test (`Failable try succesfull with 'BOE' mapped to 'BOE-BA' must be 'BOE-BA'`, () => 
    expect (
        Try.ofFailable (() => 'BOE')  
        .map (v => `${v}-BA`)
        .get()
    )
    .toBe ('BOE-BA')
)

// Flatmapping

test (`Try succesfull with 'BOE' flat mapped to 'BOE-BA' must be 'BOE-BA'`, () => 
    expect (
        Try.succesfull ('BOE')  
        .flatMap (v => Try.succesfull(`${v}-BA`))
        .get()
    )
    .toBe ('BOE-BA')
)

test (`Try failure with 'BOE' flat mapped to 'BOE-BA' must throw 'Some error'`, () => 
    expect (() =>
        Try.failure ('Some error')  
        .flatMap (v => Try.succesfull(`${v}-BA`))
        .get()
    )
    .toThrow ('Some error')
)

test (`Failable try succesfull with 'BOE' flat mapped to 'BOE-BA' must be 'BOE-BA'`, () => 
    expect (
        Try.ofFailable (() => 'BOE')  
        .flatMap (v => Try.succesfull(`${v}-BA`))
        .get()
    )
    .toBe ('BOE-BA')
)

test (`Failable try failed with 'Some error' flat mapped to 'v-BA' must throw 'Some error'`, () => 
    expect (() =>
        Try.ofFailable (() => { throw 'Some error' })  
        .flatMap (v => Try.succesfull(`${v}-BA`))
        .get()
    )
    .toThrow ('Some error')
)


// To Option

test (`Try succesfull with 'BOE' to Option must be some`, () => 
    expect (
        Try.succesfull ('BOE')  
        .toOption ()
        .isSome
    )
    .toBe (true)
)

test (`Try failure with exception to Option must be none`, () => 
    expect(
        Try.failure ('Some error')
        .toOption ()
        .isNone
    )
    .toBe (true)
)
