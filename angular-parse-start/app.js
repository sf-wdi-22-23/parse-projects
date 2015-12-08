angular.module('parseSimple', [])
.run(['$rootScope', function($rootScope){
    // initialize Parse with Application ID and Javascript Key
    Parse.initialize("ApplicationId", "JavascriptKey");
    console.log('Parse is running.');
}]);