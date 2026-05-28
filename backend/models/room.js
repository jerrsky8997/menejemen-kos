const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: { 
    type: String, 
    required: [true, 'Nomor kamar wajib diisi'], 
    unique: true,
    trim: true
  },
  type: { 
    type: String, 
    enum: ['Regular', 'VIP', 'VVIP'], 
    required: [true, 'Tipe kamar wajib dipilih'] 
  },
  size: {
    type: String,
    required: [true, 'Ukuran kamar wajib diisi'],
    trim: true
  },
  pricePerMonth: { 
    type: Number, 
    required: [true, 'Harga per bulan wajib diisi'],
    min: [0, 'Harga per bulan tidak boleh negatif']
  },
  facilities: {
    type: [String],
    default: [] 
  },
  status: { 
    type: String, 
    enum: ['available', 'occupied', 'maintenance'], 
    default: 'available' 
  },
  description: { 
    type: String 
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('Room', roomSchema);