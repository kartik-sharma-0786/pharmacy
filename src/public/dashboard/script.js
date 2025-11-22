// handles all events on the dashboard
//const patientHistory = document.getElementById('patientHistory');
//const currentMedication = document.getElementById('currentMedication');
//const patientAllergies = document.getElementById('patientAllergies');
const appointmentScheduler = document.getElementById("appointments");
const box = document.querySelector('.container4');
const health = document.querySelector("#health");
// const checkSymptoms = document.getElementById('checkSymptoms');

const logout = document.getElementById("logout");
const dashboardItems = document.querySelectorAll(".dashboard-item");

dashboardItems.forEach((item) => {
  item.addEventListener("click", function () {
    // Toggle the 'selected' class on click
    this.classList.toggle("selected");

    // Deselect other items
    dashboardItems.forEach((otherItem) => {
      if (otherItem !== this) {
        otherItem.classList.remove("selected");
      }
    });
  });
});

axios
  .get("/dashboard/username")
  .then((response) => {
    console.log(response);
    document.getElementById("userName").innerText = response.data;
  })
  .catch((error) => {
    console.log(error);
  });

health.addEventListener("click", function () {
  console.log("working");
  box.style.display = 'block';
  allergydiv.style.display = 'none';
  medicationdiv.style.display = 'none';
  historydiv.style.display = 'none';
  questions.style.visibility = 'hidden';

  const infoBoxes = document.querySelectorAll(".info-box");

  infoBoxes.forEach((box) => {
    box.addEventListener("click", () => {
      const link = box.querySelector("a");
      window.location.href = link.href;
    });
  });
});

appointmentScheduler.addEventListener("click", () => {
  //stuff
});

logout.addEventListener("click", () => {
  axios
    .get("https://pharmacy-3exm.onrender.com/logout")
    .then((response) => {
      window.location.href = "/";
    })
    .error((error) => {
      console.log(error);
    });
});
