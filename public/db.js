var request = window.indexedDB.open("pending", 3);
let db

request.onupgradeneeded = event => {
  
  const db = event.target.result;
  // Creates an object store with a listID keypath that can be used to query on.

  // Creates a statusIndex that we can query on.
  const toDoListStore = db.createObjectStore("pending");

}

request.onsuccess = function (event) {
  db = event.target.result
  if (navigator.onLine) {
    checkDatabase();
  }
};

request.onerror = function (event) {
  // log error here
  console.log(event)
};

function saveRecord(transaction) {
  // create a transaction on the pending db with readwrite access
  const transaction2 = db.transaction(["pending"],"readwrite")
  // access your pending object store
  const store = transaction2.objectStore("pending")
  // add record to your store with add method.
  store.add(transaction, "listID")
}

function checkDatabase() {
  // open a transaction on your pending db
  const transaction = db.transaction("pending","readwrite")
  // access your pending object store
  const store = transaction.objectStore("pending")
  // get all records from store and set to a variable
  const getAll = store.getAll()

getAll.onsuccess = function (event) {
  if (event.target.result.length > 0) {
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
          const transaction = db.transaction(["pending"],"readwrite")
          // access your pending object store
          const store = transaction.objectStore("pending")
          // clear all items in your store
          store.clear()
        });
    }
  };
}

// listen for app coming back online
window.addEventListener('online', checkDatabase);
