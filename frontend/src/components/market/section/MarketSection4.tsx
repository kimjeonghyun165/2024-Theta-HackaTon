import { useState } from "react";

const MarketSection4 = () => {
  const sortArr = ["Trending", "Top", "Watchlist"];
  const itmeKinds = ["Assets", "Contents"];
  const timeArr = ["1h", "6h", "24h", "7d", "30d", "All"];
  const tableRow =["Rank","Name of the Project", "Volume", "Floor Price", "Sales","Created By"];
  const [sort, setSort] = useState("Trending");
  const [itemKind, setItemKind] = useState("Assets");
  const [time, setTime] = useState("1h");


  return (
    <section className="flex flex-col gap-20">
      <span className="text-5xl text-center">Ranking</span>
      <div className="flex justify-between gap-5">
        <div className="flex gap-5 overflow-hidden bg-eight rounded-2xl">
          {sortArr.map((item) => <button className={`px-2 py-3 ${item === sort ? "#77777733" : "bg-orange-500"} rounded-2xl`} onClick={() => setSort(item)}>{item}</button>)}
        </div>
        <div className="flex gap-3 overflow-hidden bg-eight rounded-2xl">
          {itmeKinds.map((item) => <button className={`px-2 py-3 ${item === itemKind ? "#77777733" : "bg-orange-500"} rounded-2xl`} onClick={() => setItemKind(item)}>{item}</button>)}
        </div>
        <div className="flex gap-5 overflow-hidden bg-eight rounded-2xl">
          {timeArr.map((item) => <button className={`px-2 py-3 ${item === time ? "#77777733" : "bg-orange-500"} rounded-2xl`} onClick={() => setTime(item)}>{item}</button>)}
        </div>
      </div>
      <table>
        <tr >
          {tableRow.map((row) => <th scope="col" className="font-extralight">{row}</th>)}
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
      
    </section>
  )
}

export default MarketSection4