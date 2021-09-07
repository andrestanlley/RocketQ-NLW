const Database = require('../db/config')

module.exports = {
    // Gera númnero da sala
    async create(req, res){
        const db = await Database()
        const pass = req.body.password
        let roomId = ''
        let isRoom = true
        while(isRoom){
            for (var i = 0; i < 6; i++){
                roomId += Math.floor(Math.random() * 10).toString()
            }
            const roomsOnDb = await db.all(`SELECT id FROM rooms`)
            isRoom = roomsOnDb.some(roomsOnDb => roomsOnDb === roomId)
    
            if(!isRoom){
                // Insere os dados no BD
                await db.run(`INSERT INTO rooms(
                    id,
                    pass
                ) VALUES (
                    ${Number(roomId)},
                    "${pass}"
                )`)
                
        }

        }
        await db.close()

        res.redirect(`/room/${roomId}`)
    },

    async open(req,res){
        const db = await Database()
        const roomId = req.params.room
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`)
        let isQuestion = true

        if(questions.length == 0 && questionsRead.length == 0){
            isQuestion = false
        }


        res.render("room", {roomId, questions, questionsRead, isQuestion})
    },
    enter(req,res){
        const roomId = req.body.roomId
        if (roomId == ""){
            res.render('blankroom')
        }else{
            res.redirect(`/room/${roomId}`)
        }
    }
}