import { CHANGE_SELECTED_FILTER, CHANGE_DATE_FILTER } from '../constants'

export function changeDateFilter(range) {
    return {
        type: 'CHANGE_DATE_FILTER',
        payload: { range }
    }
}

export function changeSelectedFilter(selected) {
    return {
        type: 'CHANGE_SELECTED_FILTER',
        payload: {selected}
    }
}
