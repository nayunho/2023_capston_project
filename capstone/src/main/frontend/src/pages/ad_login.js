import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './../App.css';
import axios from 'axios';
function Ad_login() {

        let [id ,setId] = useState("");
        let [pw ,setPw] = useState("");
        let navigate = useNavigate();
    return (
        <div className='ad_login_wrap'>
            <div className="login_container">
                <div className="login_title">
                    <div className="login_m">재고30</div>
                    <div className="login_s">Administration</div>
                </div>
                <div className="login_info">
                    <table className='login_table'>
                        <tr className='login_tr'>
                            <td class="login_one">ID</td><td className='login_td'><input className='text3' type="text" name="id" placeholder="아이디를 입력하세요" onChange={(e)=>{
                                setId(e.target.value);
                            }}
                            /></td>
                        </tr>
                        <tr className='login_tr'>
                        <td className="login_two">PW</td>
                        <td className='login_td'><input className='password3' type="password" name="pw" placeholder="비밀번호를 입력하세요" onChange={(e)=>{
                                setPw(e.target.value);
                            }}/></td>
                        </tr>
                    </table>
                    <div className="ad_login_submit"  onClick={()=>{
                    console.log(id);
                        axios.post('/admin/login', {
                              id:id,
                              pw:pw
                          })
                            .then(response => {
                              navigate(`${response.data}`);
                            })
                            .catch(error => {
                              console.error('세션 데이터를 가져오는데 실패함', error);
                            });
                           setId("");
                           setPw("");
                    }} >Login</div>
                </div>
            </div>
            </div>
    )
}

export default Ad_login;