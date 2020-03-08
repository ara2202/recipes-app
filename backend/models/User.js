const mongoose = require('mongoose');
const connection = require('../libs/connection');
const crypto = require('crypto');
const config = require('config');

function removeProperties(...properties) {
  return function (doc, ret, options) {
    for (const prop of properties) {
      delete ret[prop];
    }
    return ret;
  };
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: 'Необходимо ввести имя пользователя',
  },
  email: {
    type: String,
    required: 'E-mail пользователя не должен быть пустым.',
    validate: [
      {
        validator(value) {
          return /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value);
        },
        message: 'Некорректный email.',
      },
    ],
    unique: 'Такой email уже существует',
  },
  verificationToken: {
    type: String,
    index: true,
  },
  password: {
    type: String,
    select: false
  },
  salt: {
    type: String,
    select: false,
  },
}, 
{
  timestamps: true,
  toObject: {
    transform: removeProperties('password', 'salt'),
  },
  toJSON: {
    transform: removeProperties('password', 'salt'),
  },
});

function generatePassword(salt, password) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password, salt,
      config.get('crypto.iterations'),
      config.get('crypto.length'),
      config.get('crypto.digest'),
      (err, key) => {
        if (err) return reject(err);
        resolve(key.toString('hex'));
      }
    );
  });
}

function generateSalt() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(config.get('crypto.length'), (err, buffer) => {
      if (err) return reject(err);
      resolve(buffer.toString('hex'));
    });
  });
}
/*
userSchema.pre("save", async function () {
  if (this.isModified('password')) {
    this.salt = await generateSalt();
    this.password = await generatePassword(this.salt, this.password);
  }
});*/
/*
  displayName: {
    type: String,
    required: 'У пользователя должно быть имя',
    unique: 'Такое имя уже существует',
  },*/

userSchema.methods.setPassword = async function setPassword(password) {
  this.salt = await generateSalt();
  this.password = await generatePassword(this.salt, password);
};

userSchema.methods.checkPassword = async function (password) {
  if (!password) return false;

  const hash = await generatePassword(this.salt, password);
  return hash === this.password;
};

module.exports = connection.model('User', userSchema);