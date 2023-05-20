const qr = require("qrcode");
const path = require('path');

async function generateQRCode(data,userId,orderId,ticketTypeId) {
    try {
      const stJson = JSON.stringify(data);
      
      const name = `QR-${userId}-${orderId}-${ticketTypeId}-${new Date().getTime()}.png`
      const qrImagePath = path.join(__dirname, '..', 'public', 'tickets', name);
      await qr.toFile(qrImagePath, stJson);
      const barcode = `tickets/${name}`;
      return barcode;
    } catch (err) {
      throw err;
    }
  }

module.exports = {generateQRCode}