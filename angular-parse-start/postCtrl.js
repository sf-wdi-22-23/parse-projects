angular.module('parseSimple')
.controller("PostCtrl", [ '$scope', function( $scope) {
      $scope.newpost = {};

      $scope.getPosts = function() {
          var Post = Parse.Object.extend("Post");
          var query = new Parse.Query(Post);
          query.find({
              success: function(results) {
                      // $scope.$apply(function(){
                      console.log("Successfully retrieved " + results.length + " objects.", results);
                      // note, these are Parse objects, not just JS objects
                      if(results.length === 0){
                        console.log("There are no posts yet.");
                      } else {
                        // Do something with the returned Parse.Object values
                        for (var i = 0; i < results.length; i++) {
                            var object = results[i];
                            // console.log(object.get('title'));
                            var foundPost = {
                                id: object.id,
                                title: object.get('title'),
                                body: object.get('body')
                            };
                            $scope.posts += foundPost;
                        }
                    }
                  // });
                },
                error: function(error) {
                console.log("Error: " + error.code + " " + error.message);
              }
          }).then(function(post) {
                // $scope.$apply();
                 console.log('it might work!');
                 return $scope.posts;
            });
        };

         $scope.createPost = function(post) {
              var Post = Parse.Object.extend("Post");
              var newpost = new Post();
                console.log("your post:", post);
                // set values for Post attributes
                newpost.set("title", post.title);
                newpost.set("body", post.body);
                newpost.save(null, {
                    success: function(post) {
                      //   $scope.$apply(function(){
                        // console.log("success post", post);
                        // Execute any logic that should take place after the object is saved.
                        console.log('New object created with objectId: ' + post.id);
                //      });
                    },
                    error: function(post, error) {
                        // Execute any logic that should take place if the save fails.
                        // error is a Parse.Error with an error code and message.
                        console.log('Failed to create new object, with error code: ' + error.message);
                    }
                }).then(function(post) {
                  $scope.getPosts();
                });
                // clear input fields
                $scope.post = {};
            };     
        }
]);