const { Contact } = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const data = await Contact.find({ owner }, "-createdAt iupdatedAt", {
    skip,
    limit,
  });
  res.json(data);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findById(contactId);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.json(data);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const contactData = await Contact.create({ ...req.body, owner });
  res.status(201).json(contactData);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const removedContact = await Contact.findByIdAndDelete(contactId);
  if (!removedContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.json(updatedContact);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.json(updatedContact);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
