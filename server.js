const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const app = express();

// Load Keys
const keys = require("./config/keys");
// Load Routes
const usersRoute = require("./routes/api/users");
const profileRoute = require("./routes/api/profile");
const postsRoute = require("./routes/api/posts");

// Connect To MongoDB
mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB is now connected"))
  .catch(err => console.log(err));

// body-parser Middlware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Passport Middlware
app.use(passport.initialize());

app.use("/api/users", usersRoute);
app.use("/api/profile", profileRoute);
app.use("/api/posts", postsRoute);

// if in production .. use static assets in react build folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`App is now listening to port ${port}`);
});

// Setup Socket.io with the running server
const io = require("socket.io")(server);

io.on("connection", socket => {
  console.log("Web Socket Established between that client and server");
  console.log(`Socket ID: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });

  socket.on("chat", data => {
    // Send this data to all connected browsers connected To Server .. (including typing user)
    // console.log(data.message);
    io.sockets.emit("chat", data);
  });

  // TODO .. typing .. Online

  socket.on("online", data => {
    // (including that typing user)
    io.sockets.emit("online", data);
  });
});
