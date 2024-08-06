import { Search } from "../../../assets/icons"
import Hamburger from "../../../assets/icons/Hamburger"

const MarketSection3 = () => {
  return (
    <section className="flex flex-col mt-20">
      <div className="flex items-center justify-center gap-10 text-2xl xl:px-14">
        <div className="w-2/3 h-[43px] rounded-[30px] bg-[#777]/[0.2] placeholder:text-white placeholder:text-2xl flex items-center px-9">
          <label
            className="flex gap-3 text-xl text-white"
            htmlFor="search-input"
          >
            <div
              className="w-[25px] h-[23px] sm:hidden xl:block"
              aria-hidden="true"
            >
              <Search />
            </div>
            Search:
          </label>
          <input
            type="text"
            id="search-input"
            className="w-full h-full text-white bg-transparent outline-none"
            aria-label="Search"
          />
          <Hamburger />
        </div>
      </div>
      <div className="flex flex-col gap-24 mt-32">
        <div className="italic">
          <span className="text-5xl">
            HOT
            <span className="text-3xl">
              (Most Liked Contents in last 24hours)
            </span>
          </span>
          <div className="h-[500px] mt-20 bg-orange-300" />
        </div>
        <div>
          <span className="text-5xl italic">Best Seller</span>
          <div className="h-[500px] mt-20 bg-orange-300" />
        </div>
        <div>
          <span className="text-5xl italic">HOT Deals</span>
          <div className="h-[500px] mt-20 bg-orange-300" />
        </div>
      </div>

    </section>
  )
}

export default MarketSection3