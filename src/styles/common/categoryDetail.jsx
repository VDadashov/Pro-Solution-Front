import styled from "styled-components";

export const DetailWrapper = styled.section`
  min-height: 100vh;
  background-color: #fafafa;
`;

export const Wrapper = styled.div`
  padding-top: 2rem;
  @media (max-width: 850px) {
    padding-top: 0;
  }
`;

export const DetailHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 77%;
  margin: 0px 0px 2rem 10rem;
  @media (max-width: 850px) {
    width: 100%;
    flex-direction: column;
    text-align: center;
    gap: 10px;
    margin: 0px;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }
`;

export const Nav = styled.ul`
  display: flex;
  gap: 10px;
  li a {
    color: hsla(0, 0%, 40%, 0.7);
    font-weight: 400;
    line-height: 1.2;
    text-transform: uppercase;
    font-size: 1.15em;
    transition: color 0.3s ease;
    
    &:hover {
      color: #149295;
    }
  }
`;

export const DetailBody = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin: 0 auto;
  max-width: 80%;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  
  @media (max-width: 851px) {
    flex-direction: column;
    margin-top: 2rem;
    gap: 30px;
    margin: 1rem auto;
    padding: 1rem;
  }
`;

export const DetailCard = styled.div`
  width: 44%;
  display: flex;
  gap: 30px;
  position: relative;
  @media (max-width: 851px) {
    flex-direction: column-reverse;
    width: 100%;
  }
`;

export const ThumbnailList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 450px;
  overflow-y: auto;
  padding-right: 7px;
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(240, 240, 240, 0.8);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #149295;
    border-radius: 4px;
  }

  @media (max-width: 851px) {
    flex-direction: row;
    overflow-y: hidden;
    overflow-x: auto;

    &::-webkit-scrollbar {
      height: 4px;
    }
  }
`;

export const MainImageWrapper = styled.div`
  position: relative;
  width: 450px;
  height: 440px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fafafa;
  border-radius: 12px;
  overflow: hidden;

  &:hover div {
    opacity: 1;
  }

  @media (max-width: 851px) {
    width: 100%;
    height: 400px;
  }
`;

export const DetailInfo = styled.div`
  width: 38%;
  @media (max-width: 851px) {
    width: 100%;
  }
`;

export const DetailList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const DetailItem = styled.li`
  padding: 12px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  line-height: 1.4;
  border-bottom: 1px solid #ecf0f1;
  
  @media (max-width: 851px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
`;

export const DetailFoot = styled.div`
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #ecf0f1;
`;

export const Socials = styled.ul`
  display: flex;
  align-items: center;
  gap: 8px;

  li {
    position: relative;
    border: 2px solid #bdc3c7;
    color: #7f8c8d;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      color: white;
      transform: translateY(-2px);
    }

    &::after {
      content: attr(data-tooltip);
      position: absolute;
      bottom: 120%;
      left: 50%;
      transform: translateX(-50%);
      background-color: #2c3e50;
      color: white;
      padding: 8px 12px;
      white-space: nowrap;
      font-size: 12px;
      border-radius: 4px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
      z-index: 1;
    }

    &:hover::after {
      opacity: 1;
    }
  }

  .facebook:hover {
    background-color: #3b5998;
    border-color: #3b5998;
  }

  .twitter:hover {
    background-color: #1da1f2;
    border-color: #1da1f2;
  }

  .email:hover {
    background-color: #34495e;
    border-color: #34495e;
  }

  .pinterest:hover {
    background-color: #bd081c;
    border-color: #bd081c;
  }

  .linkedin:hover {
    background-color: #0077b5;
    border-color: #0077b5;
  }
`;