import React, { useEffect, useState } from 'react';
import './../App.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Ad_analysis_shop_rating() {
    let a =localStorage.getItem("store_item_rating");
    var analysis_item_rating = JSON.parse(a);
    let store_name =localStorage.getItem("store_analysis_store_name");
    let store_idx =localStorage.getItem("store_analysis_store_idx");
    let navigate = useNavigate();
    return (
        <div>
            <div className="main_bar">
                재고30 <span>Administration</span>
            </div>
            <div className="menu_bar">
                <div class="ad">
                    관리자 님, 환영합니다!
                </div>
                <div className="content">
                    <div>회원 관리</div>
                    <div className="sub" id="one"><a href="/ad_user">사용자</a></div>
                    <div className="sub"><a href="/ad_businessman">상업자</a></div>
                    <div className="sub"><a href="/ad_admin">관리자</a></div>
                </div>
                <div className="content">
                    <div>콘텐츠 관리</div>
                    <div className="sub"><a href="/ad_inquiry">문의 내역</a></div>
                    <div className="sub"><a href="/ad_notice">공지사항</a></div>
                    <div className="sub"><a href="/ad_store_managemnet" >가게 관리</a></div>
                </div>
                <div class="content">
                    <div>인사이트 분석</div>
                    <div class="sub"><a href="/ad_analysis_shop" style={{color:"red"}}>가게 분석</a></div>
                </div>
                <div className="logout">
                    <div><a href="#" id="logout">로그아웃</a></div>
                </div>
            </div>

            <main className="ad_main">
                <div className="ad_title"><span style={{color:"blue"}}>{store_name}</span> 별점</div>
                <div className="tb">
                    <table className="ad_table">
                        <thead>
                            <tr style={{ height: "50px", fontSize: "25px", fontWeight: "700" }}>
                                <td style={{ width: "15%" }}>별점</td>
                                <td style={{ width: "85%" }}>인원 수</td>
                            </tr>
                        </thead>
                        <tbody>
                        {analysis_item_rating.map((analysis_item_rating, index) => (
                                    <tr style={{ height: "50px", fontSize: "20px" }}>
                                    <td style={{ fontWeight: "700" }}>{index}</td>
                                    <td><a style={{ textDecoration: "underline",cursor:"pointer" }} onClick={()=>{
                                        axios.get('/manager/analysis/rating/client', {
                                            params: {
                                              shopidx: store_idx,
                                              rating:index,
                                            }
                                          })
                                            .then(response => {
                                              localStorage.setItem('store_item_rating_member', JSON.stringify(response.data));
                                              localStorage.setItem('store_item_rating_member_idx', index);
                                              navigate("/ad_analysis_shop_rating_member");
                                            })
                                            .catch(error => {
                                              console.error('세션 데이터를 가져오는데 실패함', error);
                                            });
                                    }}>{analysis_item_rating.rating_count}</a></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div >
    )
}

export default Ad_analysis_shop_rating;