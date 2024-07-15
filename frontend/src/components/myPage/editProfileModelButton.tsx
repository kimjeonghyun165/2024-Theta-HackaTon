import { useRef, useState } from 'react';
import Edit from '../../assets/icons/edit'
import Search from '../../assets/icons/search';
import { Ex1 } from '../../assets/imgSelect';

const EditMyModelButton = () => {
  const [clickedBox, setClickedBox] = useState<number | null>();
  const modalRef = useRef<HTMLDialogElement>(null);

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
  }

  return (
    <>
      <button className="w-[33px] h-[33px] absolute top-3 right-6" onClick={openModal}><Edit /></button>
      <dialog
        ref={modalRef}
        className="backdrop:backdrop-blur-md rounded-[87px] py-10 px-28" style={{
          background:
            "linear-gradient(180deg, rgba(208, 208, 208, 0.25) 0%, rgba(106, 106, 106, 0.5) 100%)",
        }}
        onClick={(e) => { if (e.target === modalRef.current) closeModal() }}
      >
        <section className=''>
          <h2 className='text-3xl font-bold'>PROFILE ASSET SELECTION</h2>
          <div className="flex gap-10 text-2xl">
            <div className="w-[704px] rounded-[30px] bg-[#777]/[0.2] placeholder:text-white placeholder:text-2xl flex items-center px-5 gap-3">
              <div className="w-[29px] h-[27px]">
                <Search />
              </div>
              <span className="text-2xl text-white">Search:</span>
              <input type="text" className="text-white bg-transparent outline-none" />
            </div>
            <button className="ml-12 text-white right-20">
              Recent ▼
            </button>
          </div>
          <div className="max-h-[500px] overflow-y-scroll grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-5 gap-4 mt-10 myPage-scrollba">
            {new Array(12).fill(0).map((_, index) => {
              return (
                <button
                  className={`w-[293px] h-[293px] rounded-[30px] flex flex-col justify-between items-center py-7 mx-auto ${clickedBox === index ? '' : 'bg-[#777777]/[0.2]'
                    }`}
                  style={{
                    background: clickedBox === index
                      ? 'linear-gradient(134.8deg, #A2B0FF 3.08%, #616A99 59.2%, #616A99 79.65%, #616A99 100%)'
                      : undefined,
                  }}
                  onClick={() => handleClick(index)}
                >
                  <Ex1 />
                </button>
              );
            })}
          </div>
        </section>
      </dialog>
    </>
  );
}

export default EditMyModelButton