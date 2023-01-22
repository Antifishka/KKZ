const fs = require('fs/promises')
const path = require('path');
const { uid } = require("uid");
require('colors');

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);
    console.table(contacts);
    console.log(`Total contacts: ${contacts.length}`.green);
    return contacts;
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);

    const contactById = contacts.find(contact => contact.id === contactId);
    console.table(contactById);
    return contactById;
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);

    const newContact = {
      id: uid(3),
      name,
      email,
      phone,
    };
    console.table(newContact);

    const newData = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newData, null, 2), 'utf8');
    console.log(`Contact ${name} successfully added.`.yellow);
    return newContact;
  } catch (error) {
    console.error(error);
  }
};

const deleteContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);

    const deletedContact = contacts.find(contact => contact.id === contactId);
    console.table(deletedContact);

    const contactsWithOutId = contacts.filter(contact => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(contactsWithOutId, null, 2), 'utf8');
    console.log(`Contact with id '${contactId}' successfully deleted.`.blue);
    return deletedContact;
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);

    const idx = contacts.findIndex((contact) => contact.id === contactId);
    if (idx === -1) {
      return null;
    }

    contacts[idx] = { id: contactId, ...body };
    console.table(contacts[idx]);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), 'utf8');
    console.log(`Contact with id '${contactId}' successfully updated.`.bgWhite);
    return contacts[idx];
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  deleteContact,
  addContact,
  updateContact,
};
