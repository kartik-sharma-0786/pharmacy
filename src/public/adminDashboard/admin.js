const questions = document.querySelector('.questions');
const submit = document.querySelector('#submit');
const result = {
    name: "",
    vitals: [],
    ask: [],
    llf: [],
    classification: {
        classify: []
    }
};
const DiseaseName = [];
document.getElementById('addSymptomBtn').addEventListener('click', function () {
    document.getElementById('symptomForm').style.display = 'block';
		submit.addEventListener('click', handleDiseaseEntry);
});

document.getElementById('logoutBtn').addEventListener('click', function () {
        // Perform logout functionality here
        alert('Logged out successfully.');
});

function handleDiseaseEntry() {
    const diseaseName = document.querySelector('#name').value;
    console.log(diseaseName);
    result.name = diseaseName;

    questions.innerHTML = `
    
    <div>Add a new disease</div>
    <label for="range">Please enter the age range of the patient for this disease (e.g., '2-5yrs'): </label>
    <input type="text" id="range" placeholder="age range" required><br>
    <label for="temperature">Please enter the temperature of the patient for this disease</label>
    <input type="text" id="temperature" placeholder="temperature" required><br>
    <label for="weight">Please enter the weight range of the patient for this disease</label>
    <input type="text" id="weight" placeholder="weight" required><br>
    <label for="pulse">Please enter the pulse range of the patient for this disease</label>
    <input type="text" id="pulse" placeholder="pulse rate" required><br>
    <label for="bp">Please enter the blood pressure range of the patient for this disease</label>
    <input type="text" id="bp" placeholder="blood pressure" required><br>
    <div class="buttons">
      <button id="submit">Submit</button>`;
    const submission = document.querySelector('#submit');
    submission.addEventListener('click', handleVitalsEntry);
}

function handleVitalsEntry() {

    const range = document.querySelector('#range').value;
    const temperature = document.querySelector('#temperature').value;
    const weight = document.querySelector('#weight').value;
    const pulse = document.querySelector('#pulse').value;
    const bp = document.querySelector('#bp').value;
    result.vitals.push(range);
    result.vitals.push(temperature);
    result.vitals.push(weight);
    result.vitals.push(pulse);
    result.vitals.push(bp);

    console.log(result.vitals);
    questions.innerHTML = `
				<div>Add a new disease</div>
		<div class = "info">
			<div>What kind of questions related to the disease should be asked</div>
			<input type="text" class = "input-field" placeholder = "ask question" required>
		</div>
		<div class="buttons">
			<button id = "add">Add Question</button>
            <button id = "submit">Submit</button>
        </div>
		`;

    var add = document.querySelector('#add');
    var infoField = document.querySelector('.info');

    addInputField(infoField);
    const submit1 = document.querySelector('#submit');
    submit1.addEventListener('click', handleQuestionsEntry);

}

function handleQuestionsEntry() {
    const details = document.querySelectorAll('.input-field');
    details.forEach(question => {
        console.log(question.value);
        result.ask.push(question.value);

    })
    console.log(result.push);

    questions.innerHTML = `
			<div>Add a new disease</div>
			<div class = "info">
				<div>Please provide the 'look, listen, feel' aspects of the disease in the text field below</div>
				<input type="text" class = "input-field" placeholder = "add classification name" required>
			</div>
			<div class="buttons">
				<button id = "add">Add Question</button>
            	<button id = "submit">Submit</button>
        	</div> `;
    const add = document.querySelector('#add');
    infoField = document.querySelector('.info');
    addInputField(infoField);

    const submit1 = document.querySelector('#submit');
    submit1.addEventListener('click', handleLLFentry);
}

function handleLLFentry() {

    const details = document.querySelectorAll('.input-field');
    details.forEach(question => {
        console.log(question.value);
        result.llf.push(question.value);

    })
    console.log(result.llf);

    questions.innerHTML = `
    <div>Add a new disease</div>
    <div class = "info">
        <div>Please provide the classification name of the disease in the text field below</div>
        <input type="text" class = "input-field" placeholder = "add classification name" required>
    </div>
    <div class="buttons">
        <button id = "add">Add classification</button>
        <button id = "submit">Submit</button>
    </div> `;
    const add = document.querySelector('#add');
    infoField = document.querySelector('.info');
    addInputField(infoField);

    const submit1 = document.querySelector('#submit');
    submit1.addEventListener('click', handleClassificationEntry);
}


async function handleClassificationEntry() {
    console.log("are we in");
    const details = document.querySelectorAll('.input-field');
    for (const question of details) {
        console.log(question.value);
        var classifyObj = {
            diseaseName: "",
            signs: [],
            treatment: []
        }    
        await renderSignsInput(question.value , classifyObj);
    }
    axios.post('https://pharmacy-3exm.onrender.com/Admin/addis' , result)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(result);
            console.log(error);
        })
}

function renderSignsInput(value , classifyObj) {
    return new Promise(resolve => {
        questions.innerHTML = `
            <div>For Disease ${value}</div>
            <div class="info">
                <div>Enter the signs that the patient would show</div>
                <input type="text" class="input-field" placeholder="add signs" required>
            </div>
            <div class="buttons">
                <button id="add">Add signs</button>
                <button id="submit">Submit</button>
            </div>`;
        var add = document.querySelector('#add');
        var infoField = document.querySelector('.info');

        addInputField(infoField);
        var submit1 = document.querySelector('#submit');
        submit1.addEventListener('click', () => {
            const details = document.querySelectorAll('.input-field');
            classifyObj.diseaseName = value;
            // classifyObj.signs = [];
            details.forEach(question => {
                console.log(question.value);
                classifyObj.signs.push(question.value);
            });
            console.log(classifyObj);
            renderTreatment(value , classifyObj).then(() => resolve());

        });
        
    });
}

async function renderTreatment(value , classifyObj) {
    return new Promise(resolve => {
        questions.innerHTML = `
            <div>For Disease ${value}</div>
            <div class="info">
                <div>Enter the treatment that the patient should receive</div>
                <input type="text" class="input-field" placeholder="add treatment" required>
            </div>
            <div class="buttons">
                <button id="add">Add treatment</button>
                <button id="submit">Submit</button>
            </div>`;
        var add = document.querySelector('#add');
        var infoField = document.querySelector('.info');

        addInputField(infoField);
        var submit1 = document.querySelector('#submit');
        submit1.addEventListener('click', () => {
            const details = document.querySelectorAll('.input-field');
            // classifyObj.treatment = [];
            details.forEach(question => {
                console.log(question.value);
                classifyObj.treatment.push(question.value);
            });
            console.log(classifyObj);
            result.classification.classify.push(classifyObj);
            console.log(result.classification.classify);
           
            resolve();
        });
    });
}




function addInputField(infoField) {
    add.addEventListener('click', () => {
        console.log("adding field");
        const addinput = document.createElement('input');
        const br = document.createElement('br');
        addinput.classList.add('input-field');
        addinput.placeholder = 'ask question';
        addinput.type = "text";
        infoField.appendChild(br);
        infoField.appendChild(addinput);
    })
}

