import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaXTwitter,
  FaPinterest,
  FaLinkedin,
} from "react-icons/fa6";

import { MdOutlineEmail } from "react-icons/md";
import HorizontalLine from "@styles/common/HorizontalLine";
import CommentForm from "@components/site/Blog/CommentForm";

function BlogDetail() {
  return (
    <BlogDetailWrapper>
      <QuestionContent>
        <h6>UNCATEGORIZED</h6>
        <h1>Ram-nədir?</h1>
        <HorizontalLine />
        <span>
          POSTED ON <a href="">İYUL 22, 2024</a>, by
          <a href=""> TAGHIYEV FIZULI</a>
        </span>
      </QuestionContent>

      <QuestionDetail>
        <BlogDate>
          <h3>13</h3>
          <p>iyn</p>
        </BlogDate>
        <img
          src="https://i0.wp.com/prosolution.ltd/wp-content/uploads/2024/07/444444444444444.jpg?w=1080&ssl=1"
          alt=""
        />
        <p>Ram-nədir?</p>
      </QuestionDetail>

      <HorizontalLine />

      
      <Socials>
        <li className="facebook" data-tooltip="Share on Facebook">
          <Link>
            <FaFacebookF />
          </Link>
        </li>
        <li className="twitter" data-tooltip="Share on Twitter">
          <Link>
            <FaXTwitter />
          </Link>
        </li>
        <li className="email" data-tooltip="Send via Email">
          <Link>
            <MdOutlineEmail />
          </Link>
        </li>
        <li className="pinterest" data-tooltip="Pin it on Pinterest">
          <Link>
            <FaPinterest />
          </Link>
        </li>
        <li className="linkedin" data-tooltip="Share on LinkedIn">
          <Link>
            <FaLinkedin />
          </Link>
        </li>
      </Socials>

      <HorizontalLine width="100%" />

      <Author>
        <img
          src="https://prosolution.ltd/wp-content/litespeed/avatar/ebc5ae1cc393eabd8848ecf7c412ec25.jpg?ver=1744797656"
          alt=""
        />
        <h3>TAGHIYEV FİZULİ</h3>
      </Author>

      <HorizontalLine width="100%" />
      <CommentForm />
    </BlogDetailWrapper>
  );
}

export default BlogDetail;



const BlogDetailWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;

  overflow-y: auto;
  max-height: 100vh;
  padding-top: 30px;
  padding-bottom: 100px;
  overflow-y: scroll; 
  -ms-overflow-style: none; 
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }

`;

const QuestionContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 620px) {
      margin-bottom:15px;
  }

  h1 {
    color: #149295;
    font-weight: 600;
    font-size: 30px;
  }
  h6 {
    color: #149295;
  }
  span {
    font-size: 12px;
    color: #808080;
    a {
      color: #149295;
    }
  }
`;

const QuestionDetail = styled.div`
  img {
    width: 800px;
  }
`;

const BlogDate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 45px;
  height: 45px;
  border: 2px solid #149295;
  background-color: transparent;
  color: #149295;
  transition: all 0.3s ease;
`;

const Socials = styled.ul`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  min-height: 3vh;

  li {
    position: relative;
    border: 2px solid #c0c0c0;
    color: #c0c0c0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 16px;
    cursor: pointer;
    transition: 0.3s ease;

    &:hover {
      color: white;
    }

    &::after {
      content: attr(data-tooltip);
      position: absolute;
      bottom: 120%;
      left: 50%;
      transform: translateX(-50%);
      background-color: black;
      color: white;
      padding: 6px 10px;
      white-space: nowrap;
      font-size: 12px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
      z-index: 1;
    }

    &::before {
      content: "";
      position: absolute;
      bottom: 97%;
      left: 50%;
      transform: translateX(-50%);
      border-width: 5px;
      border-style: solid;
      border-color: black transparent transparent transparent;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 1;
    }

    &:hover::after,
    &:hover::before {
      opacity: 1;
    }
  }

  .facebook:hover {
    background-color: #446084;
    border-color: #446084;
  }

  .twitter:hover {
    background-color: #000000;
    border-color: #000000;
  }

  .email:hover {
    background-color: #000000;
    border-color: #000000;
  }

  .pinterest:hover {
    background-color: #cf2e2e;
    border-color: #cf2e2e;
  }

  .linkedin:hover {
    background-color: #0693e3;
    border-color: #0693e3;
  }
`;

const Author = styled.div`
  padding: 40px 30px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  color: #149295;

  img {
    border-radius: 50%;
    width: 100px;
  }

  h3 {
    padding: 20px;
  }
`;
