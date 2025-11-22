const patientAllergies = document.getElementById('patientAllergies');
const form = document.querySelector('.form');
const allergydiv = document.querySelector('.allergydiv');
const allergyhead = document.querySelector('.allergyhead');
let allergy_name = "";
const trigger = document.querySelector('#add-allergy-button');
const close = document.querySelector('.close');
const submit = document.querySelector('.proceed');
const Library = [];
let i = 0;// counter for the object index
//constructor for object book

patientAllergies.addEventListener('click', () => {

  questions.style.visibility = 'hidden';
  box.style.display = 'none';
  medicationdiv.style.display = 'none';
  historydiv.style.display = 'none';

	display_allergy();

  trigger.addEventListener('click', function () {
    form.classList.toggle("hidden");//creates class hidden otherwise deletes it
  });

  submit.addEventListener('click', function (event) {
    //event.preventDefault();//prevent the default form submission behaviour
    //without this the book card gets automatically deleted the first time as the default submission behaviour reloads the page
    const allergies = {
      allergy: []
    }
    allergy_name = document.getElementById('allergy').value;
    allergies.allergy.push(allergy_name);
    console.log(allergies.allergy);
    const t = {
      pass: allergy_name
    }

    axios.post('https://pharmacy-3exm.onrender.com/dashboard/allergies/update', t)
      .then(response => {
        console.log(response);
				display_allergy();
      })
      .catch(error => {
        console.log(error);
      });

    form.classList.toggle("hidden");
  });


});



close.onclick = function () {
  form.classList.toggle("hidden");
  console.log("You exited");
};


function display_allergy() {
  axios.get('https://pharmacy-3exm.onrender.com/dashboard/allergies')
    .then(response => {
      console.log(response);
      if (response.data == "") {
				allergyhead.textContent = 'No data';
        allergydiv.style.display = 'block';
      }
      else {
				const allergyContainer = document.querySelector('.Library-container');
        allergyhead.textContent = '';
        allergyContainer.innerHTML = '';
        for (let i = 0; i < response.data.length; i++) {
          // Create a new box to display the data
          const allergyBox = document.createElement('div');
          allergyBox.classList.add('allergy-box');
          allergyBox.innerHTML = `
                        <p class = "allergyName">${response.data[i]}</p>
                        <button class="cancel">Delete</button>
                        `;

          // Append the new box to the container
          allergyContainer.appendChild(allergyBox);

        }
        allergydiv.style.display = 'block';

        const cancelButtons = document.querySelectorAll('.cancel');
        cancelButtons.forEach(button => {

          button.addEventListener('click', function () {

            const parentdiv = button.parentNode;
            const data = parentdiv.querySelector('.allergyName').textContent;
            const t = {
              pass: data,
            }
            console.log(t.pass);
            axios.post('https://pharmacy-3exm.onrender.com/dashboard/allergies/delete', t)
              .then(response => {
                //console.log(response);
                display_allergy();

              })
              .catch(error => {
                console.log(error);
              });
						allergyContainer.removeChild(parentdiv);

          });
        });
      }

    })
    .catch(error => {
      console.log(error);
    })

}
