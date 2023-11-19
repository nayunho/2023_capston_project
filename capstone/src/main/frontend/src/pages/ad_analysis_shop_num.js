import React, { useEffect, useState } from 'react';
import './../App.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Ad_analysis_shop_num() {
    let a =localStorage.getItem("store_reservation_member");
    var analysis_item_reservation_member = JSON.parse(a);
    let store_name =localStorage.getItem("store_analysis_store_name");
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
                    <div><a href="/ad_login" id="logout">로그아웃</a></div>
                </div>
            </div>

            <main className='ad_main'>
                <div className="ad_title"><span style={{color:"blue"}}>{store_name}</span> 예약자({analysis_item_reservation_member.length})</div>
                <div className="tb">
                    <table className='ad_table'>
                        <thead>
                            <tr style={{ height: "50px", fontSize: "25px", fontWeight: "700" }}>
                                <td style={{ width: "15%" }}>회원번호</td>
                                <td style={{ width: "40%" }}>아이디</td>
                                <td style={{ width: "20%" }}>상품 이름</td>
                                <td style={{ width: "10%" }}>예약 수</td>
                                <td style={{ width: "15%" }}>참여일</td>
                            </tr>
                        </thead>
                        <tbody>
                        {analysis_item_reservation_member.map((analysis_item_reservation_member, index) => (
                                    <tr style={{ height: "50px", fontSize: "20px" }}>
                                    <td style={{ fontWeight: "700" }}>{analysis_item_reservation_member.memberidx}</td>
                                    <td>{analysis_item_reservation_member.id}</td>
                                    <td>{analysis_item_reservation_member.itemname}</td>
                                    <td>{analysis_item_reservation_member.number}</td>
                                    <td>{analysis_item_reservation_member.redate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div >
    )
}

export default Ad_analysis_shop_num;