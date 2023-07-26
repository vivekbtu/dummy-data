
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

const filterByAge= async (minAge, maxAge) => {
    try{
        const data = await Moviemodel.find({ age: { $gte: minAge, $lte: maxAge } }).toArray();
        console.log(data)
        return { user: doc, message: "Your Filter Informtion" }
    }
    catch(error){
        return {"message":"Something Went Wrong In Filter"};
    }
  }

module.exports = { UpdatedUser,filterByAge }