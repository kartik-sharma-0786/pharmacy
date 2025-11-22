const submitUser = document.querySelector('#UserSubmitBtn');
const submitAdmin = document.querySelector('#adminSubmitBtn');



submitUser.addEventListener('click' , function(event)
{
		var form = event.target.closest('form');
			var userid = document.getElementById('UserId').value;
			var password = document.getElementById('UserPassword').value;
		form.reset();



const credentials = {
    email: userid,
    password: password
};

const serverUrl = 'https://pharmacy-3exm.onrender.com/login';

axios.post(serverUrl, credentials)
.then(response => {
			window.location.href = '/dashboard'
})
 .catch(error => {
		console.log(error);
		document.getElementById('loginStatus').innerText = "Invalid credentials";
		})

}
)



submitAdmin.addEventListener('click' , function(event)
{
			var form = event.target.closest('form');

			var userId = document.getElementById('AdminUserId').value;
			var password = document.getElementById('AdminPassword').value;

		verification(userId , password);
		form.reset();
	});


function verification(userId , password)
{
	console.log("UserId:",userId);
	console.log("Password:",password);
}
