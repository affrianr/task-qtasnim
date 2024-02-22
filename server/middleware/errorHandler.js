function errorHandler(error, req, res, next) {
  switch (error.name) {
    case "not_found":
      res.status(404).json({ message: "Data not Found" });
      break;
    case "nama_barang":
      res.status(400).json({ message: "Please input product name" });
      break;
    case "stok_barang":
      res.status(400).json({ message: "Please input product stock" });
      break;
    case "jumlah_terjual":
      res.status(400).json({ message: "Please input quantity sold" });
      break;
    case "tanggal_transaksi":
      res.status(400).json({ message: "Please input date of transaction" });
      break;
    case "jenis_barang":
      res.status(400).json({ message: "Please input product category" });
      break;
    case "stok_number":
      res.status(400).json({ message: "Product stock must be a number" });
      break;
    case "jumlah_number":
      res.status(400).json({ message: "Quantity sold must be a number" });
      break;
    case "tanggal_format":
      res.status(400).json({ message: "Invalid date format" });
    default:
      res.status(500).json({ message: "Interval Server Error" });
      break;
  }
}

module.exports = errorHandler;
