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
    / sym:Quantifier Sp "[" Sp boundSym:TermVariable Sp "]" Sp child:Formula
    {
        return {
            sym,
            boundSym,
            symPlacement: 'Prefix',
            children: [child]
        }
    }
    / sym:PredicateVariable Sp "(" Sp children:TermList Sp ")"
    {
        return {
            sym,
            symPlacement: 'Prefix',
            children
        }
    }

PropositionalVariable
    = first:[a-z] rest:[a-zA-Z0-9_]*
    { return first + rest.join('') }

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
    = first:[BCDF-SU-Z] rest:[a-zA-Z0-9_]*
    { return first + rest.join('') }

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
    = first:[a-z] rest:[a-zA-Z0-9_]*
    { return first + rest.join('') }

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
    = "P" / "D" / "TI" / "UI" / "UG" / "EI" / "EG" / "T"

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
