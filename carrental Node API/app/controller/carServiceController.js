const con = require("../config/database");
const table = require("../config/tables");
const utils = require("../common/utils");

exports.AddProduct = async (req, res) => {
  const requestData = req.body;
  var image_file = req.files;

  if (image_file != undefined && image_file.length > 0) {
    var image_name = req.files[0].originalname;
    var url =
      utils.getStoreImageFolderPath(FOLDER_NAME.USER_PROFILES) +
      image_name;
    requestData.image = url;
    utils.storeImageToFolder(
      image_file[0].path,
      image_name,
      FOLDER_NAME.USER_PROFILES,
    );
  }
  const sql =
    `INSERT INTO ${table.car} (image, name, modal, price, category)` +
    ` VALUES ('${requestData.image}','${requestData.name}', '${requestData.modal}', '${requestData.price}',  '${requestData.category}')`;
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
      message: "Car Add successfully",
      result: results,

    });
  });
};

exports.ProductDetail = async (req, res) => {
  // const requestData = req.body;

  let sql = `SELECT * FROM ${table.car} WHERE category="${req.body.category}" ORDER BY id desc`;

  con.query(sql, (err, results) => {
    if (err) {
      return res.status(400).send({
        success: false,
        message: `Server Internal error`,
        error: err,
      });
    }

    return res.status(200).send({
      success: true,
      status: 200,
      message: "Product detail",
      result: results,
    });
  });
};

exports.updateDetail = async (req, res) => {
  // const requestData = req.body;
  let sql;
  if (req.body.status) {
    sql = `Update  ${table.servicebooking} SET Status="${req.body.status}" WHERE id="${req.body.id}"`;

  } else {
    sql = `Update  ${table.servicebooking} SET payment_status="${req.body.payment_status}",razorpay_payment_id="${req.body.razorpay_payment_id}" WHERE id="${req.body.id}"`;

  }
  con.query(sql, (err, results) => {
    if (err) {
      return res.status(400).send({
        success: false,
        message: `Server Internal error`,
        error: err,
      });
    }

    return res.status(200).send({
      success: true,
      status: 200,
      message: "Product detail",
      result: results,
    });
  });
};


exports.AddBooking = async (req, res) => {
  const requestData = req.body;
  const sql1 = `Update  ${table.car} SET status="UnAvailable" WHERE id="${req.body.carid}"`;

  con.query(sql1, (err, results1) => {

    const sql =
      `INSERT INTO ${table.booking} (user_id,carImage,carid, DateFrom, DateTo, FirstName, LastName,Email,Number,Carname,price,modal)` +
      ` VALUES ('${requestData.user_id}','${requestData.carImage}','${requestData.carid}','${requestData.DateFrom}', '${requestData.DateTo}', '${requestData.FirstName}',  '${requestData.LastName}',  '${requestData.Email}',  '${requestData.Number}',  '${requestData.Carname}',  '${requestData.price}',  '${requestData.modal}')`;
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
        message: "Car Add successfully",
        result: results,

      });
    });
  });
};

exports.updateBooking = async (req,res)=>{
  const sql1 = `Update  ${table.booking} SET payment_status="Success" , razorpay_payment_id = "${req.body.razorpay_payment_id}" WHERE id="${req.body.id}"`;

  con.query(sql1, (err, results1) => {
    return res.status(200).send({
      success: true,
      status: 200,
      message: "Product detail",
      result: results1,
    });
 
  });
}

exports.RecentBookingDetail = async (req, res) => {
  // const requestData = req.body;
  let sql
  if (req.body.user_id !== "1") {
    sql = `SELECT * FROM ${table.booking} WHERE user_id="${req.body.user_id}"  ORDER BY id desc`;

  } else {
    sql = `SELECT * FROM ${table.booking} ORDER BY id desc`;

  }

  con.query(sql, (err, results) => {
    if (err) {
      return res.status(400).send({
        success: false,
        message: `Server Internal error`,
        error: err,
      });
    }

    return res.status(200).send({
      success: true,
      status: 200,
      message: "Product detail",
      result: results,
    });
  });
};


exports.UpdateStatus = async (req, res) => {
  // const requestData = req.body;
   
   let  sql = `UPDATE ${table.car} SET  status = "${req.body.status}" WHERE id="${req.body.id}" `;

  
  con.query(sql, (err, results) => {
    if (err) {
      return res.status(400).send({
        success: false,
        message: `Server Internal error`,
        error: err,
      });
    }

    return res.status(200).send({
      success: true,
      status: 200,
      message: "Product detail",
      result: results,
    });
  });
};