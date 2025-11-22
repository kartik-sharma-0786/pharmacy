const checkSymptoms = document.getElementById('checkSymptoms');
const questions = document.querySelector('.questions');



checkSymptoms.addEventListener('click', () => {

    allergydiv.style.display = 'none';
    medicationdiv.style.display = 'none';
    historydiv.style.display = 'none';
    box.style.display = 'none';
    questions.style.visibility = 'visible';
    console.log("works");

    let selected = null;
    const container = document.querySelector('.container2');
    const submit = document.querySelector('#submit');
    
    submit.addEventListener('click', () => {

        const result = {
            symptoms: []
        };
        // options.forEach(option => {

        //     if (option.checked) {
        //         selected = option.value;
        //         result.symptoms.push(selected);
        //     }
        // })
        // count++;
        // console.log(result.symptoms);
        selectionProcess(result);
    });

});


function selectionProcess(result) {

    let selectedId = null;
    const endpoint = 'https://pharmacy-3exm.onrender.com/admin/getdis';
    const checkOptions = document.querySelectorAll('input[type="checkbox"][name="symptoms"]');
    console.log(checkOptions);
    result.symptoms = [];

    // Get the selected radio button
    checkOptions.forEach(options => {
        if (options.checked) {

            if (options.value == "none") {
                checkOptions.forEach(uncheck => {
                    if (uncheck !== options)
                        uncheck.checked = false;
                });
                result.symptoms.push(options.value);
            }
            else {

                selectedId = options.id;
                result.symptoms.push(selectedId);

            }

        }
    });
   
    console.log(result.symptoms);



    axios.post(endpoint, result)
        .then(response => {
            // Clear previous radio buttons
            console.log("working");
            console.log(response.data);

            if (response.data.end === "end" && response.data !== null) {
                console.log("Exiting condition accepted");
                questions.innerHTML = '';                
                const data = response.data;


                if (data == '') {
                    const resultdiv = document.createElement('h3');
                    resultdiv.textContent = "Sorry symptoms does not match to any disease in our data";
                    questions.appendChild(resultdiv);
                }
                else {
                    const resultdiv = document.createElement('h3');
                    resultdiv.textContent = `${response.data.nam} best matches with the symptoms provided`;
                    const diseaseDiv = document.createElement('div');
                    diseaseDiv.textContent = "Follow the following treatment steps";
                    const treatmentDiv = document.createElement('div');
                    treatmentDiv.textContent = `${response.data.treatment}`;
                    questions.appendChild(resultdiv);
                    questions.appendChild(diseaseDiv);
                    questions.appendChild(treatmentDiv);
                }

                return;



            }

            else if(response.data == "no thing i find out") {
                questions.innerHTML = '';
                const resultdiv = document.createElement('h3');
                resultdiv.textContent = "Sorry symptoms does not match to any disease in our data";
                questions.appendChild(resultdiv);
            }

            else {
                questions.innerHTML = '';
                console.log(response);
                // Display response as radio buttons
                const oneDArray = response.data.reduce((acc, curr) => acc.concat(curr), []);
                const optionsdiv = document.createElement('div');
                optionsdiv.classList.add('options');
                for(let i = 0; i <= response.data.length; i++) {
                    console.log('working');
                    console.log(response.data[i]);
                    const onemoreDiv = document.createElement('div');
                    const radioButton = document.createElement('input');
                    radioButton.type = 'checkbox';
                    radioButton.id = oneDArray[i]; // Set id based on symptom
                    radioButton.name = 'symptoms';

                    const label = document.createElement('label');
                    label.htmlFor = radioButton.id;
                    label.textContent = oneDArray[i];

                    onemoreDiv.appendChild(radioButton);
                    onemoreDiv.appendChild(label);
                    onemoreDiv.appendChild(document.createElement('br'));
                    optionsdiv.appendChild(onemoreDiv);
                }
                questions.appendChild(optionsdiv);


                //create submit button
                const submit = document.createElement('button');
                submit.innerText = 'Submit';
                submit.id = 'submit';
                questions.appendChild(submit);    
              
                submit.addEventListener('click', () => selectionProcess(result));

            }

        })
        .catch(error => {
            // Handle error
            console.log(error);
        });


}
