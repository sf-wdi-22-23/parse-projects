angular.module('parseAuth')
    .controller("PostsCtrl", ['$scope', 'Post',
        function($scope, Post) {
            $scope.newPost = {};
            ///////////////////////////////////////
            // callbacks for handling Parse queries
            ///////////////////////////////////////
            function getPostsSuccess(results) {
                var allPosts = [];
                if (results.length === 0) {
                    console.log("There are no posts yet.");
                    $scope.posts = [];
                    $scope.$apply();
                } else {
                    for (var i = 0; i < results.length; i++) {
                        var post = results[i]; // post = { id: "string", attributes: {title: "sometitle", body: "text"} }
                        allPosts.unshift(post);
                    }
                    $scope.posts = allPosts;
                    // necessary to refresh $scope with all posts
                    $scope.$apply();
                    console.log("$scope.posts is: ", $scope.posts);
                }
            }

            function getPostsError(error) {
                alert("Error: " + error.code + " " + error.message);
            }

            function createPostSuccess(post) {
                console.log('New object created with objectId: ' + post.id);
                $scope.newPost = {}; // clear input fields
                $scope.getPosts(); // refresh $scope.posts
            }

            function createPostError(post, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                alert('Failed to create new object, with error code: ' + error.message);
            }

            ///////////////////////////////////////
            // Controller functions
            ///////////////////////////////////////

            $scope.getPosts = function() {
                Post.all()
                    .then(getPostsSuccess, getPostsError)
            };

            // fetch all posts on controller load
            $scope.getPosts();

            $scope.createPost = function(post) {
                Post.save(post)
                    .then(createPostSuccess, createPostError);
            };

            $scope.deletePost = function(postId) {
                console.log("postId is: ", postId)
                Post.destroy(postId, $scope.getPosts, function(post, error) {
                    console.log("error deleting post:", error, post)
                })
            }

            // Listening for user logging in to populate posts
            $scope.$on("logged_in", function(event, message) {
                $scope.message = message;
                console.log("logged in message is:", $scope.message);
                $scope.getPosts();
            });

            // Listening for logout from root scope controller, clears posts
            $scope.$on("logged_out", function(event, message) {
                $scope.message = message;
                console.log("logged out message is:", $scope.message);
                $scope.posts = [];
            });
        } // END POST CONTROLLER
    ]);