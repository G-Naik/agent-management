const agentSchema = require("../schema/agent")  

const Joi = require('joi')

const agentValidationSchema = Joi.object({
    name : Joi.string().min(2).required(),
    email : Joi.string().email().required(),
    password : Joi.string().min(8).required(),
    mobile: Joi.alternatives()
    .try(
      Joi.string().trim().pattern(/^\d{10}$/),         
      Joi.string().trim().pattern(/^\+?[1-9]\d{9,14}$/)   
    )
    .required()
    .messages({
      "alternatives.match":
        "Mobile must be 10 digits (e.g. 9876543210) or a valid international number (e.g. +919876543210).",
    }),
})

const agentCreation = async( request , response) => {

    try{
        const {error} = agentValidationSchema.validate(request.body)
        
        
        if(error){
            return response.status(400).json({
                message : error.details[0].message
            })
        }

        const checkExistingDetails = await agentSchema.findOne({email : request.body.email})
        if(checkExistingDetails){
            response.status(400).json({
                message : "Agent Already exists"
            })
            return ;
        }
        await agentSchema.create(request.body);
        return response.status(201).json({
            message :"Agent Created Successfully"
        })

    } catch(err) {
        console.error("Error in agentCreation",err)
        response.status(500).json({
            message:"Something went wrong"
        })
    }
    
}

module.exports = {agentCreation}