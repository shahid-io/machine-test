const express = require("express");
const { StatusCodes } = require("http-status-codes");
const apiRoutes = require("./routes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.status(StatusCodes.OK).json({
    success: true,
    message: "UP",
  });
});

app.listen(3000, async () => {
  console.log("Server is serving at http://localhost:3000");
  // const { User } = require("./models");
  // const user = await User.findByPk(1);
  // const email = "shahid@gmail.com";
  // const user2 = await User.findOne({
  //   where: {
  //     email: "anand@gmail.com",
  //     password: "Hello@123"
  //   },
  // });
  
  // console.log(user2);
});
