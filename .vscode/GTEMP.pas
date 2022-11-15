
Program test;

Uses sysutils;

Var t: text;

Begin
  assign(t, 'file.txt');
  If (fileexists('file.txt')) Then append(t)
  Else rewrite(t);
  close(t);
End.
