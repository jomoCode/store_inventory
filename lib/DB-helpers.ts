import * as SQLite from 'expo-sqlite';
import { Product } from './types';

let db: SQLite.SQLiteDatabase | null = null;

async function initDB() {
  db = await SQLite.openDatabaseAsync('inventory.db');
  await db.execAsync(
    'CREATE TABLE IF NOT EXISTS products (id TEXT PRIMARY KEY NOT NULL, name TEXT, price TEXT, image TEXT);'
  );
}

async function getProductsFromDB(setProducts: React.Dispatch<React.SetStateAction<Product[]>>) {
  if (!db) return;
  const rows = await db.getAllAsync<Product>('SELECT * FROM products;');
  setProducts(rows);
}

async function insertProduct(product: Product, callback: () => void) {
  if (!db) return;
  await db.runAsync(
    'INSERT INTO products (id, name, price, image) VALUES (?, ?, ?, ?);',
    [product.id, product.name, product.price, product.image]
  );
  callback();
}

async function updateProduct(product: Product, callback: () => void) {
  if (!db) return;
  await db.runAsync(
    'UPDATE products SET name = ?, price = ?, image = ? WHERE id = ?;',
    [product.name, product.price, product.image, product.id]
  );
  callback();
}

async function deleteProduct(id: string, callback: () => void) {
  if (!db) return;
  await db.runAsync('DELETE FROM products WHERE id = ?;', [id]);
  callback();
}
export {deleteProduct, getProductsFromDB, insertProduct, updateProduct, initDB }