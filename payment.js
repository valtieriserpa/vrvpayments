// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Inicializa o Stripe com a chave secreta do Stripe do .env
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
    const { amount } = req.body; // Recebe o valor enviado pelo frontend

    try {
        // Cria o PaymentIntent no Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,  // Valor em centavos (ex: R$ 10,00 -> 1000)
            currency: 'brl', // Defina a moeda (BRL, USD, etc.)
        });

        // Retorna o clientSecret ao frontend
        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        // Retorna o erro caso algo dê errado
        res.status(500).json({ error: error.message });
    }
};
