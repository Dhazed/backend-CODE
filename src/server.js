require('dotenv').config();
const app = require('./app');

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => console.log(`Server in ascolto sulla porta: ${port}`));

