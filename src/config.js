module.exports = {
  PORT: process.env.PORT || 8000,
  API_ENDPOINT:
    process.env.NODE_ENV === "production"
      ? "https://ifeelthat-api.herokuapp.com/"
      : "http://localhost:8000/",
};
