import React from "react";
import styled from "styled-components";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import {
  FaFacebookF,
  FaXTwitter,
  FaPinterest,
  FaLinkedin,
} from "react-icons/fa6";

import { MdOutlineEmail } from "react-icons/md";
import HorizontalLine from "@styles/common/HorizontalLine";
import CommentForm from "@components/site/Blog/CommentForm";
import { useGetOne } from "@utils/hooks/useCustomQuery";
import { ENDPOINTS } from "@utils/constants/Endpoints";
import Reviews from "./Reviews";

function BlogDetail() {
  const { id } = useParams();

  const { data } = useGetOne("blogs", ENDPOINTS.blogs, id);
 
  return (
    <BlogDetailWrapper>
      <QuestionContent>
        <h1>{data?.title}?</h1>
        <HorizontalLine />
        <span>
          POSTED ON <a href="">{moment(data?.createdAt).format("LL")}</a>, by
          <a href="">
            {" "}
            {data?.name} {data?.surname}
          </a>
        </span>
      </QuestionContent>

      <QuestionDetail>
        <BlogDate>
          <h3>{moment(data?.createdAt).format("MM")}</h3>
          <p>{moment(data?.createdAt).format("MMMM")}</p>
        </BlogDate>
        <DetailImg>
          <img src={data?.imageUrl} alt="" loading="lazy" />
        </DetailImg>
        <BlogText>
          <p>{data?.description}</p>
        </BlogText>
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
      {data?.$values?.blogReviews?.length > 0 ? (
        data.$values.blogReviews.map((item) => (
          <Reviews key={item.id} item={item} />
        ))
      ) : (
        <p
          style={{ textAlign: "center", padding: "20px", fontStyle: "italic" }}
        >
          Hələ heç bir rəy yoxdur.
        </p>
      )}

      <HorizontalLine width="100%" />
      <CommentForm blogId={id} />
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
    margin-bottom: 15px;
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
  // background-color: red;
  width: 100%;

  img {
    width: 60%;

    height: 200px;
    object-fit: cover;
  }
  @media (max-width: 500px) {
    img {
      margin-top: 10px;
    }
  }
`;

const DetailImg = styled.div`
  // background-color:green;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;

  img{
    width: 100%;
    height: 100%;
    object-fit: contain;
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



const BlogText = styled.div`
  padding: 20px;
`;
