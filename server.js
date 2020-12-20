import './env.js';
import chalk from 'chalk';


import app from './src/app.js';
import accountService from './src/services/accountservice.js';

const PORT = 5600;
import cron from 'node-cron';


 app.listen(PORT, err=>{
    //Il y a eu une erreur dans le lancement du serveur
    if(err){
        process.exit(1);
    }
    //Affiche l'information que le serveur est bien actif
    console.log(chalk.blue(`Serveur en écoute sur le port: ${PORT}`));
    //A chaque 5 minutes le serveur fait la function
    cron.schedule(' */5 * * * *', async function(){ 
    //dans les services des comptes on appelle la fonction qui donne 2 inox a tous les explorateur de la BD
     const account = await accountService.giveInox();  
   });
   
    
   cron.schedule(' 0 */1 * * *', async function(){ 
    // function a toute les heures
    const account = await accountService.giveElement(); 
    })
    
    
   
});



