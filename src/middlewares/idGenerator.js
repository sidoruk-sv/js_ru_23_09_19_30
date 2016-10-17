import { ADD_COMMENT } from '../constants';

function generateRandomIntegerKeyForHash(hash) {
    const randId = Math.round(Math.random() * 1000000000);
    if (hash[randId]) {
        generateRandomIntegerKeyForHash(hash);
    }

    return randId;
}
export default store => next => action => {
    const { type, payload } = action

    switch (type) {
        case ADD_COMMENT:
            const comments = store.getState().comments
            const id = generateRandomIntegerKeyForHash(comments)

            Object.assign(action, { payload: Object.assign(payload, { id }) })
            break;
    }

    next(action)
}
