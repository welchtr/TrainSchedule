// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBmjU5ylBLjD41XoB6hnZ6Mt3MyiJC6ppU",
    authDomain: "trainschedule-project.firebaseapp.com",
    databaseURL: "https://trainschedule-project.firebaseio.com",
    projectId: "trainschedule-project",
    storageBucket: "trainschedule-project.appspot.com",
    messagingSenderId: "539560131465"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = "";
 var trainDestination = "";
 var firstTrain = "";
 var trainFrequency = "";
 var nextTrain ="";
 var minutesAway = "";

  // 2. Button for adding Train
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    console.log("firstTrain", firstTrain);

    // Creates local "temporary" object for holding train data
var newTrain = {
  name: trainName,
  destination: trainDestination,
  firstTrainTime: firstTrain,
  frequency: trainFrequency
};

console.log(newTrain)

// Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
console.log(newTrain.name);
console.log(newTrain.destination);
console.log(newTrain.firstTrainTime);
console.log(newTrain.frequency);

// Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrainTime
  var trainFrequency = childSnapshot.val().frequency;

  // Train Info
  // console.log(trainName);
  // console.log(trainDestination);
  console.log("FIRST TRAIN TIME ::::::::",childSnapshot.val().firstTrainTime);
  //console.log(trainFrequency);

  var firstTrainConverted = moment(childSnapshot.val().firstTrainTime, "HH:mm").subtract(1, "years");
  console.log(firstTrainConverted);

  // Current Time
  var currentTime = moment();

  // Difference between the times
  var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
  console.log(diffTime);


  // Time apart (remainder)
  var tRemainder = diffTime % childSnapshot.val().frequency;
  console.log(tRemainder);

  // Minute Until Train
  var newMinutesAway = childSnapshot.val().frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + newMinutesAway);
 console.log(typeof newMinutesAway)
  // Next Train
  var nextTrain = moment().add(minutesAway, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextTrain + "</td><td>"+ newMinutesAway +"</td></tr>");

  });
