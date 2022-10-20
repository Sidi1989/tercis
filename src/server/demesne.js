const express = require('express');
const {renderFile} = require('ejs');
const path = require('path');
const cookieParser = require('cookie-parser');
const {log} = require('./middleware/log.js');
const {auth} = require('./middleware/auth.js');
const {dispatch} = require('./middleware/dispatch.js');




const demesne = express();
const port = process.argv[2] || 3005;
demesne.engine('ejs', renderFile);
demesne.listen(port, function () {
  console.log(`Demesne se escucha en el puerto ${port}`)
});

// Establece la ruta para las llamadas internas a la carpeta "public"
const publicDirname = path.join(__dirname, '../public');
const options = {};
demesne.use('/public', express.static(publicDirname, options));

// Permiten parsear cookies, jsons y x-www-form-urlencoded
demesne.use(cookieParser());
demesne.use(express.json());
demesne.use(express.urlencoded({ extended: true }));

demesne.use(log); // for logging requests
demesne.use(auth); // for authenticate users, through cookies
demesne.use(dispatch); // for routing
