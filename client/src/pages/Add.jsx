import { useState } from "react";
import axios from "../config/instance";
import { redirect, useNavigate } from "react-router-dom";

export default function Add() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nama_barang: "",
    stok_barang: "",
    jumlah_terjual: "",
    tanggal_transaksi: "",
    jenis_barang: "",
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios({
        url: "/product",
        method: "POST",
        data: {
          nama_barang: form.nama_barang,
          stok_barang: form.stok_barang,
          jumlah_terjual: form.jumlah_terjual,
          tanggal_transaksi: form.tanggal_transaksi,
          jenis_barang: form.jenis_barang,
        },
      });
      console.log(data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }
  function handleSelect(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }
  return (
    <>
      <div className="antialiased text-gray-900 px-6 flex flex-col ml-10 ">
        <div className="max-w-xl pt-12 divide-y md:max-w-4xl ">
          <div className="py-8">
            <h1 className="text-4xl font-bold">Tambahkan Data Transaksi</h1>
          </div>
        </div>
        <div className="py-12">
          <form onSubmit={handleSubmit}>
            <div className="mt-8 max-w-md flex flex-col justify-center">
              <label className="block">
                <span className="text-gray-700">Nama Barang</span>
                <input
                  type="text"
                  className="mt-1 block w-full"
                  name="nama_barang"
                  onChange={handleChange}
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Stok Barang</span>
                <input
                  type="number"
                  className="mt-1 block w-full"
                  name="stok_barang"
                  onChange={handleChange}
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Jumlah Terjual</span>
                <input
                  type="number"
                  className="mt-1 block w-full"
                  name="jumlah_terjual"
                  onChange={handleChange}
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Tanggal Transaksi</span>
                <input
                  type="date"
                  className="form-input mt-1 block w-full"
                  name="tanggal_transaksi"
                  onChange={handleChange}
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Jenis Barang</span>
                <select
                  id=""
                  className="block w-full mt-1"
                  name="jenis_barang"
                  defaultValue={"Default"}
                  onChange={handleChange}
                >
                  <option disabled value="Default">
                    Pilih jenis
                  </option>
                  <option value="Konsumsi">Konsumsi</option>
                  <option value="Pembersih">Pembersih</option>
                </select>
              </label>
              <button className="p-2 mt-5 rounded-md bg-blue-400" type="submit">
                Tambahkan
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
