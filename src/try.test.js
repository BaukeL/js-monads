import Try from './try';

test (`Try succesfull with 'BOE'`, () => 
    expect (Try.succesfull ('BOE').get())
    .toBe  ('BOE')
)

test (`Try failure with exception: 'Some error'`, () => 
    expect(() => { 
        Try.failure ('Some error').get() 
    })
    .toThrow('Some error')
)
