const pool = require("./connection");

(async () => {
  try {
    let queryCreateTableProduct = `
            CREATE TABLE IF NOT EXISTS "Product" (
                id SERIAL PRIMARY KEY,
                nama_barang VARCHAR NOT NULL,
                stok_barang INTEGER NOT NULL,
                jumlah_terjual INTEGER NOT NULL,
                tanggal_transaksi DATE NOT NULL DEFAULT CURRENT_DATE,
                jenis_barang VARCHAR NOT NULL
            )
        `;

    let dropTable = `
            DROP TABLE IF EXISTS "Product"
        `;

    await pool.query(dropTable);
    await pool.query(queryCreateTableProduct);

    console.log("SUCCESS CREATE TABLE");
  } catch (error) {
    console.log(error);
    console.log("SETUP ERROR");
  }
})();
