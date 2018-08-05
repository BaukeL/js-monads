// @flow

import Activity from './activity';
import Try      from './try';

type Props = {
    foo: number,
    bar?: string,
}

const foo = (one: string, two: number, three?: any) : string =>  {
    return one;
}

const x = foo("a", 1, { foo: 1, bar : "bar"});


const a = Try.ofFailable (() => 'BOE');

const z = 
    Try.ofFailable (() => 'BOE')  
    .flatMap (v => {
        return Try.succesfull(`${v}-BA`)
    })
    .get();

const y = Activity
    .unit(1)
    .map (v => v + 1)
    .run (9)
    ;

console.log ('ready');
