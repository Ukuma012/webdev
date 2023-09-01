const Tutorial = require("../models/tutorial.model.js");

exports.create = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // create a Tutorial
    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published || false
    });

    Tutorial.create(tutorial, (err, data) => {
        if(err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        } else {
            res.send(data);
        }
    });
};

exports.findAll = (req, res) => {
    const title = req.query.title;

    Tutorial.getAll(title, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        } else {
            res.send(data);
        }
    });
};