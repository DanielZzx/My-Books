
/* 
ROTA DA HOME PAGE
*/
const express = require('express');
const router = express.Router()

const path = require("path")

router.get("/", async (req,res)=>{
 res.sendFile(path.join(__dirname, "../../public/home/index.html"));
})

module.exports = router