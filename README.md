 voting application:-
 what??
  a fucntionality where user can give vote to the given set of candidate 
  models?
   routes?
    voting app fucntionality
    1.user signup\signin
    2.see the list of  candidate
    3.vote one of the  candidate
    4. there  is a route which shows the list  of candidate and thier live vote count
    5.user data must contain  their one unique id proof name : addhar card
    6.there should be one admin who can only maintaine  the table of  candidate  and he  can able to vote at all
    7.user can change their password 
    8.user can login only with addhar card and password
    9 admin  is not allowed to vote 



    -------------------------------------------------
    routes or endpoint:-
  1.  user authetication 
    /signup: POST-create a new user account
    /login : POST-login to an existing account
  2. voting:
  / candidate :GET- get the list of candidate 
  /vote/ : candidateid: POST- vote for a specific candidate 
   3. vote counts:
   /vote/counts: GET- get the list of candidate sorted by their vote count 
   4. user profile :
    /profile: GET-get the user profile  information
    /profile/password:PUT- change the user password
5. admin  candidate management:
/candidates:POST-create a new candidate 
/candidates/:candidateid:PUT- update  an existing account
/candidates/:candiddateid: DELETE-delete a candidate from the list 
