import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import React, { useEffect } from 'react';
import {
  Container, DropdownContainer, DropdownToggle, DropdownWrapper, SearchInput, OptionList,
  OptionItem,NoResult
} from "@styles/common/prosessorSelect"

const ProcessorSelectIntel = ({ products }) => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [intelProcessors, setIntelProcessors] = useState([]);


  useEffect(() => {
    if (products?.items?.$values) {
      const intelList = [...new Set(
        products.items.$values
          .filter(product => product.title?.toLowerCase().includes('intel'))
          .map(product => product.title.trim())
      )];
      setIntelProcessors(intelList);
    }
  }, [products]);



  const filteredProcessors = intelProcessors.filter(item =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (item) => {
    setSelected(item);
    setShowDropdown(false);
    setSearch('');
  };

  return (
    <Container>
      <h3>PROSESSOR - INTEL</h3>
      <hr />
      <DropdownContainer>
        <DropdownToggle onClick={() => setShowDropdown(!showDropdown)}>
          {selected || 'İstənilən Prosessor - INTEL'}
          {showDropdown ? <FaChevronUp /> : <FaChevronDown />}
        </DropdownToggle>

        {showDropdown && (
          <DropdownWrapper>
            <SearchInput
              type="text"
              placeholder="Axtar..."
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

export default ProcessorSelectIntel;

