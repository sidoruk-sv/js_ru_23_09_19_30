//import store from './index'

export function getRelation(entity, relation, storeState) {
    if (!entity[relation] || !storeState[relation]) return []
    return entity[relation].map(id => storeState[relation][id])
}

export function arrayToMap(arr) {
    return arr.reduce((acc, entity) => (
        {...acc, [entity.id]: entity}
    ), {})
}

export function arrayToMapOfRecords(array, recordEntity) {
    return array.reduce((acc, entity) => ({...acc, [entity.id]: new recordEntity(entity)}), {})
}
