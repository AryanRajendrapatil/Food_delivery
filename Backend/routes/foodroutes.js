const    express = require("express");
const { addfood,listfood,removefood } = require("../controllers/foodcontroller.js");
const multer = require("multer");

const router=express.Router()
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
       return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

router.post("/add",upload.single("image"),addfood)
router.get("/list",listfood)
router.post("/remove",removefood)

module.exports = router