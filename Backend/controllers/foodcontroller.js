const foodmodel = require("../models/foodmodel");

const fs = require("fs");

//add food item
const addfood=async(req,res)=>{
    const image_filename=`${req.file.filename}`
    try {
        const food=new foodmodel({
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            image:image_filename,
            category:req.body.category
        })
        await food.save()
        res.json({success:true,message:"Food added successfully"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Failed to add food"})
    }
}

//list all food items
const listfood=async(req,res)=>{
    try {
        const foods=await foodmodel.find()
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Failed to fetch food"})
    }
}

//remove food item
const removefood=async(req,res)=>{
    try {
        const food=await foodmodel.findById(req.body.id)
        fs.unlinkSync(`./uploads/${food.image}`,()=>{})
        await foodmodel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Food removed successfully"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Failed to remove food"})
    }
}
module.exports = {addfood,listfood,removefood}
