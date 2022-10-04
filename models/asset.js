import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  //countable: { type: Boolean, required: true }, // Mueble=true, Comida=false
});

schema.statics.seed = mongoose.seed

const model = mongoose.model("Asset", schema);

export { model, schema };
