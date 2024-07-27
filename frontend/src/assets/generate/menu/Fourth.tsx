interface Selected {
  selected: boolean;
}

const Fourth = ({ selected }: Selected) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 53 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={selected ? "opacity-100 " : "opacity-50"}
    >
      <rect width="53" height="53" fill="url(#pattern0_180_4807)" />
      <defs>
        <pattern
          id="pattern0_180_4807"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_180_4807" transform="scale(0.00195312)" />
        </pattern>
        <image
          id="image0_180_4807"
          width="512"
          height="512"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export default Fourth;
