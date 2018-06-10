const isNone = value => value == null
const isSome = value => !isNone(value)

const none = {
    isSome : false,
    isNone : true,
    value  : () => { throw new Error("Option has no value") }
}

const flatMapper = value => mapper => {
            
    if (isNone (value)) return none;

    return mapper (value);
} 

const option = value => {

    return {

        isSome : isSome (value),
        isNone : isNone (value),

        value  : () => {
            if (isNone (value)) { throw "Option has no value" }
            return value;
        },

        flatMap : flatMapper (value),
        map     : mapper => flatMapper (value) (v => option (mapper (v)))
    }

}

const empty = () => option (null)

export default {
    of   : option,
    none : empty()
}