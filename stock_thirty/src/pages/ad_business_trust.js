import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './../App.css';
import axios from 'axios';
function Ad_business_trust() {
    let a =localStorage.getItem("user_store");
    var user = JSON.parse(a);
    let b =localStorage.getItem("member");
    var member = JSON.parse(b);
    let navigate = useNavigate();
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
                    <div class="sub"><a href="/ad_analysis_shop">가게 분석</a></div>
                </div>
                <div className="logout">
                    <div><a href="#" id="logout">로그아웃</a></div>
                </div>
            </div>

            <main className='ad_main'>
                <div className="ad_title" ><span style ={{color:"blue"}}>{member.name}</span>님의 방문가게({user.length})</div>
                <div className="comment" style={{ float: "right", marginTop: "0px", marginRight: "90px", fontSize: "20px" }}><span>🟥</span><span>신뢰도 차감</span></div>

                <div className="tb">
                    <table className='ad_table'>
                        <thead>
                            <tr style={{ height: "50px", fontSize: "25px", fontWeight: "700" }}>
                                <td style={{ width: "10%" }}>가게 번호</td>
                                <td style={{ width: "40%" }}>가게 이름</td>
                                <td style={{ width: "40%" }}>가게 주소</td>
                                <td style={{ width: "10%" }}>감점 횟수</td>
                            </tr>
                        </thead>
                        <tbody>
                        {user.map((user,index) => (
                            <tr style={{ height: "50px", fontSize: "20px" }}>
                                <td style={{ fontWeight: "700" }}>{user.shopidx}</td>
                                <td><a style={{ textDecoration: "underline" , cursor:"pointer"}} onClick={()=>{
                                    axios.get('/manager/member/user/trustmanage/item', {
                                        params: {
                                          shopidx:user.shopidx,
                                          memberidx:member.memberIdx
                                        }
                                      })
                                        .then(response => {
                                          localStorage.setItem('user_store_content', JSON.stringify(response.data));
                                          localStorage.setItem('shop', JSON.stringify(user));  
                                          navigate("/ad_business_trust_content");
                                        })
                                        .catch(error => {
                                          console.error('세션 데이터를 가져오는데 실패함', error);
                                        });
                                }}>{user.shopname}</a></td>
                                <td>{user.shopaddress}</td>
                                <td>{user.duplicateCount}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}

export default Ad_business_trust;