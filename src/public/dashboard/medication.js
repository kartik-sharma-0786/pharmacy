const currentMedication = document.getElementById('currentMedication');
const medicationdiv = document.querySelector('.medicationdiv');
const addMedicationButton = document.getElementById('add-medication-button');
const form3 = document.querySelector('.form-contents3');
const medicationContainer = document.querySelector('.Library-container3');
const medicationHeading = document.querySelector('.medihead');


// Hide the form initially
//form3.classList.add("hidden");
form3.style.display = "none";

// Function to show the form
function showForm() {
    form3.style.display = "block";
    medicationHeading.style.display = "none";
}

// Function to hide the form
function hideForm() {
    form3.style.display = "none";
    medicationHeading.style.display = "none";
}

addMedicationButton.addEventListener('click', () => {
    // Clear form fields
    showForm();
    document.getElementById('name').value = '';
    document.getElementById('use').value = '';

});
currentMedication.addEventListener('click', () => {

    medicationdiv.style.display = 'block';
    allergydiv.style.display = 'none';
    historydiv.style.display = 'none';
    questions.style.visibility = 'none';

		axios.get('http://localhost:3000/dashboard/currentMedication')
			.then(response => {
					console.log(response);
					if(response.data == "")
					{
						medicationdiv.style.display = 'block';
					}
					
					
					
				})
			.catch(error => {
				console.log(error);
				})
	
		    // Event listener for the "Add Medication" button

    // Event listener for the "Submit" button
    document.querySelector('.s3').addEventListener('click', function (event) {

        const medication = {
            medicines: []
        }
        event.preventDefault(); // Prevent form submission

        // Collect input values
        const name = document.getElementById('name').value;
        const use = document.getElementById('use').value;
        medication.medicines.push(name);
        medication.medicines.push(use);
        console.log(medication.medicines);
  // the array sent contains the disease and duration of each entry and does not append each and every entry
        axios.post('http://localhost:3000/dashboard/currentMedication', medication)
            .then(response => {
                console.log(response);
								

        // Append the new box to the container
        medicationContainer.appendChild(medicationBox);


            })
            .catch(error => {
                console.log(error);
            });

        // Create a new box to display the data
        const medicationBox = document.createElement('div');
        medicationBox.classList.add('medication-box');
        medicationBox.innerHTML = `
            <p><strong>Name:</strong> <span class = "medicineName">${name}</span></p>
            <p><strong>Use:</strong> <span class = "reason">${use}</span></p>
            <button class="cancel">Delete</button>
        `;

        // Append the new box to the container
        medicationContainer.appendChild(medicationBox);

        const cancelButton = medicationBox.querySelector('.cancel');
        cancelButton.addEventListener('click', function() {

            const parentdiv = cancelButton.parentNode;
            const data = parentdiv.querySelector('.medicineName').textContent;
            console.log(data);
            axios.post('http://localhost:3000/dashboard/patientHistory' ,data)
              .then(response => {
                console.log(response);
              })
              .catch(error => {
                console.log(error);
              });
        
            medicationContainer.removeChild(medicationBox); // Remove the box
          });

        // Hide the form after submission
        hideForm();
    });

    // Event listener for the "Close" button
    document.querySelector('.c3').addEventListener('click', hideForm);

});


function displayData(response , length)
{

		for(let i = 0 ; i < length ; i++)
		{
					// Create a new box to display the data
        const medicationBox = document.createElement('div');
        medicationBox.classList.add('medication-box');
        medicationBox.innerHTML = `
            <p><strong>Name:</strong> <span class = "medicineName">${response[i]}</span></p>
            <button class="cancel">Cancel</button>
        `;

        // Append the new box to the container
        medicationContainer.appendChild(medicationBox);
	
		}

}
