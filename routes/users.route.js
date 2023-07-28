
const express = require("express");

const { Usermodel } = require("../Models/user.model.js");
const { UpdatedUser } = require("../Controller/user.js");

const userRouter = express.Router();


// get method
// user/get-all
userRouter.get("/get-all", async (req, res) => {
    // const params = req.query;
    try {
        const users = await Usermodel.find();
        res.send(users);
    }
    catch (err) {

        res.send("Something error in get method");
        console.log(err);
    }

})

// pagination
// user/get-paginated?page=1&size=10

userRouter.get("/get-paginated", async (req, res) => {

    const { page, size } = req.query;
    const Id = Number(page);
    const pageSize = Number(size);

    try {
        const users = await Usermodel.find().limit(pageSize).skip((Id - 1) * pageSize);
        res.send(users);
    }
    catch (err) {

        res.send("Something error in get method");
        console.log(err);
    }

})



// post method
// user/add-user

userRouter.post("/add-user", async (req, res) => {

    const { first_name } = req.body;

    const userPresent = await Usermodel.findOne({ first_name });

    if (userPresent?.first_name) {
        return res.status(400).json({ message: "User already exist" })
    }

    else {
        try {
            const data = req.body;
            await Usermodel.insertMany([data])
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

userRouter.get('/get-single', async (req, res) => {

    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ message: "User Id is required" });
    }

    try {
        const query = await Usermodel.findOne({ _id: id });
        if (!query) {
            return res.status(400).json({ message: "User Id is not valid" });
        }

        res.send(query);
    }
    catch (err) {
        console.log(err);
        res.send("Something error in get-single Method");
    }
});

// user/search?first_name=Anet
userRouter.get('/search', async (req, res) => {

    try {
        const { first_name } = req.query;
        const searchResults = await Usermodel.find({first_name: first_name});
        return res.send(searchResults);
    }

    catch (error) {
        console.log(error);
        res.send("Error");
    }
});



// Filter
// user/filter?page=1&size10&domain=Sales&gender=Male&available=
userRouter.get('/filter', async (req, res) => {

    try {
        // Get the selected filters from the query parameters
        const { domain, available, gender, page, size } = req.query;

        const Id = Number(page);
        const pageSize = Number(size);

        const queryObj = {};

        if (domain) {
            queryObj.domain = domain
        }

        if (available) {
            queryObj.available = available
        }

        if (gender) {
            queryObj.gender = gender
        }

        // Filter the users based on selected filters
        // {$or: [{domain: domain}, {available: available}] }
        const filteredUsers = await Usermodel.find(queryObj).limit(pageSize).skip((Id - 1) * pageSize);;

        return res.status(201).send(filteredUsers)
    }

    catch (error) {
        console.log(error);
    }
});


// user/update
userRouter.patch('/update/:userID', async (req, res) => {

    const Id = req.params.userID;
    const _id = Id;
    const user = await Usermodel.findById(_id);

    console.log(user);

    const { first_name, last_name, email, domain, gender, available } = req.body
    // here I am creating update object with deafult value provided to ensure whole data get updated
    const update = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        domain: domain,
        gender: gender,
        available: available,
    }
    try {
        // here I am getting response from a function that hold my all logic  
        let response = await UpdatedUser(user, update)
        return res.status(201).send(response)

    } catch (error) {
        return res.status(401).send(error);
    }
})


// user/update
userRouter.patch('/update/:userID', async (req, res) => {

    const Id = req.params.userID;
    const _id = Id;
    const user = await Usermodel.findById(_id);

    console.log(user);

    const { first_name, last_name, email, gender, domain, available } = req.body
    // here I am creating update object with deafult value provided to ensure whole data get updated
    const update = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        gender: gender,
        domain: domain,
        available: available,
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
userRouter.delete("/delete/:userID", async (req, res) => {

    const Id = req.params.userID;

    try {
        const query = await Usermodel.findByIdAndDelete({ _id: Id });
        res.send("User deleted successfully");
    }
    catch (err) {
        res.send("Something error in Delete Method")
        console.log(err);
    }
})

module.exports = { userRouter };

