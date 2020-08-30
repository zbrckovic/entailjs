import { Record, Set } from 'immutable'
import { Sym } from '../../abstract-structures/sym'

/** Dependencies for a single term. */
export class TermDependencies extends Record({
  dependent: new Sym(),
  dependencies: Set()
}) {
  addDependency(dependency) {
    return this.update('dependencies', dependencies => dependencies.add(dependency))
  }
}
