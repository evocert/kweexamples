/* lexical grammar */
%lex

%%
\s*\@[^\n\r]*      /* skip line comments */
\s+                /* skip whitespace */

[A-G](\#|b)?[1-8]\/(128|64|32|16|8|4|2|1)(\.{0,3})  return 'NOTE';
rest\/(128|64|32|16|8|4|2|1)(\.{0,3})               return 'REST';

[0-9]+\b           return 'NUMBER';
\-{3,}             return 'BODY_SEPARATOR';
\"[^"\n]+\"        return 'STRING'

"section"          return 'SECTION';
"song"             return 'SONG';
"end"              return 'END';
"tempo"            return 'TEMPO';
"time_signature"   return 'TIME_SIGNATURE';
"measure"          return 'MEASURE';
"import"           return 'IMPORT';
"from"             return 'FROM';
"to"               return 'TO';
"bpm"              return 'BPM';
":"                return ':';
"/"                return '/';

/lex

%{
    function stripQuotes(text) {
        return text.replace(/"/g, '');
    }

    function parseNote(noteString) {
        const regex = /^([A-G])(\#|b)?([1-8])\/(1|2|4|8|16|32|64|128)(\.{0,3})$/;
        const match = noteString.match(regex);
        return {
            type: 'note',
            name: match[1],
            alteration: match[2],
            octave: Number(match[3]),
            duration: Number(match[4]),
            dots: (match[5] || '').length
        };
    }

    function parseRest(restString) {
        const regex = /^rest\/(1|2|4|8|16|32|64|128)(\.{0,3})$/;
        const match = restString.match(regex);
        return { 
            type: 'rest', 
            duration: Number(match[1]),
            dots: (match[2] || '').length
        };
    }
%}

/* operator associations and precedence */

%left ':'
%left '/'

%start expressions

%% /* language grammar */

expressions
    : song
        { return { song: $1 }; }
    | section_definitions song
        { return { sections: $1, song: $2 } }
    ;

song
    : SONG STRING section_list END
        { $$ = { name: stripQuotes($2), sections: $3 } }
    ;

section_list
    : section_list SECTION STRING
        { $$ = $1.concat([stripQuotes($3)]) }
    | SECTION STRING
        { $$ = [stripQuotes($2)] }
    ;

section_definitions
    : section_definitions section
        { $$ = $1.concat([$2]) }
    | section
        { $$ = [$1] }
    ;

section
    : SECTION STRING meta BODY_SEPARATOR measure_list END
        { $$ = { name: stripQuotes($2), attributes: $3, measures: $5 } }
    ;

meta
    : meta_tempo meta_time_signature
        { $$ = { tempo: $1, timeSignature: $2 } }
    ;

meta_tempo
    : TEMPO ':' NUMBER BPM
        { $$ = { value: Number($3), unit: 'bpm' } }
    ;

meta_time_signature
    : TIME_SIGNATURE ':' NUMBER '/' NUMBER
        { $$ = { numerator: Number($3), denominator: Number($5) } }
    ;

measure_list
    : measure_list single_measure
        { $$ = $1.concat([$2]) }
    | single_measure
        { $$ = [$1] }
    ;

single_measure
    : MEASURE ':' note_list
        { $$ = { definition: 'static', notes: $3 } }
    | MEASURE ':' IMPORT NUMBER TO NUMBER FROM STRING
        { $$ = { definition: 'import', from: Number($4), to: Number($6), source: stripQuotes($8) } }
    ;

note_list
    : note_list single_note
        { $$ = $1.concat([$2]) }
    | single_note
        { $$ = [$1] }
    ;

single_note
    : NOTE
        { $$ = parseNote($1) }
    | REST
        { $$ = parseRest($1) }
    ;
