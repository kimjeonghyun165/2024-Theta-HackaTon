import { useState } from "react";

const Accordian = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="max-w-2xl w-full">
      <div className="collapse collapse-plus bg-base-200">
        <input
          type="radio"
          name="my-accordion-3"
          checked={activeIndex === 0}
          onChange={() => setActiveIndex(0)}
        />
        <div className="collapse-title text-xl font-medium">
          Step 1 / Prompt
        </div>
        <div className="collapse-content flex flex-col gap-4">
          <div className="w-full">
            <textarea
              className="textarea textarea-bordered textarea-lg w-full h-60 resize-none"
              placeholder="Described the object you want to generate."
            ></textarea>
          </div>
          <div className="flex justify-end">
            <div
              className="btn btn-outline text-second rounded-full"
              onClick={() => setActiveIndex(1)}
            >
              Generate Image
            </div>
          </div>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200 mt-4">
        <input
          type="radio"
          name="my-accordion-3"
          id="second-section"
          checked={activeIndex === 1}
          onChange={() => setActiveIndex(1)}
        />
        <div className="collapse-title text-xl font-medium">Drafts</div>

        <div className="collapse-content flex flex-col gap-4">
          <div className="w-full">
            <textarea
              className="textarea textarea-bordered textarea-lg w-full h-60 resize-none"
              placeholder="Described the object you want to generate."
            ></textarea>
          </div>
          <div className="flex justify-end">
            <div
              className="btn btn-outline text-second rounded-full"
              onClick={() => setActiveIndex(2)}
            >
              Generate 3D Mdoel
            </div>
          </div>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200 mt-4">
        <input
          type="radio"
          name="my-accordion-3"
          checked={activeIndex === 2}
          onChange={() => setActiveIndex(2)}
        />
        <div className="collapse-title text-xl font-medium">
          Custom 3D Model
        </div>
        <div className="collapse-content">
          <p>hello</p>
        </div>
      </div>
    </div>
  );
};

export default Accordian;
