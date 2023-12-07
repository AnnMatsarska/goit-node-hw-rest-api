const express = require("express");
const contacts = require("../../models/contacts");
const router = express.Router();
const { HttpError } = require("../../helpers");
const Joi = require("joi");

const addScheme = Joi.object({
  name: Joi.string()
    .min(2)
    .max(30)
    .required()
    .messages({ "any.required": "missing required name field" }),
  email: Joi.string()
    .min(7)
    .max(30)
    .required()
    .messages({ "any.required": "missing required name field" }),
  phone: Joi.string()
    .min(7)
    .max(30)
    .required()
    .messages({ "any.required": "missing required name field" }),
});

router.get("/", async (req, res, next) => {
  try {
    const data = await contacts.listContacts();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await contacts.getContactById(contactId);
    if (!data) {
      throw HttpError(404, "Not found");
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

// router.delete("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

// router.put("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

module.exports = router;
