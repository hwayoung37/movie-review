import { useState, useEffect } from "react";
import CommentItem from "./CommentItem";
import { useParams } from "react-router-dom";
import Loading from "../common/Loading";

export default function CommentList({
  userInfo,
  slicedComments,
  setSlicedComments,
}) {
  console.log(slicedComments);

  //분기처리
  //로딩, 빈배열, 채워진 제대로된 배열
  if (slicedComments === null) {
    return <Loading />;
  } else if (slicedComments.length === 0 && Array.isArray(slicedComments)) {
    return (
      <div className="commentItem__List__none">작성된 코멘트가 없습니다.</div>
    );
  } else {
    return (
      <div className="commentItem__List">
        {slicedComments.slice(0, 3).map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            setSlicedComments={setSlicedComments}
            userInfo={userInfo}
          />
        ))}
      </div>
    );
  }
}
