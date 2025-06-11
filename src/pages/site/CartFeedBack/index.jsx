import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { useGet } from "../../../utils/hooks/useCustomQuery"; // yol uyğun olaraq dəyişdir
import { ENDPOINTS } from "@utils/constants/Endpoints";

const CartFeedBack = () => {
  const { token } = useParams();

  const { data: data, isLoading, isError } = useGet("cart-feedback", `${ENDPOINTS.basket}/getbytoken/${token}`);


  const products = useMemo(() => {
    if (!data || !data.basketItems?.$values) return [];
    return data.basketItems.$values.map((item) => {
      const p = item.product;
      const mainImage = p?.images?.$values?.find((img) => img.isMain)?.imagePath;
      return {
        id: p.id,
        title: p.title,
        description: p.description,
        price: p.price,
        discountPrice: p.discountPrice,
        detailSlug: p.detailSlug,
        image: mainImage || "https://via.placeholder.com/300x200?text=Məhsul"
      };
    });
  }, [data]);

  if (isLoading) return <p>Yüklənir...</p>;
  if (isError) return <p>❌ Səbət məlumatları yüklənmədi</p>;

  return (
    <Wrapper>
      <HeaderTitle>Səbətdəki məhsullar</HeaderTitle>
      <Row>
        {products.length === 0 ? (
          <p>Səbət boşdur</p>
        ) : (
          products.map((product) => (
            <Card key={product.id}>
              <Image src={product.image} alt={product.title} />
              <Link to={`/category/${product.detailSlug}`}>{product.title}</Link>
              <PriceArea>
                {product.discountPrice ? (
                  <>
                    <OldPrice>{product.price} ₼</OldPrice>
                    <NewPrice>{product.discountPrice} ₼</NewPrice>
                  </>
                ) : (
                  <NewPrice>{product.price} ₼</NewPrice>
                )}
              </PriceArea>
            </Card>
          ))
        )}
      </Row>
    </Wrapper>
  );
};

export default CartFeedBack;
const HeaderTitle = styled.h1`
  margin: 0 0 10px;
  font-size: 24px;
  text-align: center;
  
  font-weight: bold;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  background: #f9f9f9;  
  `;

// === Styled Components ===
const Wrapper = styled.div`
  padding: 40px 20px;
  max-width: 1000px;
  margin: 0 auto;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const Card = styled.div`
  width: 30%;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 0 5px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Image = styled.img`
  width: 100%;
  max-height: 180px;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const Title = styled.h3`
  margin: 0 0 10px;
  font-size: 18px;
`;

const Desc = styled.p`
  font-size: 14px;
  color: #555;
`;

const PriceArea = styled.div`
  margin-top: 10px;
`;

const OldPrice = styled.span`
  text-decoration: line-through;
  color: #999;
  margin-right: 10px;
`;

const NewPrice = styled.span`
  color: #000;
  font-weight: bold;
  font-size: 16px;
`;
