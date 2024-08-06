import { useRef, useState } from "react";
import { Edit, Search } from "../../../assets/icons";
import { Model } from "../../../store/useModelStore";
import { useFetchModels } from "../../../hooks/tanstackQuery/useModelApi";

const EditProfileModelButton = () => {
  const [clickedBox, setClickedBox] = useState<number>(0);
  const modalRef = useRef<HTMLDialogElement>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error, isError } = useFetchModels(4);
  const openModal = () => {
    if (modalRef.current === null) return;
    modalRef.current.showModal();
  };

  const closeModal = () => {
    if (modalRef.current === null) return;
    modalRef.current.close();
  };
  const handleClick = (num: number) => {
    setClickedBox(num);
  };

  const handleScroll = async (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const bottom =
      target.scrollHeight - target.scrollTop === target.clientHeight;
    if (bottom && hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <>
      <button
        className="w-[33px] h-[33px] absolute top-3 right-6 bg-transparent"
        onClick={openModal}
      >
        <Edit />
      </button>
      <dialog
        ref={modalRef}
        className="backdrop:bg-[#030408]  rounded-[87px] py-12 px-28 w-4/5"
        onClick={(e) => {
          if (e.target === modalRef.current) closeModal();
        }}
        style={{
          background:
            "linear-gradient(180deg, rgba(208, 208, 208, 0.25) 0%, rgba(106, 106, 106, 0.5) 100%)",
        }}
      >
        <section>
          <h2 className="relative text-3xl font-bold pl-9 text-second">
            PROFILE ASSET SELECTION
            <button onClick={closeModal} className="absolute right-0 w-12 h-12 text-4xl rounded-full bg-eight">X</button>
          </h2>
          <div className="flex justify-between px-5 mt-10 text-2xl">
            <div className="w-2/3 rounded-[30px] bg-[#777]/[0.2] placeholder:text-white placeholder:text-2xl flex items-center px-5 gap-3 py-3">
              <div className="w-[29px] h-[27px]">
                <Search />
              </div>
              <span className="text-2xl text-white">Search:</span>
              <input
                type="text"
                className="text-white bg-transparent outline-none"
              />
            </div>
            <button className="mr-10 text-white">Recent ▼</button>
          </div>
          <div
            className="max-w-[1575px] max-h-[500px] overflow-y-scroll grid grid-cols-2 2xl:grid-cols-4 gap-y-14 mt-10 myPage-scrollbar"
            onScroll={handleScroll}
          >
            {data?.pages.map((page) =>
              page.map((model: Model, index: number) => (
                <button
                  key={index}
                  className={`w-[293px] h-[293px] rounded-[30px] flex flex-col justify-between items-center p-6 mx-auto ${clickedBox === index ? "" : "bg-[#777777]/[0.2]"
                    }`}
                  style={{
                    background:
                      clickedBox === index
                        ? "linear-gradient(134.8deg, #A2B0FF 3.08%, #616A99 59.2%, #616A99 79.65%, #616A99 100%)"
                        : undefined,
                  }}
                  onClick={() => handleClick(index)}
                >
                  <img src={model.preview} className="rounded-[30px]" />
                </button>
              )
              ))}
            <span className="w-full col-span-1 text-2xl text-center sm:col-span-2 2xl:col-span-4">
              {isError ? `${error}` : isFetchingNextPage ? (
                "Loading..."
              ) :
                hasNextPage ?
                  null
                  :
                  "No More Models"
              }
            </span>
          </div>
        </section>
      </dialog>
    </>
  );
};

export default EditProfileModelButton;
