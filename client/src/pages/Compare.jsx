import { useEffect, useState } from "react";
import axios from "../config/instance";
import { useNavigate } from "react-router-dom";

export default function Compare() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [time, setTime] = useState("");
  const [afterSort, setAfterSort] = useState(0);

  const fetchProduct = async () => {
    try {
      if (time) {
        console.log(time.sort);
        const { data } = await axios({
          url: `/product/compare?time=${time.sort}`,
          method: "GET",
        });
        setProducts(data);
      } else {
        const { data } = await axios({
          url: `/product/compare`,
          method: "GET",
        });
        setProducts(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [afterSort]);

  const handleSort = (e) => {
    const { name, value } = e.target;
    setTime({ ...time, [name]: value });
    setAfterSort(afterSort + 1);
  };
  return (
    <>
      <div className="container mx-auto min-h-screen w-auto flex flex-col justify-center items-center p-5">
        <div className="flex justify-between gap-5">
          <p>Urutkan:</p>
          <div className="">
            <select
              name="sort"
              id=""
              defaultValue={"default"}
              onChange={handleSort}
            >
              <option value="default" disabled></option>
              <option value="all">Kapanpun</option>
              <option value="this week">Minggu ini</option>
              <option value="this month">Bulan ini</option>
            </select>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg p-5">
              <table className="table text-md text-left text-gray-500 dark:text-gray-400">
                <thead className=" text-sm text-gray-700 uppercase bg-gray-50 ">
                  <tr className="">
                    <th scope="col" className="py-3 px-6">
                      No
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Jenis Barang
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Total Transaksi
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {products?.map((product, index) => {
                    return (
                      <tr className="">
                        <td className="py-4 px-6">{index + 1}</td>
                        <td className="py-4 px-6">{product.jenis_barang}</td>
                        <td className="py-4 px-6">{product.count}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <button
          className="mt-5 px-3 bg-blue-300 rounded-md"
          onClick={() => navigate("/")}
        >
          Kembali
        </button>
      </div>
    </>
  );
}
