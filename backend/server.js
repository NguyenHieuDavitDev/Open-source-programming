const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const platesRoutes = require('./routes/plates');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', platesRoutes);

const PORT = 5003;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
