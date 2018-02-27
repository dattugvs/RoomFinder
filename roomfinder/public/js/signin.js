var users;

function getList()
{
	var requests = [
  		$.getJSON('/getUserList'),
	];
	$.when.apply($,requests).done(function(){
  		users = arguments[0];
  		validate();
	});
	
}

function postReq(email,pwd)
{
	$.post("/signin",
    {
        email: email,
        pwd : pwd,
        login : "true"
    },
    function(data, status){
        console.log("Status: " + status);
        if(status=="success")
        	window.location.replace('http://localhost:3000/')
    });
}
function validate()
{
	console.log(users);
	var flag =1;
	var email = $('#email').val();
	var pwd = $('#pwd').val();
	console.log(users);
	for(var i=0; i<users.length; i++)
	{
		if(users[i].email == email)
		{
			flag = 0;
			if(users[i].pwd == pwd)
				postReq(email, pwd);
			else
				alert("Invalid Password");
		}
	}
	if(flag)
		alert("Invalid Email");
}