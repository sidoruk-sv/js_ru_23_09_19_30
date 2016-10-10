import { CHANGE_SELECTED_FILTER, CHANGE_DATE_FILTER } from '../constants';

export default (filters = { range: {}, selected: [] }, action) => {
    const { type, payload } = action

    switch (type) {
        case CHANGE_DATE_FILTER:
            return Object.assign({}, filters, payload)
        case CHANGE_SELECTED_FILTER:
            return Object.assign({}, filters, { selected: payload.selected })
    }

    return filters
}
