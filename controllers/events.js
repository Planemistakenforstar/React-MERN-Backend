const {response}=require('express');
const Event = require('../models/Evento');

const getEvents = async(req, res = response) =>{
     const events = await Event.find()
                                   .populate('user', 'name password');
          console.log('enters getEvents');

     res.json({
          ok: true,
        events
     })   
}


const createEvents = async(req, res = response) =>{
    console.log('enters createEvents');
    const event = new Event(req.body);

    try{
        event.user = req.uid;
        const savedEvent = await event.save();
        
        res.json({
            ok: true,
            event: savedEvent  // Now event will have 'id' instead of '_id'
        });
        
    }catch(error){
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


const updateEvents = async(req, res = response) =>{
     const eventId = req.params.id;
     const uid = req.uid;
     
     try{
          const evento = await Event.findById(eventId);
          if(!evento){
             return  res.status(404).json({
                    ok: false,
                    msg: 'Evento no existe por ese id'
               });
          } 

          if(evento.user.toString() !== uid ) {
               return res.status(401).json({
                    ok: false,
                    msg: ' No tiene privilegio de editar este evento'
               })
          }

          const newEvent = {
               ...req.body,
               user: uid
          }

          const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true});

          res.json({
               ok: true,
               event: updatedEvent
          });

     }catch(error){
          res.status(500).json({
               ok: false,
               msg:'Hable con el administrador'
          })
     }
}

const deleteEvents = async(req, res = response) =>{
  const eventId = req.params.id;
     const uid = req.uid;
     try{
          const evento = await Event.findById(eventId);
          if(!evento){
               return res.status(404).json({
                    ok: false,
                    msg: 'Evento no existe por ese id'
               });
          } 

          if(evento.user.toString() !== uid ) {
               return res.status(401).json({
                    ok: false,
                    msg: ' No tiene privilegio para editar este evento'
               })
          }
          await Event.findByIdAndDelete(eventId);
          res.json({
               ok: true,
          });

     }catch(error){
          res.status(500).json({
               ok: false,
               msg:'Hable con el administrador'
          })
     }  
}


module.exports = {
    getEvents,
    createEvents,
    updateEvents,
    deleteEvents
}