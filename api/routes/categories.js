var express = require('express');
var router = express.Router();
const Categories = require("../db/models/Categories")
const Response = require("../lib/Response");
const CustomError=require("../lib/Error")
const Enum = require("../config/Enum")


/* GET users listing. */
router.get('/', async (req, res, next) => {

  try { 
    let categories= await Categories.find({})

    res.json(Response.successResponse(categories))

  } catch (err) {
    let errorResponse=Response.errorResponse(err)
    res.status(errorResponse.code).json(Response.errorResponse(err))
  }
});

router.post("/add", async (req,res)=>{
  let body=req.body
  try{

    if(!body.name) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, "Validation Error!", "name fields must be filled")

      let category = new Categories({
        name: body.name,
        is_active: true,
        created_by: req.user?.id
      })

      await category.save();

      res.json(Response.successResponse({success: true}));

  }catch(err){
    let errorResponse=Response.errorResponse(err)
    res.status(errorResponse.code).json(errorResponse)
  }
})

module.exports = router;
