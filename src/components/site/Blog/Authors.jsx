import { ENDPOINTS } from "@utils/constants/Endpoints";
import { useGet } from "@utils/hooks/useCustomQuery";
import React from "react";
import styled from "styled-components";

function Authors() {
  const authors = [
    {
      id: 1,
      name: "Elvin Məmmədov",
      bio: "Frontend developer və dizayn həvəskarı. 5 ildən çox təcrübə.",
      image: "https://i.pravatar.cc/200?img=1",
      books: ["React Başlanğıc", "CSS Ustalıq Səviyyəsi"],
    },
    {
      id: 2,
      name: "Aytac Əliyeva",
      bio: "Bloqqer və kitab müəllifi. Texnologiya və sosial elmlər üzrə yazır.",
      image: "https://i.pravatar.cc/200?img=2",
      books: ["Əlçatan Dizayn", "Sosial Media və Psixologiya"],
    },
    {
      id: 3,
      name: "Rəşad Quliyev",
      bio: "UX/UI dizayner və mentor. Onlarla layihədə iştirak etmişdir.",
      image: "https://i.pravatar.cc/200?img=3",
      books: ["İstifadəçi Təcrübəsi", "Mobil Dizayn Əsasları"],
    },
    {
      id: 1,
      name: "Elvin Məmmədov",
      bio: "Frontend developer və dizayn həvəskarı. 5 ildən çox təcrübə.",
      image: "https://i.pravatar.cc/200?img=1",
      books: ["React Başlanğıc", "CSS Ustalıq Səviyyəsi"],
    },
    {
      id: 2,
      name: "Aytac Əliyeva",
      bio: "Bloqqer və kitab müəllifi. Texnologiya və sosial elmlər üzrə yazır.",
      image: "https://i.pravatar.cc/200?img=2",
      books: ["Əlçatan Dizayn", "Sosial Media və Psixologiya"],
    },
    {
      id: 3,
      name: "Rəşad Quliyev",
      bio: "UX/UI dizayner və mentor. Onlarla layihədə iştirak etmişdir.",
      image: "https://i.pravatar.cc/200?img=3",
      books: ["İstifadəçi Təcrübəsi", "Mobil Dizayn Əsasları"],
    },
  ];
const {data:blogs}= useGet("blogs", ENDPOINTS.blogs)
  return (
    <AuthorsWrapper>
      <CategoriesHead>
        <h4>MÜƏLLİFLƏR</h4>
        <hr />
      </CategoriesHead>
      <AuthorsSection>
        {blogs?.map((author, index) => (
          <button key={index}>{author.name} {author.surname}</button>
        ))}
      </AuthorsSection>
    </AuthorsWrapper>
  );
}

export default Authors;

const AuthorsWrapper = styled.div`
  min-height: 10vh;
  padding-bottom: 30px;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  h4 {
    color: gray;
    margin-bottom: 10px;
  }
  hr {
    width: 50px;
    border-top: 2px solid #ececec;
  }
  button {
    background-color: transparent;
    border: 1px solid #149295;
    color: #149295;
    height: 30px;
    border-radius: 3px;
    padding: 5px;
    &:hover {
      background-color: #149295;
      color: #ffffff;
    }
  }
`;
const CategoriesHead = styled.div``;
const AuthorsSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 5px;
  padding-top: 20px;
`;
