const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/index");

// We are using self executing Function
(async () => {
  try {
    await mongoose
      .connect(config.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("DB Connected Successfully");
      })
      .catch((error) => {
        console.log("database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
      });

    app.on("error", (error) => {
      console.log("Error: " + error);
      throw error;
    });
    app.listen(config.PORT, () => {
      console.log(`Server Listening on: ${config.PORT}`);
    });
  } catch (error) {
    console.log("Error:" + error);
    throw error;
  }
})();
