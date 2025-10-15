import React, { useEffect } from "react";
import styled from "styled-components";
import { FaTrash } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useCart } from "../../../providers/CartProvider";
import { usePost } from "../../../utils/hooks/useCustomMutation";
import { ENDPOINTS } from "@utils/constants/Endpoints";
import { useGetOne } from "@utils/hooks/useCustomQuery";

const CartPanel = ({ isOpen, onClose }) => {
  const {data: whatsappNumber} = useGetOne("getWhatsappNumber", `${ENDPOINTS.setting}`, "e88768cc-6d17-45d1-a6e0-cb96d15032b2"); 
  const {data: whatsappMessage} = useGetOne("getWhatsappMessage", `${ENDPOINTS.setting}`,"8a911ba1-b76e-4225-a96f-9a11e50681a4");
  const { cartItems, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();

  // Scroll kilidi
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // POST sorğu üçün react-query hook-u
  const { mutate: createBasket } = usePost("basket-create", `${ENDPOINTS.basket}/create`);

  const sendToWhatsApp = () => {
    if (!whatsappNumber || cartItems.length === 0) return;

    const basketItems = cartItems.map(item => ({
      count: item.quantity,
      productId: String(item.id),
    }));

    console.log("📤 Sorğu göndərilir:", { basketItems });

    createBasket(
      { basketItems },
      {
        onSuccess: (basketId) => {
          if (!basketId) {
            console.warn("⚠️ Backend boş cavab qaytardı");
            return;
          }

          const productLink = `${window.location.origin}/feedbackproduct/${basketId}`;
          const message = `${whatsappMessage?.value}\n\n${productLink}`;
          const url = `https://wa.me/${whatsappNumber?.value}?text=${encodeURIComponent(message)}`;

          console.log("✅ WhatsApp yönləndirmə linki:", url);
          window.open(url, "_blank");
        },
        onError: (error) => {
          console.error("🔥 WhatsApp göndərmə xətası:", error);
        }
      }
    );
  };

  return (
    <>
      <Overlay $show={isOpen} onClick={onClose} />
      <Panel $show={isOpen}>
        <Top>
          <BackBtn onClick={onClose}><IoIosArrowBack /> Geri</BackBtn>
          <Title>Səbət ({cartItems.length})</Title>
        </Top>

        <Content>
          {cartItems.length === 0 ? (
            <Empty>Səbət boşdur</Empty>
          ) : (
            cartItems.map(item => (
              <Item key={item.id}>
                <Img src={item.image} alt={item.title} />
                <Details>
                  <Name>{item.title}</Name>
                  <QuantityControl>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </QuantityControl>
                </Details>
                <Remove onClick={() => removeFromCart(item.id)}><FaTrash /></Remove>
              </Item>
            ))
          )}
        </Content>

        {cartItems.length > 0 && (
          <Footer>
            <Total>Ümumi: {getTotalPrice()} ₼</Total>
            <Actions>
              <button onClick={clearCart}>Təmizlə</button>
              <button onClick={sendToWhatsApp}>WhatsApp-a göndər</button>
            </Actions>
          </Footer>
        )}
      </Panel>
    </>
  );
};

export default CartPanel;


// Styles
const Overlay = styled.div`
  visibility: ${({ $show }) => ($show ? "visible" : "hidden")};
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transition: opacity 0.3s ease;
  position: fixed;
  top: 0;
  left: 0;
  width: ${({ $show }) => ($show ? "100%" : "0")};
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
`;

// const Panel = styled.div`
//   position: ${({ $show }) => ($show ? "fixed" : "absolute")};

//   top: 0;
//   right: 0;
//   height: 100vh;
//   width: ${({ $show }) => ($show ? "100%" : "0")} !important;
//   max-width: ${({ $show }) => ($show ? "400px" : "0")};
//   background: white;
//   z-index: 1000;
//   display: ${({ $show }) => ($show ? "flex" : "block")};
//   flex-direction: column;
//   // overflow: hidden;
//   transform: ${({ $show }) => ($show ? "translateX(0)" : "translateX(100%)")};
//   opacity: ${({ $show }) => ($show ? 1 : 0)};
//   visibility: ${({ $show }) => ($show ? "visible" : "hidden")};
//   pointer-events: ${({ $show }) => ($show ? "auto" : "none")};
//   transition: ${({ $show }) => ($show ? "transform 0.3s ease, opacity 0.3s ease" : "")};

//   @media (max-width: 500px) {
//     max-width: 100%;
//   }
// `;
const Panel = styled.div`
position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  max-width: 400px;
  width: ${({ $show }) => ($show ? "100%" : "0")};
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  visibility: ${({ $show }) => ($show ? "visible" : "hidden")};
  width:${({ $show }) => ($show ? "100%" : "0")};
  overflow: hidden;
  transition:  0.5s ease ;
  background: white;
  z-index: 1000;
  display: flex;
  flex-direction: column;



`;
const Top = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background: #f3f3f3;
  gap: 10px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const BackBtn = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Content = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
`;

const Empty = styled.p`
  text-align: center;
  color: #777;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const Img = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
  border-radius: 6px;
`;

const Details = styled.div`
  flex: 1;
`;

const Name = styled.p`
  font-weight: bold;
  margin: 0;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  button {
    width: 24px;
    height: 24px;
    font-size: 16px;
    border: none;
    background: #ddd;
    cursor: pointer;
  }

  span {
    min-width: 20px;
    text-align: center;
  }
`;

const Remove = styled.button`
  background: none;
  border: none;
  color: red;
  font-size: 16px;
  cursor: pointer;
`;

const Footer = styled.div`
  padding: 16px;
  border-top: 1px solid #eee;
  background: #fff;
  position: sticky;
  bottom: 0;
`;

const Total = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;

  button {
    padding: 10px;
    font-size: 14px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    background: black;
    color: white;

    &:first-child {
      background: #999;
    }

    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  }
`;
