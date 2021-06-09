const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/datstructute1",{ useCreateIndex: true , useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("connection success");
}).catch((e) => {
    console.log(`not success connection : ${e}`);
})