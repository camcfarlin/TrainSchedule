var url ="https://traindatabase-56b2c.firebaseio.com";
var dataRef = new Firebase(url);
var name;
var destination;
var intialTrain;
var frequency;
var nextTrain;
var nextTrainFormatted;
var minutesAway;
var firstTimeConverted;
var currentTime;
var diffTime;
var tRemainder;
var minutesTillTrain;
var keyHolder;
var getKey;


$(document).ready(function() {

     $("#add-train").on("click", function() {
     	name = $('#line').val().trim();
     	destination = $('#destination').val().trim();
     	intialTrain = $('#initalTrain').val().trim();
     	frequency = $('#frqInput').val().trim();
        firstTimeConverted = moment(intialTrain, "hh:mm").subtract(1, "years");
        currentTime = moment();
        diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        tRemainder = diffTime % frequency;
        minutesTillTrain = frequency - tRemainder;
        nextTrain = moment().add(minutesTillTrain, "minutes");
        nextTrainFormatted = moment(nextTrain).format("hh:mm");

     	keyHolder = dataRef.push({
     		name: name,
     		destination: destination,
     		intialTrain: intialTrain,
     		frequency: frequency,
            nextTrainFormatted: nextTrainFormatted,
            minutesTillTrain: minutesTillTrain
     	});
        
          /*console.log(keyHolder.path.u[0]);
          var key = keyHolder.path.u[0];
          console.log(key);*/

        $('#line').val('');
     	$('#destination').val('');
     	$('#initalTrain').val('');
     	$('#frqInput').val('');

     	return false;
     });

     dataRef.on("child_added", function(childSnapshot) {
		$('.train-schedule').append("<tr class='table-row' id=" + "'" + childSnapshot.key() + "'" + ">" +
               "<td class='col-xs-3'>" + childSnapshot.val().name +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().destination +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().frequency +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().nextTrainFormatted + // Next Arrival Formula ()
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().minutesTillTrain + // Minutes Away Formula
               "</td>" +
               "<td class='col-xs-1'>" + "<input type='submit' value='remove train' class='remove-train btn btn-primary btn-sm'>" + "</td>" +
          "</tr>");
}, function(errorObject){
});

$("body").on("click", ".remove-train", function(){
     $(this).closest ('tr').remove();
     getKey = $(this).parent().parent().attr('id');
     dataRef.child(getKey).remove();
});

}); 
