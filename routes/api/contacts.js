const express = require("express");
const contacts = require("../../models/contacts");
const router = express.Router();
const { HttpError } = require("../../helpers");
const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .required()
    .messages({ "any.required": "missing required name field" }),
  email: Joi.string()
    .min(6)
    .required()
    .messages({ "any.required": "missing required email field" }),
  phone: Joi.string()
    .min(8)
    .required()
    .messages({ "any.required": "missing required phone field" }),
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
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const contactData = await contacts.addContact(req.body);
    res.status(201).json(contactData);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removedContact = await contacts.removeContact(contactId);
    if (!removedContact) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const updatedContact = await contacts.updateContact(contactId, req.body);
    if (!updatedContact) {
      throw HttpError(404, "Not found");
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
