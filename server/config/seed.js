const pool = require("./connection");
const fs = require("fs/promises");

(async () => {
  try {
    let dataProduct = await fs.readFile("../data/product.json");
    dataProduct = JSON.parse(dataProduct);
    dataProduct = dataProduct.map((el) => {
      console.log(el.tanggal_transaksi);
      let date = el.tanggal_transaksi.split("-");
      let newDate = date[2] + "/" + date[1] + "/" + date[0];
      console.log(newDate);
      return `('${el.nama_barang}', '${el.stok_barang}', '${el.jumlah_terjual}', '${newDate}', '${el.jenis_barang}')`;
    });

    let queryInsert =
      `
        INSERT INTO "Product" (nama_barang, stok_barang, jumlah_terjual, tanggal_transaksi, jenis_barang)
        VALUES
    ` + dataProduct;

    await pool.query(queryInsert);

    console.log("SEEDING SUCCESS");
  } catch (error) {
    console.log(error);
    console.log("SEEDING ERROR");
  }
})();
