const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51PcxROR10LmPtaVuxTnO1swa6xRIvob9DvsXwEGFHGpTPPF8o1EZKoVMRCoPd2rkTlNN1WQsFQ3WF7rwPtKHr27B00ZEF1KXCO');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rota para criar o PaymentIntent
app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;

    try {
        // Criar o PaymentIntent no Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, // Valor em centavos
            currency: 'brl',
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
