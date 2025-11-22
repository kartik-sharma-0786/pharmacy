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

});
currentMedication.addEventListener('click', () => {

    allergydiv.style.display = 'none';
    historydiv.style.display = 'none';
    box.style.display = 'none';
    questions.style.visibility = 'hidden';

    getData();
    // Event listener for the "Submit" button
    document.querySelector('.s3').addEventListener('click', function (event) {

        const medication = {
            medicines: []
        }
        event.preventDefault(); // Prevent form submission

        // Collect input values
        const name = document.getElementById('name').value;
        medication.medicines.push(name);

        const r = {
            pass: name
        };

        console.log(r);
        // the array sent contains the disease and duration of each entry and does not append each and every entry
        axios.post('https://pharmacy-3exm.onrender.com/dashboard/currentMedication/update', r)
            .then(response => {
                console.log(response);
                getData();
            })
            .catch(error => {
                console.log(error);
            });



        // Hide the form after submission
        hideForm();
    });

    
    
    // Event listener for the "Close" button
    document.querySelector('.c3').addEventListener('click', hideForm);

});

function getData() {
    axios.get('https://pharmacy-3exm.onrender.com/dashboard/currentMedication')
        .then(response => {
            console.log(response);
            if (response.data == "") {
                medicationdiv.style.display = 'block';
            }
            else {
                medicationHeading.textContent = '';
                medicationContainer.innerHTML = '';
                for (let i = 0; i < response.data.length; i++) {
                    // Create a new box to display the data
                    const medicationBox = document.createElement('div');
                    medicationBox.classList.add('medication-box');
                    medicationBox.innerHTML = `
                        <p><strong>Name:</strong> <span class = "medicineName">${response.data[i]}</span></p>
                        <button class="cancel">Delete</button>
                        `;

                    // Append the new box to the container
                    medicationContainer.appendChild(medicationBox);

                }
                medicationdiv.style.display = 'block';
                
                const cancelButtons = document.querySelectorAll('.cancel');
                cancelButtons.forEach(button => {

                    button.addEventListener('click', function () {
            
                        console.log("deleting");
                        const parentdiv = button.parentNode;
                        const data = parentdiv.querySelector('.medicineName').textContent;
                        const t = {
                            pass: data,
                        }
                        console.log(t.pass);
                        axios.post('https://pharmacy-3exm.onrender.com/dashboard/currentMedication/delete', t)
                            .then(response => {
                                console.log(response);
                                //getData();
            
                            })
                            .catch(error => {
                                console.log(error);
                            });
            
                        medicationContainer.removeChild(parentdiv); // Remove the box
                    });
                });
            }

        })
        .catch(error => {
            console.log(error);
        })

}

