import React from 'react';
import { Background, LoadingText } from "./../img/style.js";
import Spinner from './../assets/spinner.gif';
function Loading() {
  return (
    <Background>
      <LoadingText>잠시만 기다려 주세요.</LoadingText>
      <img src={Spinner} alt="로딩중" width="300px" />
    </Background>
  );
};

export default Loading;