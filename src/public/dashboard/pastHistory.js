const patientHistory = document.getElementById('patientHistory');
const historydiv = document.querySelector('.historydiv');
const addHistoryButton = document.getElementById('add-history-button');
const floatingWindow = document.getElementById('floatingwindow');
const header = document.querySelector('.heading');
const form2 = document.querySelector('.historyForm'); 
const closeButton = document.querySelector('.c2');
const submitButton = document.querySelector('.s2');
const historyContainer = document.querySelector('.Library-container2');
const disehead = document.querySelector('.disehead');




addHistoryButton.addEventListener('click', () => {
 
  form2.style.visibility = 'visible';
  document.getElementById('disease').value = '';
  header.innerText = '';
});

patientHistory.addEventListener('click', () => {

  allergydiv.style.display = 'none';
  medicationdiv.style.display = 'none';
  box.style.display = 'none';
  questions.style.visibility = 'hidden';
	showHistory();

});

submitButton.addEventListener('click', function(event) {
  event.preventDefault(); // Prevent form submission

  const history = {
    diseases:[]
  }
  // Collect input values
  const disease = document.getElementById('disease').value;
  history.diseases.push(disease);
  const r={
    pass:disease
  }
  console.log(history.diseases);
  // the array sent contains the disease and duration of each entry and does not append each and every entry
  axios.post('https://pharmacy-3exm.onrender.com/dashboard/patientHistory/update' ,r )
    .then(response => {
      console.log(response);
			showHistory();
    })
    .catch(error => {
      console.log(error);
    });

    form2.style.display = 'none'; // Hide the form after submission
});

// Event listener for the "Close" button in the form
closeButton.addEventListener('click', () => {
  form2.style.display = 'none';
});

function showHistory() {
    axios.get('https://pharmacy-3exm.onrender.com/dashboard/patientHistory')
        .then(response => {
            console.log(response);
            if (response.data == "") {
								header.textContent = 'No data';
                historydiv.style.display = 'block';
            }
            else {
                header.textContent = '';
                historyContainer.innerHTML = '';
                for (let i = 0; i < response.data.length; i++) {
                    // Create a new box to display the data
                    const historyBox = document.createElement('div');
                    historyBox.classList.add('history-box');
                    historyBox.innerHTML = `
                        <p><strong>Name:</strong> <span class = "diseaseName">${response.data[i]}</span></p>
                        <button class="cancel">Delete</button>
                        `;

                    // Append the new box to the container
                    historyContainer.appendChild(historyBox);

                }
                historydiv.style.display = 'block';
                
                const cancelButtons = document.querySelectorAll('.cancel');
                cancelButtons.forEach(button => {

                    button.addEventListener('click', function () {
            
                        console.log("deleting");
                        const parentdiv = button.parentNode;
                        const data = parentdiv.querySelector('.diseaseName').textContent;
                        const t = {
                            pass: data,
                        }
                        console.log(t.pass);
                        axios.post('https://pharmacy-3exm.onrender.com/dashboard/patientHistory/delete', t)
                            .then(response => {
                                console.log(response);
                                showHistory();
            
                            })
                            .catch(error => {
                                console.log(error);
                            });
            
                        historyContainer.removeChild(parentdiv); // Remove the box
                    });
                });
            }

        })
        .catch(error => {
            console.log(error);
        })

}

