module.exports = {
    index(req,res){
        const roomId = req.params.room
        const questionId = req.params.question
        const action = req.params.action
        const pass = req.body.password

        console.log(`room = ${roomId}, question = ${questionId}, action = ${questionId}, pass = ${pass}`)
    }
}