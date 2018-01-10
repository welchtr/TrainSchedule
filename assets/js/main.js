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
    var firstTrain = moment($("#first-train-input").val().trim(), "HH:mm").subtract(1, "years").format("X");;
    var trainFrequency = $("#frequency-input").val().trim();

    console.log("trainDestination", trainDestination);

    // Creates local "temporary" object for holding train data
var newTrain = {
  name: trainName,
  destination: trainDestination,
  firstTrainTime: firstTrain,
  frequency: trainFrequency
};

// Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
console.log(newTrain.name);
console.log(newTrain.destination);
console.log(newTrain.firstTrain);
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
  var firstTrain = childSnapshot.val().firstTrainTime;
  var trainFrequency = childSnapshot.val().frequency;

  // Employee Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(firstTrain);
  console.log(trainFrequency);

  var db = childSnapshot.val();

  var firstTrainConverted = moment(db.firstTrain, "hh:mm").subtract(1, "years");

  // Current Time
  var currentTime = moment();

  // Difference between the times
  var diffTime = moment().diff(moment(firstTrainConverted), "minutes");


  // Time apart (remainder)
  var tRemainder = diffTime % db.trainFrequency;
  console.log(tRemainder);

  // Minute Until Train
  var minutesAway = db.trainFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + minutesAway);

  // Next Train
  var nextTrain = moment().add(minutesAway, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
trainDestination + "</td><td>" + firstTrain + "</td><td>" + trainFrequency + "</td><td>" + minutesAway + "</td></tr>");

  });
