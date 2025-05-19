import { WishlistContext } from "@Context/wishlistContext";
import React, { useContext } from "react";
import { IoClose } from "react-icons/io5";
import styled from "styled-components";

const WishlistTables = () => {
  const { wishlist, addToWishlist } = useContext(WishlistContext);

  return (
    <WishlistTable>
      <TableHead>
        <TableRow>
          <TableHeaderProduct>Product name</TableHeaderProduct>
          <TableHeaderData>Unit price</TableHeaderData>
          <TableHeaderData>Stock status</TableHeaderData>
        </TableRow>
      </TableHead>
      <TableBody>
        {wishlist.length == 0 ? (
          <EmptyTr>
            <EmptyTd colSpan={3}>No products added to the wishlist</EmptyTd>
          </EmptyTr>
        ) : (
          wishlist?.map((item) => (
            <ProductTr key={item.id}>
              <ProductNameTd>
                <DeleteWishlist onClick={() => addToWishlist(item)}>
                  <IoClose />
                </DeleteWishlist>
                <ProductImage src="./images/laptop.webp" />
                <ProductName>{item.description}</ProductName>
              </ProductNameTd>
              <ProductData style={{ color: "#000000" }}>
                <DelTag>{item.price}</DelTag> {item.discountPrice} m
              </ProductData>
              <ProductData>In Stock</ProductData>
            </ProductTr>
          ))
        )}
      </TableBody>
    </WishlistTable>
  );
};

const WishlistTable = styled.table`
  color: #777777;
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  width: 100%;
  border-bottom: 2px solid #ececec;
`;

const TableRow = styled.tr`
  width: 100%;
`;

const TableHeaderProduct = styled.th`
  padding: 5px 0px;
  width: 50%;
`;

const TableHeaderData = styled.th`
  width: 25%;
`;

const TableBody = styled.tbody`
  width: 100%;
`;

const EmptyTr = styled.tr`
  text-align: center;
  width: 100%;
`;

const EmptyTd = styled.td`
  font-size: 2em;
  padding: 50px;
  color: #666666;
`;

const ProductTr = styled.tr`
  width: 100%;
  td {
    text-align: center;
    padding: 30px 0px;
  }
`;

const ProductNameTd = styled.td`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const ProductName = styled.p`
  color: #149295;
  cursor: pointer;
  &:hover {
    color: #000;
  }
`;

const ProductImage = styled.img`
  max-width: 60px;
`;

const ProductData = styled.td`
  width: 25%;
  font-weight: 700;
`;

const DelTag = styled.del`
  text-decoration: line-through;
  color: #777777;
`;

const DeleteWishlist = styled.button`
  color: #ccc;
  background-color: transparent;
  border: 2px solid #ccc;
  border-radius: 100%;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: #000000;
    border-color: #000000;
  }
`;

export default WishlistTables;
