var User = Object.create(Helper);

User.setLogout= function(){
    User.getJson('/logout','LOG_OUT', null);
};

var user= Object.create(User);
user.onClickByClass('.jsLogout', user.setLogout);


