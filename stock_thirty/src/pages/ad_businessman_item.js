import React, { useState } from 'react';
import './../App.css';
function Ad_businessman_item() {
    let a =localStorage.getItem("store_item");
    var storeName = localStorage.getItem("storeName");
    var store_item = JSON.parse(a);
    function formatDate(dateString) {
     const originalDate = new Date(dateString);
     const options = {
       year: "numeric",
       month: "2-digit",
       day: "2-digit",
       hour: "2-digit",
       minute: "2-digit",
       second: "2-digit",
     };
     const formattedDate = originalDate.toLocaleString("ko-KR", options);
     return formattedDate;
   }
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
                <div className="ad_title"><span style ={{color:"blue"}}>{storeName}</span> 상품({store_item.length})</div>
                <div className="tb">
                    <table className='ad_table'>
                        <thead>
                            <tr style={{ height: "50px", fontSize: "25px", fontWeight: "700" }}>
                                <td style={{ width: "15%" }}>{}</td>
                                <td style={{ width: "25%" }}>이름</td>
                                <td style={{ width: "12.5%" }}>할인 가격</td>
                                <td style={{ width: "12.5%" }}>남은 물품</td>
                                <td style={{ width: "17.5%" }}>등록일</td>
                                <td style={{ width: "17.5%" }}>마감일</td>
                            </tr>
                        </thead>
                        <tbody>
                        {store_item.map((store_item, index) => (
                                  <tr style={{ height: "50px", fontSize: "20px" }}>
                                  <td style={{ fontWeight: "700" }}>{store_item.itemidx}</td>
                                  <td>{store_item.itemname}</td>
                                  <td>{store_item.salecost}</td>
                                  <td>{store_item.quantity}</td>
                                  <td>{formatDate(store_item.starttime)}</td>
                                  <td>{formatDate(store_item.endtime)}</td>
                              </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div >
    )
}

export default Ad_businessman_item;