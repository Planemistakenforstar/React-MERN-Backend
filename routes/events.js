
const {Router} = require('express');
const { validateJWT }= require('../middlewares/validate-jwt');
const router = Router();

const {getEvents, createEvents, updateEvents, deleteEvents} = require('../controllers/events');
const {validateFields} = require('../middlewares/validate-fields');
const {check} = require('express-validator');
const {isDate} = require('../helpers/isDate');
// /api/events

// Every route passes from JWT validation
router.use(validateJWT);   


//Obtain events
router.get('/',  getEvents);


// create event
router.post('/',[
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
    check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
    validateFields
], createEvents);


// update event
router.put('/:id', updateEvents);


// remove event
router.delete('/:id', deleteEvents);


module.exports = router;