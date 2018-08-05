import flow from 'lodash/fp/flow';

import Try from './try';

let nthActivity = 0
const getNewActivityNr = () => {
    nthActivity = nthActivity + 1
    return nthActivity
}

const state = (data, context) => { return { data, context } }

const getNewStateData = stateSetter => flow (
    context => stateSetter (context),
    state   => state.data
)

const context = ()   => activity (getNewActivityNr()) (context => state (context, context))
const unit    = data => activity (getNewActivityNr()) (context => state (data, context))

// Activity<T, C> 
// stateSetter : C => State<T, C>
// flatMap     : (mapper : T => Activity<T2, C>) : Activity<T2, C>
// map         : (mapper : T => T2) : Activity<T2, C>
const actor = nth => stateSetter => runner => {

    const flatMapper = stateSetter => mapper => 
        actor 
            (getNewActivityNr()) 
            (context => flow (
                getNewStateData (stateSetter),              // context => state => data
                mapper,                                     // data => activity
                act => state (act.run (context), context)   // activity => state (result activity, context)
            ) (context))
            (runner)

    return {
        type    : 'normal',
        nth     : nth,
        flatMap : mapper => flatMapper (stateSetter) (mapper),
        map     : mapper => flatMapper (stateSetter) (v => unit (mapper (v))),
        run     : runner (stateSetter)
    }
}

const activity = nth => stateSetter => 
    actor 
        (nth)                                          // Activity ref
        (stateSetter)                                  // context => state
        (stateSetter => getNewStateData (stateSetter)) // context => state => data

export default {
    unit,
    context
}