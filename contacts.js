const { v4: uuidv4 } = require('uuid')
const path = require('path')
const fs = require('fs').promises

const contactsPath = path.resolve('./db/contacts.json')

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error(error)
  }
}

async function getContactById(id) {
  try {
    const data = await listContacts()
    const contact = data.find((item) => item.id === id)
    return contact
  } catch (error) {
    console.error(error)
  }
}

async function removeContact(id) {
  try {
    const data = await listContacts()
    const deletedContact = data.find((item) => item.id === id)
    const filteredContacts = data.filter((item) => item.id !== id)
    if (!deletedContact) {
      return
    } else {
    }
    await fs.writeFile(
      contactsPath,
      JSON.stringify(filteredContacts, null, 2),
      'utf8'
    )
    return deletedContact
  } catch (error) {
    console.error(error)
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await listContacts()
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    }

    data.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2), 'utf8')

    return newContact
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}
