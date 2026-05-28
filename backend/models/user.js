const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Nama wajib diisi'] 
  },
  email: { 
    type: String, 
    required: [true, 'Email wajib diisi'], 
    unique: true,
    trim: true, 
    lowercase: true, // Otomatis mengubah email jadi huruf kecil semua agar tidak duplikat
    match: [/.+\@.+\..+/, 'Format email tidak valid']
  },
  password: { 
    type: String, 
    required: [true, 'Password wajib diisi'] 
  },
  role: { 
    type: String, 
    enum: ['owner', 'staff', 'tenant'], // PERUBAHAN: Ditambahkan 'owner' agar diizinkan oleh database 
  },
   roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room', 
    default: null 
  }
}, {
  timestamps: true 
});

const User = mongoose.model('User', userSchema);
module.exports = User;