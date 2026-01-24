import fetch from 'node-fetch';

export async function handler(event, context) {
  const url = 'http://radios.mipanel.stream:6925/stream'; // tu radio original HTTP

  try {
    const res = await fetch(url);
    const data = await res.arrayBuffer(); // obtenemos el audio

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'no-cache',
      },
      body: Buffer.from(data).toString('base64'),
      isBase64Encoded: true,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: 'Error al conectar con la radio',
    };
  }
}
