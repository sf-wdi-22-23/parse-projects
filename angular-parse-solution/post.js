angular.module('parseAuth')
    .factory('Post', function() {
        var factory = {};

        factory.all = function() {
            var Post = Parse.Object.extend("Post");
            var query = new Parse.Query(Post);
            query.equalTo("createdBy", Parse.User.current());
            return query.find()
        }

        factory.save = function(post) {
            var Post = Parse.Object.extend("Post"); // define Post object in Parse DB
            var newPost = new Post(); // instantiate Post object instance
            newPost.set("title", post.title);
            newPost.set("body", post.body);
            newPost.set("createdBy", Parse.User.current());
            return newPost.save()
        }

        factory.destroy = function(postId, success, err) {
            var Post = Parse.Object.extend("Post");
            var query = new Parse.Query(Post);
            query.get(postId)
                .then(function(post) {
                    post.destroy(function() {
                        success();
                    }, function() {
                        console.log("error")
                    })
                }, function(post, error) {
                    console.log("object and error", object, error)
                })
        };
        // END Post Factory
        return factory;
    })