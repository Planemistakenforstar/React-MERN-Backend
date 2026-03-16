// db user:mern_user
// db pass:898DscX5zSuVMRLG

const mongoose = require('mongoose');

const dbConnection = async() => {
    try{
        await mongoose.connect(process.env.DB_CNN);
        console.log('DB ONLINE!');
        //
    }catch(error){
        console.log(error);
        throw new Error('Error a la hora de inicializar');
        //
    }

}

module.exports = {
    dbConnection
}