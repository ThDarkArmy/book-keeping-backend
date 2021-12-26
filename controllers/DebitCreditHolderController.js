import DebitCreditHolder from "../model/DebitCreditHolder";
import createError from "http-errors";

// get all debitCreditHolder
export const getAllDebitCreditHolder = async (req, res, next) => {
  try {
    const debitCreditHolders = await DebitCreditHolder.find({
      user: req.user.id,
    }).populate("transactions", "-__v");

    // console.log(debitCreditHolders)
    let custData = [];
    for (const i in debitCreditHolders) {
      let amount = 0;
      for (const j in debitCreditHolders[i].transactions) {
        if (debitCreditHolders[i].transactions[j].type === "DEBIT") {
          amount = amount - debitCreditHolders[i].transactions[j].amount;
        } else {
          amount = amount + debitCreditHolders[i].transactions[j].amount;
        }
      }

      const cData = {
        name: debitCreditHolders[i].name,
        mobile: debitCreditHolders[i].mobile,
        amount: amount,
        _id: debitCreditHolders[i]._id,
        type: amount >= 0 ? "DEBIT" : "CREDIT",
      };

      custData.push(cData);
    }
    res.status(200).json({
      success: true,
      message: "All transactions",
      body: custData,
    });
  } catch (err) {
    next(err);
  }
};

// create a debitCreditHolder
export const createDebitCreditHolder = async (req, res, next) => {
  try {
    const { name, mobile } = req.body;
    let debitCreditHolder = await DebitCreditHolder.findOne({
      mobile: mobile,
      user: req.user.id,
    });
    if (debitCreditHolder)
      throw createError.BadRequest("Debit or Credit holder already exists");

    debitCreditHolder = await new DebitCreditHolder({
      name,
      mobile,
      user: req.user.id,
    });

    await debitCreditHolder.save();

    res.status(201).json({
      success: true,
      message: "DebitCredtHolder created successfully",
      body: debitCreditHolder,
    });
  } catch (err) {
    next(err);
  }
};

// update a debitCreditHolder
export const updateDebitCreditHolder = async (req, res, next) => {
  try {
    let debitCreditHolder = await DebitCreditHolder.findById(req.params.id);
    if (!debitCreditHolder)
      throw createError.BadRequest("Debit or Credit holder does not exists");

    const { name, mobile } = req.body;

    debitCreditHolder.name = name;
    debitCreditHolder.mobile = mobile;

    await debitCreditHolder.save();

    res.status(201).json({
      success: true,
      message: "DebitCredtHolder updated successfully",
      body: debitCreditHolder,
    });
  } catch (err) {
    next(err);
  }
};

// delete a debitCreditHolder
export const deleteDebitCreditHolder = async (req, res, next) => {
  try {
    await DebitCreditHolder.findByIdAndDelete(req.params.id);
    res.status(201).json({
      success: true,
      message: "DebitCredtHolder deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
