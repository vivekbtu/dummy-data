
const express = require("express");

const { Moviemodel } = require("../Models/movie.model.js");
const { UpdatedUser } = require("../Controller/user.js");

const movieRouter = express.Router();


// get method
// user/get-all
movieRouter.get("/get-all", async (req, res) => {
    // const params = req.query;
    try {
        const users = await Moviemodel.find();
        res.send(users);
    }
    catch (err) {

        res.send("Something error in get method");
        console.log(err);
    }

})

// pagination
// user/get-paginated?page=1&size=10

movieRouter.get("/get-paginated", async (req, res) => {

    const { page, size } = req.query;
    const Id = Number(page);
    const pageSize = Number(size);

    try {
        const users = await Moviemodel.find().limit(pageSize).skip((Id - 1) * pageSize);
        res.send(users);
    }
    catch (err) {

        res.send("Something error in get method");
        console.log(err);
    }

})



// post method
// user/add-user

movieRouter.post("/add-user", async (req, res) => {

    const { MovieName } = req.body;

    const moviePresent = await Moviemodel.findOne({ MovieName });

    if (moviePresent?.first_name) {
        return res.status(400).json({ message: "Movie already exist" })
    }

    else {
        try {
            const data = req.body;
            await Moviemodel.insertMany([data])
            res.send("Data create");
        }
        catch (err) {
            console.log(err);
            res.send("Something error in post Method");
        }
    }
})

// get single data method
// user/get-single?id=64b5024dcd64141538980f7a

movieRouter.get('/get-single', async (req, res) => {

    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ message: "Movie Id is required" });
    }

    try {
        const query = await Moviemodel.findOne({ _id: id });
        if (!query) {
            return res.status(400).json({ message: "Movie Id is not valid" });
        }

        res.send(query);
    }
    catch (err) {
        console.log(err);
        res.send("Something error in get-single Method");
    }
});


movieRouter.get('/search', async (req, res) => {

    try {
        const { first_name } = req.query;
        // user => user.first_name.toLowerCase().includes(first_name.toLowerCase())
        const searchResults = await Moviemodel.find({first_name: first_name});
        return res.send(searchResults);
    }

    catch (error) {
        console.log(error);
        res.send("Error");
    }
});


// user/update
movieRouter.patch('/update', async (req, res) => {
    const { _id, first_name } = req.body
    const user = await Moviemodel.findById(_id)
    console.log(user);

    // here I am creating update object with deafult value provided to ensure whole data get updated
    const update = {
        first_name: first_name,
    }
    try {
        // here I am getting response from a function that hold my all logic  
        let response = await UpdatedUser(user, update)
        return res.status(201).send(response)

    } catch (error) {
        return res.status(401).send(error);
    }
})



// delete method
// user/delete/64c0e04dc717e8f6202cd55e
movieRouter.delete("/delete/:userID", async (req, res) => {

    const Id = req.params.userID;

    try {
        const query = await Moviemodel.findByIdAndDelete({ _id: Id });
        res.send("User deleted successfully");
    }
    catch (err) {
        res.send("Something error in Delete Method")
        console.log(err);
    }
})

module.exports = { movieRouter };



