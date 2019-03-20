const express = require("express");
const db = require('./data/db.js');
const server = express();
const PORT = 4000;

server.use(express.json());
server.get("/api/posts", (req, res) => {
    db
        .find()
		.then(post => {
			res.status(200).json({ post });
		})
		.catch(() => {
			res.status(500).json({ error: "The posts information could not be retrieved." });
		});
});

server.get("/api/posts/:id", (req, res) => {
	const id = req.params.id;
    db
        .findById(id)
		.then(post => {
            if(post.length < 1) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                res.status(200).json(post);
            }
		})
		.catch(() => {
			res.status(500).json({ error: "The post information could not be retrieved." });
		});
});

server.post("/api/posts", (req, res) => {
    const newPost = req.body; // reads information from the body of the request
    console.log(newPost);
  
    if (!newPost.title || !newPost.contents) {
      return res
        .status(400)
        .json({
          errorMessage: "Please provide title and contents for the post."
        });
    }
    db.insert(newPost) // returns a promise, so we need to use .then
    .then(result => {
      db.findById(result.id)
        .then(post => {
              res.status(201).json(post);
              console.log('This is a post', post);
        })
        .catch(err =>
          res.status(500).json({ message: "The post with the specified ID does not exist.", error: err })
        );
    })
    .catch(err =>
      res.status(500).json({ error: "There was an error while saving the post to the database"  })
    );
  });
  
server.delete("/api/posts/:id", (req, res) => {
	const id = req.params.id;
	db.findById(id)
		.then(post => {
			if (post) {
				db.remove(id).then(() => {
					res.status(200).json(post);
				});
			} else {
				res.status(404).json({
					message: "The post with the specified ID does not exist.",
				});
			}
		})
		.catch(err =>
			res.status(500).json({ error: "The post could not be removed" })
		);
});
server.put("/api/posts/:id", (req, res) => {
	const id = req.params.id;
	const postUpdates = req.body;
	db.update(id, postUpdates)
		.then(result => {
			if (postUpdates && postUpdates.contents) {
				db.findById(result.id)
					.then(post => {
						console.log(postUpdates);
						res.status(201).json(postUpdates);
					})
					.catch(err =>
						res.status(500).json({
							errorMessage: "The PUT findById failed",
							error: err,
						})
					);
			} else {
				res.status(400).json({
					errorMessage:
						"Please provide title and contents for the post.",
				});
			}
		})
		.catch(err =>
			res.status(500).json({
				error: "The post information could not be modified." ,
			})
		);
});

server.listen(PORT, () => {
  console.log(`\n*** Server Running on http://localhost:${PORT} ***\n`)
})