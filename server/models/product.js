const pool = require("../config/connection");
const { ProductClass } = require("./class");

class Model {
  static async findAll(search, sort) {
    try {
      let query = `
            SELECT * FROM  "Product"`;
      if (search) {
        query += `WHERE nama_barang ILIKE '%${search}%'`;
      }

      if (!sort) {
        query += `ORDER BY id ASC`;
      }

      if (sort !== "" && typeof sort !== "undefined") {
        if (sort.charAt(0) !== "-") {
          query += `ORDER BY ${sort} ASC`;
        } else {
          query += `ORDER BY ${sort.slice(1)} DESC`;
        }
      }

      let { rows } = await pool.query(query);
      let data = rows.map((el) => {
        return new ProductClass(
          el.id,
          el.nama_barang,
          el.stok_barang,
          el.jumlah_terjual,
          el.tanggal_transaksi,
          el.jenis_barang
        );
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async findOne(id) {
    try {
      let query = `
        SELECT * FROM "Product"
        WHERE id = $1
      `;

      let { rows } = await pool.query(query, [+id]);

      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async compare(time) {
    try {
      let query = "";
      console.log(time);
      if (!time || time == "all") {
        query = `
          SELECT jenis_barang, COUNT(tanggal_transaksi) FROM "Product"
          GROUP BY jenis_barang
        `;
      }
      if (time == "this week") {
        query = `
          SELECT jenis_barang, COUNT(tanggal_transaksi) FROM "Product"
          WHERE tanggal_transaksi >= '2021-05-24' and tanggal_transaksi <= '2021-05-31'
          GROUP BY jenis_barang
        `;
      }
      if (time == "this month") {
        query = `
          SELECT jenis_barang, COUNT(tanggal_transaksi) FROM "Product"
          WHERE tanggal_transaksi >= '2021-05-01' and tanggal_transaksi <= '2021-05-31'
          GROUP BY jenis_barang
        `;
      }

      let { rows } = await pool.query(query);
      console.log(rows);
      return rows;
    } catch (error) {
      console.log(err);
      throw error;
    }
  }

  static async create(
    nama_barang,
    stok_barang,
    jumlah_terjual,
    tanggal_transaksi,
    jenis_barang
  ) {
    try {
      console.log(
        stok_barang,
        jumlah_terjual,
        tanggal_transaksi,
        "<< di model"
      );
      let query = `
        INSERT INTO "Product" (nama_barang, stok_barang, jumlah_terjual, tanggal_transaksi, jenis_barang)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `;

      const { rows } = await pool.query(query, [
        nama_barang,
        stok_barang,
        jumlah_terjual,
        tanggal_transaksi,
        jenis_barang,
      ]);

      return rows[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async update(
    nama_barang,
    stok_barang,
    jumlah_terjual,
    tanggal_transaksi,
    jenis_barang,
    id
  ) {
    try {
      let query = `
        UPDATE "Product"
        SET 
          nama_barang = $1,
          stok_barang = $2,
          jumlah_terjual = $3,
          tanggal_transaksi = $4,
          jenis_barang = $5
        WHERE id = $6
        RETURNING *
      `;

      const { rows } = await pool.query(query, [
        nama_barang,
        stok_barang,
        jumlah_terjual,
        tanggal_transaksi,
        jenis_barang,
        +id,
      ]);

      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      let query = `
        DELETE FROM "Product"
        WHERE id = $1
        RETURNING *
      `;

      const { rows } = await pool.query(query, [+id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Model;
