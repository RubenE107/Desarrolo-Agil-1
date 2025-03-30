import { Payment, MercadoPagoConfig,Preference } from 'mercadopago';
import dotenv from "dotenv";
dotenv.config();
export const crearOrdden = async (req, res) => {
// SDK de Mercado Pago
//import { MercadoPagoConfig } from 'mercadopago';
// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN });


const preference = new Preference(client);

preference.create({
  body: {
    items: [
      {
        title: 'Mi producto',
        quantity: 2,
        unit_price: 2000
      },
        {
            title: 'Mi producto 2',
            quantity: 1,
            unit_price: 500
        }
    ],
  }
})
.then(console.log)
.catch(console.log);
res.send("Creando orden");

}