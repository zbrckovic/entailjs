import { Set } from 'immutable'

export function findDuplicates<T>(items: T[]): Set<T> {
    let traversed = Set<T>()
    let duplicates = Set<T>()

    for (const item of items) {
        if (traversed.has(item)) {
            duplicates = duplicates.add(item)
        } else {
            traversed = traversed.add(item)
        }
    }

    return duplicates
}
