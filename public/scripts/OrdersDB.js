// OrderDB.js

let ordersDB;
const orderDbName = 'ordersDB';
const orderStoreName = 'ordersStore';
const orderDbVersion = 1;

const orderDbRequest = indexedDB.open(orderDbName, dbVersion);

orderDbRequest.onupgradeneeded = function (event) {
    ordersDB = event.target.result;
    if (!ordersDB.objectStoreNames.contains(orderStoreName)) {
        ordersDB.createObjectStore(orderStoreName, { keyPath: 'id', autoIncrement: true });
    }
};

orderDbRequest.onsuccess = function (event) {
    ordersDB = event.target.result;
    ordersDB.onerror = function (event) {
        console.error('Orders database error:', event.target.error);
    };
};

function addOrderToDB(order) {
    if (!ordersDB) return;
    const transaction = ordersDB.transaction([orderStoreName], 'readwrite');
    const store = transaction.objectStore(orderStoreName);
    store.add(order);
}

function getOrders(callback) {
    if (!ordersDB) {
        setTimeout(() => getOrders(callback), 100); // Retry after a delay
        return;
    }
    const transaction = ordersDB.transaction([orderStoreName], 'readonly');
    const store = transaction.objectStore(orderStoreName);
    const request = store.getAll();

    request.onsuccess = function () {
        callback(request.result);
    };
}