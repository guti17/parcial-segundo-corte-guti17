const express = require('express');
const axios = require('axios'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Agrega el middleware para manejar solicitudes JSON

// Endpoint para obtener el precio de una moneda
app.get('/coin/:coinName', async (req, res) => {
  const coinName = req.params.coinName.toUpperCase();

  try {
    const response = await axios.get(`https://api.coincap.io/v2/assets/${coinName}`);

    if (response.data.data) {
      const priceUsd = response.data.data.priceUsd;
      res.send(`El precio en dólares de la moneda ${coinName} para el día de hoy es ${priceUsd}`);
    } else {
      res.send(`El nombre de la moneda ${coinName} no fue encontrado en la base de datos`);
    }
  } catch (error) {
    if (!error.response) {
      return res.send('Error: No se pudo conectar al servidor');
    }

    if (error.response.status === 404) {
      return res.send(`El nombre de la moneda ${coinName} no fue encontrado en la base de datos`);
    }

    res.send('Error: Ocurrió un problema al obtener los datos de la moneda');
  }
});

// Endpoint para obtener una lista de usuarios
const users = [{ name: 'SAMUEL', lastName: 'ACERO GARCIA' },
{ name: 'DAREK', lastName: 'ALJURI MARTINEZ' },
{ name: 'JUAN FELIPE', lastName: 'CEPEDA URIBE' },
{ name: 'ANA MARIA', lastName: 'CHAVES PEREZ' },
{ name: 'CARLOS DAVID', lastName: 'CRUZ PAVAS' },
{ name: 'DIEGO NORBERTO', lastName: 'DIAZ ALGARIN' },
{ name: 'JORGE ESTEBAN', lastName: 'DIAZ BERNAL' },
{ name: 'DAVID ESTEBAN', lastName: 'DIAZ VARGAS' },
{ name: 'JUAN JOSE', lastName: 'FORERO PEÑA' },
{ name: 'SANTIAGO', lastName: 'GUTIERREZ DE PIÑERES BARBOSA' },
{ name: 'SAMUEL ESTEBAN', lastName: 'LOPEZ HUERTAS' },
{ name: 'MICHAEL STEVEN', lastName: 'MEDINA FERNANDEZ' },
{ name: 'KATHERIN JULIANA', lastName: 'MORENO CARVAJAL' },
{ name: 'JUAN PABLO', lastName: 'MORENO PATARROYO' },
{ name: 'NICOLAS ESTEBAN', lastName: 'MUÑOZ SENDOYA' },
{ name: 'SANTIAGO', lastName: 'NAVARRO CUY' },
{ name: 'JUAN PABLO', lastName: 'PARRADO MORALES' },
{ name: 'DANIEL SANTIAGO', lastName: 'RAMIREZ CHINCHILLA' },
{ name: 'JUAN PABLO', lastName: 'RESTREPO COCA' },
{ name: 'GABRIELA', lastName: 'REYES GONZALEZ' },
{ name: 'JUAN JOSE', lastName: 'RODRIGUEZ FALLA' },
{ name: 'VALENTINA', lastName: 'RUIZ TORRES' },
{ name: 'MARIANA', lastName: 'SALAS GUTIERREZ' },
{ name: 'SEBASTIAN', lastName: 'SANCHEZ SANDOVAL' },
{ name: 'JOSUE DAVID', lastName: 'SARMIENTO GUARNIZO' },
{ name: 'SANTIAGO', lastName: 'SOLER PRADO' },
{ name: 'MARIA FERNANDA', lastName: 'TAMAYO LOPEZ' },
{ name: 'DEIVID NICOLAS', lastName: 'URREA LARA' },
{ name: 'ANDRÉS', lastName: 'AZCONA' }];

app.get('/users/:count?', (req, res) => {
  const count = parseInt(req.query.count) || 10;
  const sort = req.query.sort || 'ASC';
  
  const sortedUsers = users.sort((a, b) => {
    if (sort === 'ASC') {
      return a.lastName.localeCompare(b.lastName); // Corregir para ordenar por apellido
    } else {
      return b.lastName.localeCompare(a.lastName); // Corregir para ordenar por apellido
    }
  });

  const result = sortedUsers.slice(0, count);
  
  res.json(result);
});

// Endpoint para crear un usuario
app.post('/users', (req, res) => {
  const { name, lastName, email, city = 'Bogotá', country = 'Colombia' } = req.body;

  if (!name || !lastName || !email) { // Corregir nombres de variables
    return res.status(400).send('Error: Nombre, apellido y correo electrónico son obligatorios');
  }

  const newUser = {
    name,
    lastName,
    email,
    city,
    country
  };

  users.push(newUser);

  res.status(201).json(newUser);
});

app.listen(PORT, () => {
  console.log(`El servidor está corriendo en el puerto ${PORT}`);
});
