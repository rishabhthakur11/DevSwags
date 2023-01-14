const mongoose = require("mongoose");
const app = require("./app")
const config = require("./config/index");

// We are using self executing Function
(async ()=>{
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log("DB Connected Successfully");

        app.on("error", (error) => {
            console.log("Error: " + error);
            throw err;
          });
          app.listen(config.PORT, () => {
            console.log(`Server Listening on: ${config.PORT}`);
          });
        
    } catch (error) {
        console.log("Error:" + error);
        throw error
    }
})()