const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");
const multer = require("multer");
const moment = require("moment")

//img storage config
var imgconfig = multer.diskStorage({
    destination : (req, file, callback) => {
        callback(null, "./uploads");
    },
    filename : (req, file, callback) => {
        callback(null, `image-${Date.now()}.${file.originalname}`)
    }
})


//img filter
const isImage = (req, file, callback) => {
    if(file.mimetype.startsWith("image")) {
        callback(null, true)
    } else {
        callback(null, Error("only image is allowed"))
    }
}

var upload = multer({
    storage : imgconfig,
    fileFilter : isImage
})

//register userdata
router.post("/register", upload.single("photo"), (req, res) => {
    const { username } = req.body;
    const { filename } = req.file;

    if(!username || !filename) {
        res.status(422).json({status : 422, message : "Fill all the details"})
    }

    try {
      let date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
      conn.query("INSERT INTO usersdata SET ?", {
        username : username,
        userimg : filename,
        date : date
      }, 
      (error, result) => {
        if(error) console.log("Error in inserting to database!!!")
        else {
             console.log("Data added to DB");
             res.status(201).json({status : 201, data : req.body})
        }
      })
        
    } catch (error) {
        res.status(422).json({status : 422, error})
    }
})


//get user data
router.get("/getdata", (req, res) => {
    try {
     conn.query("SELECT * FROM usersdata", (error, result) => {
        if(error) console.log("Error in getting data from database!!!")
        else {
             console.log("Data fetched from DB");
             res.status(201).json({status : 201, data : result})
        }
     })
    } catch(error) {
        res.status(422).json({status : 422, error})
    }
});

//delete user
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    try {
    conn.query(`DELETE FROM usersdata WHERE id = ${id}`, (err, result) => {
        if(err) console.log("Error in Deleting the user");
        else {
            console.log("User Deleted!!!");
            res.status(201).json({status : 201, data : result})
        }
    })
    } catch(error) {
        res.status(422).json({status : 422, error})
    }
})


module.exports = router;