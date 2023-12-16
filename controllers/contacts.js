const Book = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAllContacts = async (req, res) => {
  const data = await Book.find();
  res.json(data);
};

// const getContactById = async (req, res) => {
//   const { contactId } = req.params;
//   const data = await contacts.getContactById(contactId);
//   if (!data) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(data);
// };

const addContact = async (req, res) => {
  const contactData = await Book.create(req.body);
  res.status(201).json(contactData);
};

// const deleteContact = async (req, res) => {
//   const { contactId } = req.params;
//   const removedContact = await contacts.removeContact(contactId);
//   if (!removedContact) {
//     throw HttpError(404, "Not found");
//   }
//   res.status(200).json({ message: "contact deleted" });
// };

// const updateContact = async (req, res) => {
//   const { contactId } = req.params;
//   const updatedContact = await contacts.updateContact(contactId, req.body);
//   if (!updatedContact) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(updatedContact);
// };

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  // getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  // deleteContact: ctrlWrapper(deleteContact),
  // updateContact: ctrlWrapper(updateContact),
};
