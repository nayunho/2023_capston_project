import React, { useState } from 'react';
import './../App.css';
import { useEffect, useRef } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Ad_businessman_shop() {
   
 let a =localStorage.getItem("owner_store");
 let navigate = useNavigate();
 var store = JSON.parse(a);
 var owner = localStorage.getItem("owner");
    return (
        <div>
            <div className="main_bar">
                재고30 <span>Administration</span>
            </div>
            <div className="menu_bar">
                <div className="ad">
                    관리자 님, 환영합니다!
                </div>
                <div className="content">
                    <div>회원 관리</div>
                    <div className="sub" id="one"><a href="/ad_user">사용자</a></div>
                    <div className="sub"><a href="/ad_businessman" style={{color:"red"}}>상업자</a></div>
                    <div className="sub"><a href="/ad_admin">관리자</a></div>
                </div>
                <div className="content">
                    <div>콘텐츠 관리</div>
                    <div className="sub"><a href="/ad_inquiry">문의 내역</a></div>
                    <div className="sub"><a href="/ad_notice">공지사항</a></div>
                    <div className="sub"><a href="/ad_store_managemnet" >가게 관리</a></div>
                </div>
                <div className="content">
                    <div>인사이트 분석</div>
                    <div className="sub"><a href="/ad_analysis_shop">가게 분석</a></div>
                </div>
                <div className="logout">
                    <div><a href="/ad_login" id="logout">로그아웃</a></div>
                </div>
            </div>

            <main className='ad_main'>
                <div class="ad_title" style={{marginTop:"50px",marginLeft:"30px",fontWeight:"bolder",fontSize:"30px"}}><span style ={{color:"blue"}}>{owner}</span>님의 가게({store.length})</div>
                <div class="tb">
                    <table className='ad_table'>
                        <thead>
                            <tr style={{ height: "50px", fontSize: "25px", fontWeight: "700" }}>
                                <td style={{ width: "10%" }}>가게 번호</td>
                                <td style={{ width: "20%" }}>이름</td>
                                <td style={{ width: "40%" }}>주소</td>
                                <td style={{ width: "10%" }}>전화번호</td>
                                <td style={{ width: "10%" }}>별점</td>
                                <td style={{ width: "10%" }}>등록일</td>
                            </tr>
                        </thead>
                        <tbody>
                        {store.map((store, index) => (
                                  <tr style={{ height: "50px", fontSize: "20px" }}>
                                  <td  style={{ fontWeight: "700" }}>{store.shopidx}</td>
                                  <td><a style={{textDecoration:"underline",cursor:"pointer"}} onClick={()=>{
                                            axios.get('/manager/member/business/iteminfo', {
                                                params: {
                                                  shopidx: store.shopidx
                                                }
                                              })
                                                .then(response => {
                                                  localStorage.setItem('store_item', JSON.stringify(response.data));
                                                  localStorage.setItem('storeName', store.shopName); 
                                                  navigate("/ad_businessman_item");
                                                })
                                                .catch(error => {
                                                  console.error('세션 데이터를 가져오는데 실패함', error);
                                                });
                                        }}>{store.shopName}</a></td>
                                  <td>{store.shopAddress}</td>
                                  <td>{store.shopTel}</td>
                                  <td>{store.rating}</td>
                                  <td>{store.registrationDate}</td>
                              </tr>  
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div >
    )
}

export default Ad_businessman_shop;