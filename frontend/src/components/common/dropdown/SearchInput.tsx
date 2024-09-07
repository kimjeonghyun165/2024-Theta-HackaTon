interface SearchInputProps {
  searchTerm: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  handleSearchChange,
}) => (
  <li className="px-4" onClick={(e) => e.stopPropagation()}>
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={handleSearchChange}
      className="w-full px-3 py-2 rounded-full text-sm bg-[#1C1C1C]/[.53]"
    />
  </li>
);

export default SearchInput;
