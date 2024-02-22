class ProductClass {
  constructor(
    id,
    nama_barang,
    stok_barang,
    jumlah_terjual,
    tanggal_transaksi,
    jenis_barang
  ) {
    this.id = id;
    this.nama_barang = nama_barang;
    this.stok_barang = stok_barang;
    this.jumlah_terjual = jumlah_terjual;
    this.tanggal_transaksi = tanggal_transaksi;
    this.jenis_barang = jenis_barang;
  }
}

module.exports = { ProductClass };
