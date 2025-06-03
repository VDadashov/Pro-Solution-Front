import styled from "styled-components";

export const Container = styled.div`
  font-family: Arial, sans-serif;
  max-width: 300px;
  margin-bottom: 1rem;

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

export const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const DropdownToggle = styled.div`
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

export const DropdownWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  z-index: 1;
  border-radius: 0 0 4px 4px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-bottom: 1px solid #ddd;
  outline: none;
`;

export const OptionList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 160px;
  overflow-y: auto;
`;

export const OptionItem = styled.li`
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;

  &:hover {
    background-color: #007acc;
    color: white;
  }
`;

export const NoResult = styled.li`
  padding: 10px;
  color: gray;
  font-size: 14px;
`;
