const express = require("express");
const db = require('./data/db.js');
const server = express();
const PORT = 4000;

server.use(express.json());
server.get("/api/posts", (req, res) => {
    db
        .find()
		.then(posts => {
			res.status(200).json({ posts });
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

server.listen(PORT, () => {
  console.log(`\n*** Server Running on http://localhost:${PORT} ***\n`)
})