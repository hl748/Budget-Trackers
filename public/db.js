const fs = require("fs")
const util = require("util")
const mongoose = require("mongoose")


request.onsuccess = function (event) {
  db = event.target.result;

  if (navigator.onLine) {
    checkDatabase();
  }
};

request.onerror = function (event) {
  // log error here
  console.log(event)
};

function saveRecord(record) {
  // create a transaction on the pending db with readwrite access
  const transaction = db.transaction(["pending"],"readwrite")
  // access your pending object store
  const store = transaction.objectStore("pending")
  // add record to your store with add method.
  store.add({ listID: "1", store: record})
}

function checkDatabase() {
  // open a transaction on your pending db
  db.indexedDB.open("pending",1)
  // access your pending object store
  const store = transaction.objectStore("pending")
  // get all records from store and set to a variable
  const records = store.getAll()

getAll.onsuccess = function () {
  if (getAll.result.length > 0) {
    fetch('/api/transaction/bulk', {
      method: 'POST',
      body: JSON.stringify(getAll.result),
      headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      },
      })
        .then((response) => response.json())
        .then(() => {
          // if successful, open a transaction on your pending db
          transaction.open()
          // access your pending object store
          const store = transaction.objectStore("pending")
          // clear all items in your store
          transaction.clear();
        });
    }
  };
}

// listen for app coming back online
window.addEventListener('online', checkDatabase);
