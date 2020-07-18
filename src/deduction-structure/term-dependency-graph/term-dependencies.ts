import { Record, Set } from 'immutable'
import { Sym } from 'abstract-structures/sym'

/** Dependencies for a single term. */
export class TermDependencies extends Record<{
    dependent: Sym
    dependencies: Set<Sym>
}>({
    dependent: new Sym(),
    dependencies: Set()
}) {
    addDependency(dependency: Sym) {
        return this.update('dependencies', dependencies => dependencies.add(dependency))
    }
}
