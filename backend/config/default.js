module.exports = {
  app: {
    host: process.env.HOST || "0.0.0.0",
    port: parseInt(process.env.PORT || 4000)
  },
  mongodb: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/recipes"
  },
  crypto: {
    iterations: process.env.NODE_ENV === "test" ? 1 : 12000,
    length: 128,
    digest: "sha512"
  },
  auth: {
    salt: "salt",
    userSaltLength: 20,
    iterations: 1,
    hashLength: 64,
    hashAlgorithm: "sha512",
    github: {
      clientId: "asf",
      secret: "asdf"
    },
    jwt: {
      algorithm: "HS256",
      secret: "secret",
      expiresIn: "5m"
    },
    refreshToken: {
      expiresIn: "30d"
    }
  },
  smtp: {
    host: "smtp.ethereal.email",
    port: "587",
    auth: {
      user: "kayley.collier92@ethereal.email",
      pass: "XYrVdPs6cbfJRRVA6Y"
    }
  }
};
