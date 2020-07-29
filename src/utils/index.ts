import { Set, Map, Collection } from 'immutable'

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

export type Entry<K, V> = readonly [K, V]

export type Entries<K, V> = readonly [K, V][]
