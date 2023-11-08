import React, { useState } from 'react';
import './../App.css';
import { useEffect, useRef } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Ad_store_management() {
    let [store,setStore]=useState([])
    useEffect(() => {
        axios.get('/manager/analysis/shop')
        .then(response =>{
            const storeData = response.data;
            setStore(storeData);
        })
        .catch(error => {
            console.error('세션 데이터를 가져오는데 실패함', error);
          });
    },[]);
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
                    <div className="sub"><a href="/ad_businessman">상업자</a></div>
                    <div className="sub"><a href="/ad_admin">관리자</a></div>
                </div>
                <div className="content">
                    <div>콘텐츠 관리</div>
                    <div className="sub"><a href="/ad_inquiry">문의 내역</a></div>
                    <div className="sub"><a href="/ad_notice">공지사항</a></div>
                    <div className="sub"><a href="/ad_store_managemnet" style={{ color: "red" }}>가게 관리</a></div>
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
                <div class="ad_title" style={{ marginTop: "50px", marginLeft: "30px", fontWeight: "bolder", fontSize: "30px" }}>전체 가게({store.length})</div>
                <div class="tb">
                    <table className='ad_table'>
                        <thead>
                            <tr style={{ height: "50px", fontSize: "25px", fontWeight: "700" }}>
                                <td style={{ width: "10%" }}>IDX</td>
                                <td style={{ width: "20%" }}>이미지</td>
                                <td style={{ width: "20%" }}>가게 이름</td>
                                <td style={{ width: "30%" }}>등록일</td>
                                <td style={{ width: "20%" }}>삭제</td>
                            </tr>
                        </thead>
                        <tbody>
                            {store.map((store, index) => (
                                <tr style={{ height: "50px", fontSize: "20px" }}>
                                    <td style={{ fontWeight: "700" }}>{store.shopidx}</td>
                                    <td style={{height: "170px"}}><img src={"/shopimages/" + `${store.imagefilename}`} alt={store.imagefilename} style={{ backgroundCover: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", width: "130px", height: "140px", lineHeight : "170px"}} /></td>
                                    <td>{store.shopname}</td>
                                    <td>{store.registrationDate}</td>
                                    <td className='edit_store_management'><button className='edit_store_management_btn' onClick={()=>{
                                        axios.delete('/shop/delete', {
                                            params: {
                                              shopidx:store.shopidx,
                                            }
                                          })
                                            .then(response => {
                                                window.alert("삭제되었습니다.")
                                             window.location.href = "/ad_store_management"                                                
                                            })
                                            .catch(error => {
                                              console.error('세션 데이터를 가져오는데 실패함', error);
                                            });
                                    }}>삭제</button></td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </main>
        </div >
    )
}

export default Ad_store_management;