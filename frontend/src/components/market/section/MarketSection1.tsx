import Ex1 from "../../../assets/generate/imgSelect/Ex1"
import Heart from "../../../assets/market/Heart";
import { useUserStore } from "../../../store/useUserStore";
import Avatar from "../../common/Avatar"


const MarketSection1 = () => {
  const { user } = useUserStore();
  return (
    <section className="flex gap-5 px-5 py-5 border-2 bg-third rounded-[44px]">
        <div className="flex-1">
          <Ex1 />
        </div>
        <div className="flex flex-col flex-1 gap-10">
          <span className="text-4xl text-center 2xl:text-5xl">ELK MAN WITH FOUR HORNS</span>
          <div className="flex items-center justify-between text-xl">
            <div className="flex items-center gap-2">
              <div className="w-[50px] flex items-center">
                <Avatar img={user?.profileImg} />
              </div>
              <span>Macallan Craigellachie</span>
            </div>
            <span>0.792 ETH</span>
          </div>
          <p>DESCRIPTION this is an example of a description. Users can provide details about their artwork, such as the intention behind it, the appeal of their 3D assets, and relevant keywords. </p>
          <p>#Animal #Personify #Monster #Horn #Elk #Man
            #MacallanCraigellachie</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart />
              <span>513,597</span>
            </div>
            <button className="px-10 py-4 rounded-xl bg-eight text-second">Purchase</button>
          </div>
        </div>
      </section>
  )
}

export default MarketSection1