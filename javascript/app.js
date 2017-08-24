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

  // var trainName = $('#train-name').val();
  // var destination = $('#destination').val();
  // var trainTime = $('#train-time').val();
  // var frequency = $('#frequency').val();

 
 
  ref.on('value', gotData, errorData);

  function gotData(data) {

  	$('#tbody').empty();

  	var trains = data.val();
  	var array = Object.keys(trains);
  	console.log(trains[array[0]].name);

  	for (var i = 0; i < array.length; i++) {
  		var key = array[i];
  		var name = $('<td>' + trains[key].name + '</td>');
  		var destination = $('<td>' + trains[key].destination + '</td>');
  		var frequency = $('<td>' + trains[key].frequency + '</td>');
  		var nextArrival = $('<td>' + trains[key].firstTrain + '</td>');
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

  



});