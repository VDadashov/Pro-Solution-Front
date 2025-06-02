import React, { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  DropdownContainer,
  DropdownToggle,
  DropdownWrapper,
  SearchInput,
  OptionList,
  OptionItem,
  NoResult,
} from '@styles/common/prosessorSelect';

const ProcessorSelectAmd = ({ products }) => {
 console.log(products?.amd?.id)
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [amdProcessors, setAmdProcessors] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const selectedId = params.get('featureId') || '';
    if (selectedId && amdProcessors.length > 0) {
      const found = amdProcessors.find(p => p.id === selectedId);
      setSelected(found ? found.title : '');
    } else {
      setSelected('');
    }
  }, [location.search, amdProcessors]);

  // AMD prosessorlarını ID və title ilə yığ
  useEffect(() => {
    if (products?.items?.$values) {
      const amdList = [
        ...new Map(
          products.items.$values
            .filter((product) => product.title?.toLowerCase().includes('amd'))
            .map((product) => [product.id, {
              id: product.id,
              title: product.title.trim()
            }])
        ).values(),
      ];
      setAmdProcessors(amdList);
    }
  }, [products]);

  const filteredProcessors = amdProcessors.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (item) => {
    setSelected(item.title);
    setShowDropdown(false);
    setSearch('');

    const params = new URLSearchParams(location.search);
    if (item?.id) {
      params.set('featureId', item.id);
    } else {
      params.delete('featureId');
    }

    navigate(`${location.pathname}?${params.toString()}`);
  };

  return (
    <Container>
      <h3>PROSESSOR - AMD</h3>
      <hr />
      <DropdownContainer>
        <DropdownToggle onClick={() => setShowDropdown(!showDropdown)}>
          {selected || 'İstənilən Prosessor - AMD'}
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
              {filteredProcessors.map((item) => (
                <OptionItem key={item.id} onClick={() => handleSelect(item)}>
                  {item.title}
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

export default ProcessorSelectAmd;
