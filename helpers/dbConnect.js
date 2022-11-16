import mongoose from "mongoose";

function dbConnect() {
  if (mongoose.connections[0].readyState) {
    console.log("already connected");
    return;
  }
  mongoose.connect(process.env.MONGODB_URI, {
    useNewURlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on("connected", () => {
    console.log("Connected to mongo");
  });
  mongoose.connection.on("error", (err) => {
    console.log("error connecting to mongo", err);
  });
}
export default dbConnect;
