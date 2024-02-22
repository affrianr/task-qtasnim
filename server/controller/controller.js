const pool = require("../config/connection");
const Product = require("../models/product");

class Controller {
  static async getProduct(req, res, next) {
    try {
      let { search, sort } = req.query;
      let dataProduct = await Product.findAll(search, sort);
      res.status(200).json(dataProduct);
    } catch (error) {
      console.log(error);
    }
  }

  static async getProductById(req, res, next) {
    try {
      let { id } = req.params;
      let dataProduct = await Product.findOne(id);
      if (!dataProduct) {
        throw { name: "not_found" };
      }
      res.status(200).json(dataProduct);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async addProdcut(req, res, next) {
    try {
      let {
        nama_barang,
        stok_barang,
        jumlah_terjual,
        tanggal_transaksi,
        jenis_barang,
      } = req.body;
      console.log(req.body);

      if (!nama_barang) {
        throw { name: "nama_barang" };
      }
      if (!stok_barang) {
        throw { name: "stok_barang" };
      }
      if (!jumlah_terjual) {
        throw { name: "jumlah_terjual" };
      }
      if (!tanggal_transaksi) {
        throw { name: "tanggal_transaksi" };
      }
      if (!jenis_barang) {
        throw { name: "jenis_barang" };
      }
      if (stok_barang) {
        if (isNaN(+stok_barang)) {
          throw { name: "stok_number" };
        }
      }
      if (jumlah_terjual) {
        if (isNaN(+jumlah_terjual)) {
          throw { name: "jumlah_number" };
        }
      }
      if (tanggal_transaksi) {
        if (isNaN(Date.parse(tanggal_transaksi))) {
          throw { name: "tanggal_format" };
        }
      }
      let result = await Product.create(
        nama_barang,
        +stok_barang,
        +jumlah_terjual,
        tanggal_transaksi,
        jenis_barang
      );
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async updateProduct(req, res, next) {
    try {
      let {
        nama_barang,
        stok_barang,
        jumlah_terjual,
        tanggal_transaksi,
        jenis_barang,
      } = req.body;

      let { id } = req.params;

      // if (!nama_barang) {
      //   throw { name: "nama_barang" };
      // }
      // if (!stok_barang) {
      //   throw { name: "stok_barang" };
      // }
      // if (!jumlah_terjual) {
      //   throw { name: "jumlah_terjual" };
      // }
      // if (!tanggal_transaksi) {
      //   throw { name: "tanggal_transaksi" };
      // }
      // if (!jenis_barang) {
      //   throw { name: "jenis_barang" };
      // }
      // if (stok_barang) {
      //   if (isNaN(+stok_barang)) {
      //     throw { name: "stok_number" };
      //   }
      // }
      // if (jumlah_terjual) {
      //   if (isNaN(+jumlah_terjual)) {
      //     throw { name: "jumlah_number" };
      //   }
      // }
      // if (tanggal_transaksi) {
      //   if (isNaN(Date.parse(tanggal_transaksi))) {
      //     throw { name: "tanggal_format" };
      //   }
      // }

      let result = await Product.update(
        nama_barang,
        +stok_barang,
        +jumlah_terjual,
        tanggal_transaksi,
        jenis_barang,
        +id
      );

      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      let { id } = req.params;

      let result = await Product.delete(+id);
      console.log(result, ">>>>>>>");

      res.status(200).json({ message: "Product has been removed" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
