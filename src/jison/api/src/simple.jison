%lex
%{
    //self.acc=0;
%}
%%
\s+ /* skip whitespace */
"RND" return 'RND';
"ACC" return 'ACC';
"DEC" return 'DEC';
"SET" return 'SET';
<<EOF>> return 'EOF';
/lex
%start expressions
%%
expressions
    : e EOF
        {return $1;}
    ;

e
    :
      RND
        {$$ = Math.random();}
      | SET
        {self.acc=0;$$=self.acc}
      | ACC
        {self.acc=self.acc+1;$$=self.acc}
      | DEC
        {self.acc=self.acc-1;$$=self.acc}
    ;

