
const { Moviemodel } = require("../Models/movie.model.js");

// user Update Route Logic

const UpdatedUser = async (User, update) => {
    try {
        let doc = await Moviemodel.findOneAndUpdate({ _id: User._id }, update, {
            new: true
        });
        console.log(doc);
        return { user: doc, message: "Your Informtion Updated Successfully" }

    } catch (error) {
        return { "message": "Something went wrong" }
    }
}


module.exports = { UpdatedUser }