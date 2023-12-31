const express = require('express');
const axios = require('axios');

const app = express();
const port = 9092;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
    if (err && err.message === 'ERR_CACHE_MISS') {
        res.redirect('/');
    } else {
        next();
    }
});

app.get('/', (req, res) => {
    res.render('login');
});

app.post('/portal', async (req, res) => {
    const { usuario, senha } = req.body;

    try {
        const response = await axios.post('http://127.0.0.1:9091/siga/api/v1', {
            login: usuario,
            senha: senha
        });

        const currentDate = new Date();
        const startModalDate = new Date('2023-07-17');
        const endModalDate = new Date('2023-07-22');

        if (currentDate >= startModalDate && currentDate <= endModalDate) {
            res.render('index', { responseData: response.data, showModal: true });
        } else {
            res.render('index', { responseData: response.data, showModal: true });
        }
    } catch (error) {
        console.error(error);
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
