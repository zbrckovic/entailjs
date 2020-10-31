/* ---------- Formula ---------- */

StartFormula
    = Sp formula:RootFormula Sp
    { return formula }

RootFormula
    = child1:Formula Sp sym:TruthFunctionalSymInfix Sp child2:Formula
    {
        return {
            sym,
            symPlacement: 'Infix',
            children: [child1, child2]
        }
    }
    / formula:Formula
    { return formula }

Formula
    = "(" Sp child1:Formula Sp sym:TruthFunctionalSymInfix Sp child2:Formula Sp ")"
    {
        return {
            sym,
            symPlacement: 'Infix',
            children: [child1, child2]
        }
    }
    / sym:TruthFunctionalSymPrefix Sp child:Formula
    {
        return {
            sym,
            symPlacement: 'Prefix',
            children: [child]
        }
    }
    / "(" Sp expression:Formula Sp ")"
    { return { expression } }
    / sym:PropositionalVariable
    {
        return {
            sym,
            symPlacement: 'Prefix',
            children: []
        }
    }
    / sym:PropositionalConstant
    {
        return {
            sym,
            symPlacement: 'Prefix',
            children: []
        }
    }
    / sym:Quantifier boundSym:TermVariable Sp child:Formula
    {
        return {
            sym,
            boundSym,
            symPlacement: 'Prefix',
            children: [child]
        }
    }
    / sym:PredicateVariable "(" Sp children:TermList Sp ")"
    {
        return {
            sym,
            symPlacement: 'Prefix',
            children
        }
    }
    / sym:PredicateVariable terms:TermVariable+
    {
        return {
            sym,
            symPlacement: 'Prefix',
            children: terms.map(term => ({
               sym: term,
               symPlacement: 'Prefix',
               children: []
           }))
        }
    }

PropositionalVariable
    = letter:[a-z] number:[0-9]?
    { return letter + (number === null ? '' : number) }

PropositionalConstant
    = "T"

TruthFunctionalSymPrefix
    = c:"~"
    { return c }

TruthFunctionalSymInfix
    = sym:"&"
    { return sym }
    / sym:"|"
    { return sym }
    / sym:"->"
    { return sym }
    / sym:"<->"
    { return sym }

Quantifier
    = quantifier:[AE]
    { return quantifier }

TermList
    = first:Term Sp rest:CommaAndTerm*
    { return [first].concat(rest) }

CommaAndTerm
    = "," Sp term:Term
    { return term }

PredicateVariable
    = letter:[BCDF-SU-Z] number:[0-9]?
    { return letter + (number === null ? '' : number) }

Term
    = sym:TermVariable Sp "(" Sp children:TermList Sp ")"
    {
        return {
            sym,
            symPlacement: 'Prefix',
            children
        }
    }
    / sym:TermVariable
    {
        return {
            sym,
            symPlacement: 'Prefix',
            children: []
        }
    }

TermVariable
    = letter:[a-z] number:[0-9]?
    { return letter + (number === null ? '' : number) }

/* ---------- Deduction ---------- */

StartDeduction
    = steps:StepWithSemi*
    { return { steps } }

StepWithSemi
    = step:Step ";" Sp
    { return step }

Step
    =
        Sp assumptions:NumList? Sp ordinal:Ordinal? Sp
        formula:RootFormula Sp "/" Sp ruleApplicationSummary:RuleApplicationSummary Sp
    {
        return {
            assumptions: assumptions === null ? [] : assumptions,
            ordinal: ordinal === null ? undefined : ordinal,
            formula,
            ruleApplicationSummary
        }
    }

Ordinal
    = "(" Sp num:Num Sp ")"
    { return num }

RuleApplicationSummary
    = rule:Rule Sp premises:NumList?
    {
        return {
            rule,
            premises: premises === null ? [] : premises
        }
    }

Rule
    = "P"
    / "D"
    / "TI"
    / "UI"
    / "UG"
    / "EI"
    / "EG"
    / "T"
    / "IF-"
    / "NEG+"
    / "NEG-"
    / "NEG-"
    / "AND+"
    / "AND-"
    / "OR+"
    / "OR-"
    / "IFF+"
    / "IFF-"

/* ---------- Util ---------- */

Sp
    = chars:[ \n]*
    { return chars.join(''); }

Num
    = chars:[0-9]+
    { return parseInt(chars.join(''), 10); }

NumList
    = first:Num Sp rest:CommaAndNum*
    { return [first].concat(rest) }

CommaAndNum
    = "," Sp num:Num
    { return num }
