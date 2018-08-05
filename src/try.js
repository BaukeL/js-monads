import Option from './option';

const succesfull = value => {

    return {

        get : () => value,

        flatMap : mapper => mapper (value),
        map     : mapper => ofFailable (() => mapper (value)),

        onSuccess : fn => { fn(value); return succesfull (value) },
        onFailure : __ => succesfull (value),

        toOption  : () => Option.of (value)
    }

}

const failure = errorText => {

    return {
        get : () => { throw errorText; },

        flatMap : __ => failure (errorText),
        map     : __ => failure (errorText),

        onSuccess : __ => failure (errorText),
        onFailure : fn => { fn(errorText); return failure (errorText) },

        toOption  : () => Option.none
    }
}

const ofFailable = getter => {

    const getValue = () => {
        try {
            return succesfull (getter());
        } catch (error) {
            return failure (error);
        }
    }

    return {

        get : () => getValue().get(),

        flatMap : mapper => mapper (getValue().get()),
        map     : mapper => ofFailable (() => mapper (getValue().get())),

        onSuccess : fn => getValue().onSuccess (fn),
        onFailure : fn => getValue().onFailure (fn),

        toOption  : getValue().toOption
    }
}

export default {
    ofFailable,
    succesfull,
    failure
}