import { useEffect, useState } from "react";
import axios from "../config/instance";
import SearchBar from "../component/SearchBar";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortName, setSortName] = useState("");
  const [sortDate, setSortDate] = useState("");
  const [afterSort, setAfterSort] = useState(0);
  const [afterDelete, setAfterDelete] = useState(0);

  const fetchProduct = async () => {
    try {
      if (search) {
        // console.log(search);
        const { data } = await axios({
          url: `/product?search=${search}`,
          method: "GET",
        });
        setProducts(data);
      } else if (sortName) {
        const { data } = await axios({
          url: `/product?sort=${sortName.sort}`,
          method: "GET",
        });
        setProducts(data);
      } else if (sortDate) {
        const { data } = await axios({
          url: `/product?sort=${sortDate.sort}`,
          method: "GET",
        });
        setProducts(data);
      } else {
        const { data } = await axios({
          url: `/product`,
          method: "GET",
        });
        setProducts(data);
      }
    } catch (error) {
      console.log(error);
    }
    //   console.log(data, "<< data product");
  };

  useEffect(() => {
    fetchProduct();
  }, [search, afterSort, afterDelete]);

  const handleSortName = (e) => {
    const { name, value } = e.target;
    setSortName({ ...sortName, [name]: value });
    setAfterSort(afterSort + 1);
  };

  const handleSortDate = (e) => {
    const { name, value } = e.target;
    setSortDate({ ...sortDate, [name]: value });
    setAfterSort(afterSort + 1);
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios({
        url: `/product/${id}`,
        method: "DELETE",
      });
      console.log(data);
      setAfterDelete(afterDelete + 1);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container mx-auto min-h-screen w-auto flex flex-col justify-center items-center p-5">
        <div className="m-5 w-[50%]">
          <SearchBar setSearch={setSearch} />
        </div>
        <div className="flex justify-between gap-5">
          <p>Urutkan Nama:</p>
          <div className="">
            <select
              name="sort"
              id=""
              defaultValue={"default"}
              onChange={handleSortName}
            >
              <option value="default" disabled></option>
              <option value="nama_barang">A-Z</option>
              <option value="-nama_barang">Z-A</option>
            </select>
          </div>
          <p>Urutkan Tanggal:</p>
          <div>
            <select
              name="sort"
              id=""
              defaultValue={"default"}
              onChange={handleSortDate}
            >
              <option value="default" disabled></option>
              <option value="tanggal_transaksi">Terlama</option>
              <option value="-tanggal_transaksi">Terbaru</option>
            </select>
          </div>
          <button
            className="px-4 bg-blue-300 rounded-md"
            onClick={() => navigate("/compare")}
          >
            Bandingkan
          </button>
        </div>
        <div class="flex items-center justify-center">
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg p-5">
              <table className="table text-md text-left text-gray-500 dark:text-gray-400">
                <thead className=" text-sm text-gray-700 uppercase bg-gray-50 ">
                  <tr className="">
                    <th scope="col" className="py-3 px-6">
                      No
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Nama Barang
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Stok
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Jumlah Terjual
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Tanggal Transaksi
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Jenis Barang
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {products?.map((product, index) => {
                    return (
                      <tr className="">
                        <td className="py-4 px-6">{index + 1}</td>
                        <td className="py-4 px-6">{product.nama_barang}</td>
                        <td className="py-4 px-6">{product.stok_barang}</td>
                        <td className="py-4 px-6">{product.jumlah_terjual}</td>
                        <td className="py-4 px-6">
                          {product.tanggal_transaksi.split("T")[0]}
                        </td>
                        <td className="py-4 px-6">{product.jenis_barang}</td>
                        <td className="">
                          <button
                            className="p-2 rounded-md bg-blue-300"
                            onClick={() => navigate(`/edit/${product.id}`)}
                          >
                            Edit
                          </button>
                          <button
                            className="p-2 rounded-md bg-red-400"
                            onClick={() => handleDelete(product.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
