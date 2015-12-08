Parse.initialize("ApplicationId", "JavascriptKey");

var StudentObject = Parse.Object.extend("students");
var newStudent = new StudentObject();

var query = new Parse.Query("students");

// on load we want to see all the students
query.find({
  success: function(results) {
    console.log("Successfully retrieved " + results.length + " students.");
    if(results.length === 0){
        document.getElementById("parse-stuff").innerHTML = "Nonesuch";
    }
    // Do something with the returned Parse.Object values
    for (var i = 0; i < results.length; i++){ 
      var object = results[i];
      if ( object.get('angular') === true ) {
        var temp = ' - Angular</li>';
      } else {
        var temp = ' - Un-Angular</li>';        
      }
      document.getElementById("parse-stuff").innerHTML += '<li>' + object.get('firstName') + " " + object.get('lastName') + temp;
    }
  },
  error: function(error) {
    console.log("Error: " + error.code + " " + error.message);
  }
});

var addStudent = function(){
    var fname = document.getElementById("first-name").value;
    var lname = document.getElementById("last-name").value;
    var aBool = document.getElementById("angular").checked;

    newStudent.set("firstName", fname);
    newStudent.set("lastName", lname);
    newStudent.set("angular", aBool);

    newStudent.save(null, {
      success: function(newStudent) {
        // Execute any logic that should take place after the object is saved.
        console.log('New student object created with objectId: ' + newStudent.id);
      },
      error: function(newStudent, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
         console.log('Failed to create student object, with error code: ' + error.message);
      }
    });
};

    



