const submit = document.getElementById('submit');

submit.addEventListener('click' , function(event)
{
		var form = event.target.closest('form');
        const userData={
            fullname: document.getElementById('fullname').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            Phone: document.getElementById('phone').value,
            Gender: document.getElementById('Gender').value,
        };
		form.reset();



const credentials = userData;

const serverUrl = 'https://pharmacy-3exm.onrender.com/create';

console.log(userData);

axios.post(serverUrl, credentials)
.then(response => {
	if(response.data.no==='200'){
        window.location.href = '/';
    }
    })
console.log(userData);

}
)



