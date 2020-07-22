# entail-core
Construct first-order logic proofs in the system of natural deduction.

## Logical Expression Language

Logical expression language is a language which we use to represent formulas of first-order logic. 
It is designed to be similar to modern 
[first-order logic](https://en.wikipedia.org/wiki/First-order_logic) notation, but also practical 
to use in plain text environments. It's limited to the *ASCII* character set.

**Propositional variable** starts with a small letter and is optionally followed by letters (small 
or capital), numerals and underscores. Traditionally propositional variables are written as letters
`p`, `q`, `r` with optional numeric suffixes:

    p, q, r, p2, q2, r2, ...
   
Syntax allows for this, but it also allows longer strings if more descriptive names are necessary:

    all_men_are_mortal
    allMenAreMortal

There's one **propositional constant** `T` which represents a proposition true under all 
circumstances. There's no corresponding propositional constant for falsehood. We can use formula
`~T` in its place.

**Truth-functional connectives**

There are 5 truth-functional connectives:

Sym | Symbol          | Arity | Placement
---------|-----------------|-------|----------
`~`      | **Negation**    | 1     | Prefix
`&`      | **Conjunction** | 2     | Infix
`v`      | **Disjunction** | 2     | Infix
`->`     | **Implication** | 2     | Infix
`<->`    | **Equivalence** | 2     | Infix

*Examples of well-formed formulas with truth-functional connectives*:
    
    ~p
    p -> q
    ~(p & q)

`~` is an unary operator and is written as prefix. The rest are binary and are written as infixes.
`~` has the highest precedence so formula `~p -> q` is actually to `(~p) -> q`, not `~(p -> q)`.
All binary operators have the same precedence so introduction of parentheses are necessary to avoid 
ambiguities. For this reason `p & q -> r` is not a valid expression. We must rather write it as 
`(p & q) -> r` or `p & (q -> r)`. Parentheses can be used freely to wrap any formula: 
`~((~p) -> q)`

**Predicate variable** starts with a capital letter and is optionally followed by letters (small 
or capital), numerals and underscores. Exceptions are `A` and `E` which are reserved for 
quantifiers and `T` which stands for propositional constant. `A`, `E` and `T` can never be used as
predicate variables. Traditionally predicate variables are written as letters `F`, `G`, `H` with 
optional numeric suffixes:

    F, G, H, F2, G2, H2, ...
    
and as with propositional variables, longer and more descriptive names are also allowed.
    
    IsParentOf(x, y)
    IsHuman(x)

Predicate variable must be followed with a list of comma-separated *terms* enclosed in parentheses.

    F(x)
    G(x, y)
    H(x, f(x, y))
    
Resulting expression is usually called **atomic formula**. 

Unary predicates are not allowed, i.e. `F` is not a valid formula. If we want to represent an 
arbitrary proposition without going into further analysis of its structure we must use a 
propositional variable.
    
**Term variables** (**Individual variables** and **function variables**) must satisfy the same 
syntactical rules as propositional variables. This doesn't present ambiguity problems because they 
can always be distinguished by their place inside expression. We know that something is a 
propositional variable because it appears in a place where formula is required, and we also know 
that something is a term variable because it appears in a place where term is required. For 
example, in expression
    
    a -> F(b(c))
    
we know that `a` is a propositional variable, and `b` and `c` are function and individual variables
respectively.

Traditionally individual variables are written as letters `x`, `y`, `z` and depending on context 
also `a`, `b`, `c` with optional numeric suffixes (for example `x`, `y`, `z` might be used for 
bound variables and `a`, `b`, `c` for free variables introduced as a result of the application of
derivation rules). As with propositional and predicate variables, longer names are allowed.

Compound terms are written with function variable followed by a comma-separated list of terms 
enclosed in parentheses.

    f(x, y)
    f(g(x))

**Universal quantifier** and **existential quantifier** are written as `A` and `E` respectively.
They must be followed by an individual variable enclosed in square brackets and a formula:
    
    A[x] F(x)
    E[y] p

Variable in square brackets is said to be **bound** by a quantifier.

Quantifiers have a higher precedence than binary truth-functional operators. This means that 
formula `A[x] F(x) -> G(x)` is actually `(A[x] F(x)) -> G(x)`, not `A[x] (F(x) -> G(x))`.

**Some examples of well-formed formulas**
    
    p
    ~p & (q -> p)
    A[x] E[y] (F(x, y) <-> ~G(x, y))

### Formal Grammar

    Formula
        CompoundFormula
        AtomicFormula

    CompoundFormula
        ~ Formula
        ( Formula & Formula )
        ( Formula | Formula )
        ( Formula -> Formula )
        ( Formula <-> Formula )
        PropositionalVariable
        PropositionalCosntant
        Quantifier [ TermVariable ] Formula
        PredicateVariable ( Terms )

    PropositionalVariable 
        [a-z][a-zA-Z0-9_]*
    
    PropositionalCosntant
        T

    Quantifier
        [AE]

    PredicateVariable
        [A-Z][a-zA-Z0-9_]+
        [BCDF-SU-Z]
    
    Terms
        Term
        Term , Terms

    Term: 
        TermVariable
        TermVariable ( Terms )

    TermVariable:
        [a-z][a-zA-Z0-9_]*

There are some points which are not apparent from the specified grammar:
  - Although grammar requires parentheses around compound expressions with binary infix 
    operator, they can be omitted at the root level. For example, we don't have to write 
    `(p -> q)` because `p -> q` is also valid.  

  - Spaces are generally not significant and can appear anywhere between two tokens.

## Development

### Notes on dependencies

- `eslint` - Linter
- `@typescript-eslint/parser` - Uses `typescript-estree` to replace `ESLint`'s default parser.
- `@typescript-eslint/eslint-plugin` - Enables typescript-specific ESLint rules.