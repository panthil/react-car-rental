const con = require("../config/database");
const table = require("../config/tables");
const utils = require("../common/utils");


exports.Registration = async (req, res) => {
  const requestData = req.body;
  const user = `SELECT Email FROM ${table.user} WHERE Email = '${requestData.Email}'`;
  con.query(user, (err, userResult) => {
    if (err) {
      return res.status(500).send({
        success: false,
        message: `Server internal Error!!!`,
        error: err,
      });
    }
    if (userResult.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Email already registered`,
      });
    }
    const sql =
      `INSERT INTO ${table.user} (FirstName, LastName, Email, Password, DateOfBirth, Gender, Address, Number)` +
      ` VALUES ('${requestData.FirstName}', '${requestData.LastName}', '${requestData.Email}', '${requestData.Password}', '${requestData.DateOfBirth}', '${requestData.Gender}', '${requestData.Address}', '${requestData.Number}')`;
    con.query(sql, (err, results) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: `Server Internal error`,
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
        status: 200,
        message: "create Account successfully",
        result: results,
      });
    });
  });
};


exports.userLogin = async (req, res) => {
  utils.check_request_params(
    req.body,
    [
      { name: "Email", type: "string" },
      { name: "Password", type: "string" },
    ],
    function (response) {
      if (response.success) {
        const postData = req.body;
        const sql = `SELECT * FROM ${table.user} WHERE Email='${postData.Email}'`;
        con.query(sql, async (err, results) => {
          if (err) {
            return res.status(401).send({
              success: false,
              message: `user not valid`,
              error: err,
            });
          }
          if (results.length > 0) {
            const pass = utils.cryptPassword(results[0].Password);
            const checkPass = await utils.comparePassword(
              postData.Password,
              pass,
              results[0]
            );
            // res.setHeader("auth", checkPass);
            return res.status(checkPass ? 200 : 400).send({
              success: checkPass ? true : false,
              status: checkPass ? 200 : 400,
              message: checkPass ? `Logged in succesfully` : "Invalid Password",
              result: checkPass ? results[0] : {},
              token: checkPass,
            });
          } else {
            return res.status(400).send({
              success: false,
              status: 400,
              message: "Invalid Email",
            });
          }
        });
      } else {
        res.json(response);
      }
    }
  );
};



