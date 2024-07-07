// IndexedDB.js

let db;
const dbName = 'cartDB';
const storeName = 'cartStore';
const dbVersion = 1;
const dbRequest = indexedDB.open(dbName, dbVersion);

dbRequest.onupgradeneeded = function (event) {
    const db = event.target.result;
    if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id' });
    }
};

dbRequest.onsuccess = function (event) {
    db = event.target.result;
    db.onerror = function (event) {
        console.error('Database error:', event.target.error);
    };
};

function addToCartDB(product) {
    if (!db) return;
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    store.put(product);
}

function removeFromCartDB(productId) {
    if (!db) return;
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    store.delete(productId);
}

function clearCartDB() {
    if (!db) return;
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    store.clear();
}

function getCartProductsDB(callback) {
    if (!db) {
        setTimeout(() => getCartProductsDB(callback), 100); // Retry after a delay
        return;
    }
    const transaction = db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = function () {
        callback(request.result);
    };
}

function updateCartProductDB(product) {
    if (!db) return;
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    store.put(product);
}

function getCartSummary(callback) {
    if (!db) {
        setTimeout(() => getCartSummary(callback), 100); // Retry after a delay
        return;
    }
    const transaction = db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = function () {
        const cartProducts = request.result;
        const summary = cartProducts.reduce((acc, product) => {
            acc.subtotal += product.price * product.quantity;
            return acc;
        }, { subtotal: 0, shipping: 0, total: 0 });

        summary.shipping = summary.subtotal > 0 && summary.subtotal < 1000 ? 30 : 0;
        summary.total = summary.subtotal + summary.shipping;

        callback(summary);
    };
}