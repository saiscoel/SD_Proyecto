const {Router} = require("express"); 
const router = Router(); 
const{ getEstudiante, addEstudiante } =  require("../controller/estudiante.controller"); 
 
router.get('/', getEstudiante); 
router.post("/",addEstudiante); 
 
module.exports = router;