import React, { useEffect,useState } from 'react';
import './../App.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Ad_analysis_shop() {
    let [store, setStore] = useState([]);
    useEffect(() => {
        axios.get('/manager/analysis/shop')
            .then(response => {
                setStore(response.data);
            })
            .catch(error => {
                console.error('세션 데이터를 가져오는데 실패함', error);
            });
    }, []);
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
                <div className="ad_title">가게 분석({store.length})</div>
                <div className="tb">
                    <table className="ad_table">
                        <thead >
                            <tr style={{ height: "50px", fontSize: "25px", fontWeight: "700" }}>
                                <td style={{ width: "15%" }}>IDX</td>
                                <td style={{ width: "45%" }}>가게 이름</td>
                                <td style={{ width: "20%" }}>평점</td>
                                <td style={{ width: "20%" }}>예약자 수</td>
                            </tr>
                        </thead>
                        <tbody>
                        {store.map((store, index) => (
                                   <tr style={{ height: "50px", fontSize: "20px" }}>
                                   <td style={{ fontWeight: "700" }}>{store.shopidx}</td>
                                   <td><a  style={{textDecoration:"underline",cursor:"pointer"}} onClick={()=>{
                                            axios.get('/manager/analysis/item', {
                                                params: {
                                                  shopidx: store.shopidx
                                                }
                                              })
                                                .then(response => {
                                                  localStorage.setItem('store_analysis_item', JSON.stringify(response.data));
                                                  localStorage.setItem('store_analysis_store_name',store.shopname );
                                                  navigate("/ad_analysis_shop_item");
                                                })
                                                .catch(error => {
                                                  console.error('세션 데이터를 가져오는데 실패함', error);
                                                });
                                        }}>{store.shopname}</a></td>
                                   <td><a  style={{textDecoration:"underline",cursor:"pointer"}} onClick={()=>{
                                            axios.get('/manager/analysis/rating', {
                                                params: {
                                                  shopidx: store.shopidx
                                                }
                                              })
                                                .then(response => {
                                                  localStorage.setItem('store_item_rating', JSON.stringify(response.data));
                                                  localStorage.setItem('store_analysis_store_name',store.shopname ); 
                                                  localStorage.setItem('store_analysis_store_idx',store.shopidx ); 
                                                  navigate("/ad_analysis_shop_rating");
                                                })
                                                .catch(error => {
                                                  console.error('세션 데이터를 가져오는데 실패함', error);
                                                });
                                        }}>{store.rating}</a></td>
                                   <td><a  style={{textDecoration:"underline",cursor:"pointer"}} onClick={()=>{
                                            axios.get('/manager/analysis/reservation/member', {
                                                params: {
                                                  shopidx: store.shopidx
                                                }
                                              })
                                                .then(response => {
                                                  localStorage.setItem('store_reservation_member', JSON.stringify(response.data));
                                                  localStorage.setItem('store_analysis_store_name', store.shopname); 
                                                  navigate("/ad_analysis_shop_num");
                                                })
                                                .catch(error => {
                                                  console.error('세션 데이터를 가져오는데 실패함', error);
                                                });
                                        }}>{store.reservater}</a></td>
                               </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div >
    )
}

export default Ad_analysis_shop;