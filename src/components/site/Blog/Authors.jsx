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

  return (
    <AuthorsWrapper>
      <CategoriesHead>
        <h4>MÜƏLLİFLƏR</h4>
        <hr />
      </CategoriesHead>
      <AuthorsSection>
        {authors.map((author, index) => (
          <button key={index}>{author.name}</button>
        ))}
      </AuthorsSection>
    </AuthorsWrapper>
  );
}

export default Authors;

const AuthorsWrapper = styled.div`
  min-height: 10vh;
  padding-bottom: 30px;
`;
const CategoriesHead = styled.div``;
const AuthorsSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 3px;
  padding-top: 20px;
`;
