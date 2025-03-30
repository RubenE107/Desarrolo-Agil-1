import { MercadoPagoConfig, Preference } from 'mercadopago';
import dotenv from 'dotenv';
dotenv.config();

export const crearOrden = async (req, res) => {
  try {
    // Agrega credenciales
    const client = new MercadoPagoConfig({ 
      accessToken: process.env.ACCESS_TOKEN 
    });

    const preference = new Preference(client);

    // Obtener datos del cuerpo de la solicitud
    const { items, auto_return } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ 
        error: 'Se requiere al menos un item en la orden' 
      });
    }

    const response = await preference.create({
      body: {
        items: items.map(item => ({
          title: item.title || 'Producto sin nombre',
          quantity: item.quantity || 1,
          unit_price: item.unit_price || 0,
          ...(item.description && { description: item.description }),
          ...(item.currency_id && { currency_id: item.currency_id }),
          ...(item.picture_url && { picture_url: item.picture_url })
        })),
        back_urls: {
          success: process.env.HOST_NAME+"/Exito",
          failure: process.env.HOST_NAME+"/Error",
          pending: process.env.HOST_NAME+"/Pendiente"
        },
        ...(auto_return && { auto_return: auto_return })
      }
    });

    res.status(200).json(response);
    
  } catch (error) {
    console.error('Error al crear la orden:', error);
    res.status(500).json({ 
      error: 'Error al crear la orden en Mercado Pago',
      details: error.message 
    });
  }
};