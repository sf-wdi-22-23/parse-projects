# Angular Auth with Parse

## Why use Parse?

Parse is a cloud-hosted "backend as a service", similar to Firebase. It features a nice browser based dashboard for managing your database and abstracts away a lot of the backend development concerns like setting up your API routes for your client app to query.

Long story short, if you're a frontend focused developer, Parse will make your life easier, and if you're a backend focused developer, it will save you a lot of time when it comes to authentication and your basic model concerns so that you can focus on more complex server-side issues.

### The Angular App

1. Get boilerplate code (from cloning this repo) using `git clone <this repo's url>``.
1. Boot up a simple server using `http-server` for Node (port `8081`) or `python -m SimpleHTTPServer <port number>` to serve your `index.html` page.
1. Navigate to `localhost:<your port>`.

### Connecting Parse

In order to use Parse, we'll need to register for an account and add some code to our Angular app.

1. Sign up for a Parse account.
1. Navigate to Settings and find your `ApplicationId` and `JavascriptKey`.
1. Add the keys to the `Parse.initialize()` function call in your `app.js` file.

```javascript
Parse.initialize("ApplicationId", "JavascriptKey");
```

### Using the Auth

Now that we have our app connected to Parse, let's try using it!

1. On `localhost:<your port>`, fill out the form to sign up as a new user.
1. In the Parse dashboard, click on your app name, then click "data" on the left hand side. You should see several entries, including "Role",  "Session", and "User".
1. Click on "User" and see if your data was added to the database.

### GOTCHAS:
Angular does not always play nicely with Parse. Here are some of the hurdles we encountered along the way:

1. `$scope.$apply();` - Call Angular's `$apply` service method to apply changes to $scope on the fly. This will solve some problems but it is not a great approach, as you will learn.
1. Store your current Parse user in the `$rootScope`
1. `Error: ngRepeat:dupes` - This turned out to be a red herring. I added the recommended `track-by $index` but it only led to more errors. Probably a good thing to follow through and debug them until they go away, but when it was done I removed `track-by $index` and it was as if nothing ever happened.
1. Promises, promises! Wrap parse async calls inside `$q` promises.

[Here is a great article](http://tumba.solutions/blog/angularjs-and-parse) discussing some of these complexities and how one dev team worked around them. (This team used Parse, Angular and the JavaScript SDK for an iOS app. Pretty cool!)

[Here is another article](http://josee.me/2013/09/30/5-tips-for-using-parse-with-angularjs/) we found useful. This article has some display problems with the way HTML entities display in the browser (`&lt;` is `less than`, `&rt;` is `greater than` and `&quot;` is exactly what it looks like).

[This next article](http://popdevelop.com/2013/11/parse-com-and-angularjs-for-easy-setup-of-user-authentication/) provides source code for basic user authentication with Angular and Parse.


### Stretch: 
Change Delete button to Edit button and add update method

