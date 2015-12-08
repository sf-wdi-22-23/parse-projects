angular.module('parseSimple', [])
.run(['$rootScope', function($rootScope){
    // initialize Parse with Application ID and Javascript Key
    Parse.initialize("CCrrZJCx7GAwrKy3ybIJg5qDjpiZVZj3QYpXakzt", "GVy024wuNobVdxSg4cR9FyXPbeZFGTsn7C7eZPLy");
    console.log('Parse is running.');
}]);