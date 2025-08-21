const agentSchema = require("../schema/agent")

const agentList = async(request , response) => {
    try{

        const list = await agentSchema.find({});
        if(!list){
            response.status(400).json({
                message : "There is No Agents plesae add agents"
            })
        }
        response.status(200).json(list)

    } catch (err) {
        response.status(500).json({
            message :"Something went wrong"
        })
    }
}

module.exports = {agentList}