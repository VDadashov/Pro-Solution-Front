
import { useState } from 'react';
import styled from 'styled-components';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const ProcessorSelect = () => {
  const processors = [
    "Intel® Celeron® N4000",
    "Intel® Core™ i3-1115G4",
    "Intel® Core™ i3-1215U",
    "Intel® Core™ i5-1155G7",
    "Intel® Core™ i7-1165G7",
    "Intel® Core™ i9-11900K",
    "Intel® Xeon® W-1290",
  ];

  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredProcessors = processors.filter(item =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (item) => {
    setSelected(item);
    setShowDropdown(false);
    setSearch('');
  };

  return (
    <Container>
      <h3>PROSESSOR-INTEL</h3>
      <hr />
      <DropdownContainer>
        <DropdownToggle onClick={() => setShowDropdown(!showDropdown)}>
          {selected || 'İstənilən Prosessor-INTEL'}
          {showDropdown ? <FaChevronUp /> : <FaChevronDown />}
        </DropdownToggle>

        {showDropdown && (
          <DropdownWrapper>
            <SearchInput
              type="text"
              placeholder=""
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <OptionList>
              {filteredProcessors.map((item, index) => (
                <OptionItem key={index} onClick={() => handleSelect(item)}>
                  {item}
                </OptionItem>
              ))}
              {filteredProcessors.length === 0 && (
                <NoResult>Nəticə tapılmadı</NoResult>
              )}
            </OptionList>
          </DropdownWrapper>
        )}
      </DropdownContainer>
    </Container>
  );
};

export default ProcessorSelect;

const Container = styled.div`
  padding-left: 20px;
  font-family: Arial, sans-serif;
  max-width: 300px;

  h3 {
    font-size: 1em;
    font-weight: 600;
    letter-spacing: .05em;
    line-height: 1.05;
    text-transform: uppercase;
    color: #777;
  }

  hr {
    width: 40px;
    margin: 11px 0px;
    border: 2px solid #0000001A;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownToggle = styled.div`
  border: 1px solid #ccc;
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  color: #999;
  line-height: 28px;
  font-size: .97em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DropdownWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  z-index: 0;
  border-radius: 0 0 4px 4px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-bottom: 1px solid #ddd;
  outline: none;
`;

const OptionList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 160px;
  overflow-y: auto;
`;

const OptionItem = styled.li`
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;

  &:hover {
    background-color: #007acc;
    color: white;
  }
`;

const NoResult = styled.li`
  padding: 10px;
  color: gray;
  font-size: 14px;
`;
