import React from 'react'

const Reviews = ({data}) => {
  return (
    <div>
      {" "}
      {data?.blogreviews?.map((item) => (
        <Author>
          <h3>{item.name}</h3>
          <p>{item.text}</p>
        </Author>
      ))}
    </div>
  );
}

export default Reviews