$(document).ready(function() {

  var config = {
    apiKey: "AIzaSyA6mxsS2cAS_DekV9WG7oYzqBG7xLZH4QM",
    authDomain: "train-4bfeb.firebaseapp.com",
    databaseURL: "https://train-4bfeb.firebaseio.com",
    projectId: "train-4bfeb",
    storageBucket: "",
    messagingSenderId: "449751538998"
  };

  firebase.initializeApp(config);

  database = firebase.database();
  console.log(database);

  var ref = database.ref('trains');
 
  ref.on('value', gotData, errorData);

  function gotData(data) {

  	$('#tbody').empty();

  	var trains = data.val();
  	var array = Object.keys(trains);
  	console.log(trains[array[0]].name);

  	// var time = trains[array[0]].firstTrain;
  	// console.log(time);
  	// time = time.split(':');
  	// console.log(time);
  	// console.log(militaryTimeConverter(time));

  	for (var i = 0; i < array.length; i++) {
  		var key = array[i];
  		var name = $('<td>' + trains[key].name + '</td>');
  		var destination = $('<td>' + trains[key].destination + '</td>');
  		var frequency = $('<td>' + trains[key].frequency + '</td>');
  		var time = trains[key].firstTrain;
  		var nextArrival = $('<td>' + militaryTimeConverter(time) + '</td>');
  		console.log(nextArrival)
  		var tableRow = $('<tr>');
  		
  		$('#tbody').prepend(tableRow);
  		$(tableRow).append(name);
  		$(tableRow).append(destination);
  		$(tableRow).append(frequency);
  		$(tableRow).append(nextArrival);

  	}
  	
  }

  function errorData(err) {
  	console.log('Error!');
  	console.log(err);
  }

  $('#submit-button').on('click', function(event) {
 
    event.preventDefault();
    // TODO make user type in valid military time
  	var train = {
  	  name: $('#train-name').val().trim(),
  	  destination: $('#destination').val().trim(),
  	  firstTrain: $('#train-time').val().trim(),
  	  frequency: $('#frequency').val().trim()
    }

	$('#train-name').val(''); 
	$('#destination').val(''); 
	$('#train-time').val('');
	$('#frequency').val('');  

    ref.push(train);
    console.log(train);

  });

  function militaryTimeConverter(time) {
  	time = time.split(':');
  	var hours = Number(time[0]);
  	var minutes = Number(time[1])

  	var timeValue;

  	if (hours > 0 && hours <= 12) {
  	  timeValue = hours;
  	} else if (hours > 12) {
      timeValue = hours - 12;
  	} else if (hours === 0) {
      timeValue = 12;
  	}

  	timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;
  	timeValue += (hours >= 12) ? " P.M." : " A.M.";

  	return timeValue;
  }

  function minutesAway(time) {
  	var currentTime = new Date();
  	console.log(currentTime.getHours());

  	currentTime = currentTime.getHours() + ':' + currentTime.getMinutes();
  	console.log(currentTime)

  }

  minutesAway();

  // $('#submit-button').keyup(function (event) {
  // 	if (event.keyCode === 13) {
  // 		$('#submit-button').click();
  // 	}
  // });

});