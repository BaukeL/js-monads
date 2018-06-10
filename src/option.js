const isNone = value => value == null
const isSome = value => !isNone(value)

const noValueErrorText = 'Option has no value';

const none = {
    isSome : false,
    isNone : true,

    value  : () => { throw noValueErrorText },

    flatMap : mapper => none,
    map     : mapper => none
}

const flatMapper = value => mapper => {
            
    if (isNone (value)) return none;

    return mapper (value);
} 

const option = value => {

    if (value == null) { return none; }

    return {

        isSome : isSome (value),
        isNone : isNone (value),

        value  : () => value,

        flatMap : flatMapper (value),
        map     : mapper => flatMapper (value) (v => option (mapper (v)))
    }

}

const empty = () => option (null)

export default {
    of   : option,
    none : empty()
}