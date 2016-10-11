import { CHANGE_SELECTED_FILTER, CHANGE_DATE_FILTER } from '../constants';

export default (filters = { range: {}, selected: [] }, action) => {
    const { type, payload } = action

    switch (type) {
        case CHANGE_DATE_FILTER:
            return Object.assign({}, filters, payload)
        case CHANGE_SELECTED_FILTER:
            //не страшно, но почему здесь не тот же Object.assign({}, filters, payload)

            // сначала запутался, а потом не дочистил, когда разобрался
            return Object.assign({}, filters, payload)
    }

    return filters
}
