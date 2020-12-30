const dbConnection = require('../conf/databaseCon'); 
const connection = dbConnection(); 
let getEstudiante = async (req,res)=>{     
    await connection.query("select * from estudiante", (err,result)=>{         
        if (result)                 
            res.send(result); 
        else
            res.status(500).send(err);     
    }); 
}

let addEstudiante = async (req,res)=>{     
    const {estudianteId,Name,LastName } = req.body     
    await connection.query(`INSERT INTO ESTUDIANTE VALUES(${estudianteId}, '${Name}', '${LastName}')`, (err,result)=>{                  
        if (result)                 
            res.send({estudianteId,Name,LastName});         
        else             
            res.status(500).send(err);     
    });  
}
module.exports = {     
    getEstudiante,     
    addEstudiante 
}