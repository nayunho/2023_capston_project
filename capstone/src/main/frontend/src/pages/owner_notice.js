import React, { useState } from 'react';
import './../App.css';
import axios from "axios";
import { useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Avatar from 'react-avatar';
import StoreIcon from '@mui/icons-material/Store';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { Outlet } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import HouseIcon from '@mui/icons-material/House';
function Owner_notice() {
    let [recall, setRecall] = useState(false);
    let [temp1, setTemp1] = useState(true);
    let [temp, setTemp] = useState(true);
    const [userInfo, setUserInfo] = useState("");
    const fileInput = useRef(null);
    let [temp2, setTemp2] = useState(true);
    let [temp3, setTemp3] = useState(true);
    let [shopsData, setShopsData] = useState([]);
    let navigate = useNavigate();
    function switchTemp() {
        setTemp(!temp);
    }
    useEffect(() => {
        // 스프링에서 세션 데이터를 가져오는 호출
        axios.get('/getSessionMember')
            .then(response => {
                const userData = response.data;
                console.log(userData.redirect)
                if (userData.redirect) {
                    console.log("페이지 이동");
                    window.location.href = userData.redirect;
                } else {
                    setUserInfo(userData);
                    console.log("세션데이터가 존재");
                    console.log(userData.id);
                }
            })
            .catch(error => {
                console.error('세션 데이터를 가져오는데 실패함', error);
            });
    }, [recall]);
    /*공지사항 가져오기*/
    let [noticepost,setNoticePost] = useState([{noticeIdx:"1",title:"sss",content:"ssss"},{noticeIdx:"2",title:"aaaa",content:"aaaaa"},{noticeIdx:"3",title:"dddd",content:"ddddd"},{noticeIdx:"1",title:"sss",content:"ssss"},{noticeIdx:"1",title:"sss",content:"ssss"},{noticeIdx:"1",title:"sss",content:"ssss"},{noticeIdx:"1",title:"sss",content:"ssss"},{noticeIdx:"1",title:"sss",content:"ssss"},{noticeIdx:"1",title:"sss",content:"ssss"},{noticeIdx:"1",title:"sss",content:"ssss"},{noticeIdx:"1",title:"sss",content:"ssss"}]);
    useEffect(() => {
        axios.get('/manager/notice/readall')
            .then(response => {
                const noticepost = response.data;
                console.log(noticepost);
                console.log(noticepost.redirect)
                if (noticepost.redirect) {
                    console.log("페이지 이동");
                    window.location.href = noticepost.redirect;
                } else {
                    setNoticePost(noticepost);
                    console.log("세션데이터가 존재");
                }
            },[userInfo]);
    }, []);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const postsPerPage = 10;//페이지당 게시글수
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = noticepost.slice(indexOfFirstPost, indexOfLastPost);

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(noticepost.length / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    const handleClick = () => {
        if (userInfo.role === '사용자') {
          window.location.href="/home_user";
        } else if (userInfo.role === '상업자') {
          window.location.href="/home_owner";
        }
     };
    return (
        <div>
            <div className='owner_noticeWrap' >
            <header id='header' className={`${temp1 == true ? "" : "header_hidden"}`} style={{
                    backgroundColor: 'white', // 헤더 배경색
                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)', // 그림자 효과
                    position: 'sticky', // 스크롤과 함께 고정
                    top: 0, // 화면 상단에 고정
                    zIndex: 1, // 다른 요소 위에 나타나도록 설정
                    borderRadius: "20px"
                }}>
                    <div className='logo'><a onClick={handleClick} style={{ cursor: 'pointer' }}> 재고 30 </a></div>
                    <nav className='nav'>
                        <ul>
                            <li>
                                <a href="/owner_main_page" style={{ cursor: "pointer" }}>
                                    <HouseIcon fontSize="large" />
                                </a>
                            </li>
                            <li>
                                <a onClick={() => {
                                    setTemp(switchTemp);
                                }} style={{ cursor: "pointer" }} href='/owner_storelist'>
                                    내가게
                                </a>
                            </li>
                            <li>
                                <a href="/owner_addmenu" style={{ cursor: "pointer" }}>
                                    상품등록
                                </a>
                            </li>
                            <li>
                                <a href="/owner_notice">
                                    공지사항
                                </a>
                            </li>
                            <li>
                            <a href="/" onClick={() => {
                                        axios.get('/SessionLogout', {
                                        })
                                        window.alert("로그아웃되었습니다.");
                                    }
                                    }>
                                        <LogoutIcon fontSize="large" />
                                    </a>
                            </li>
                        </ul></nav>
                </header>
                <div className={`banner ${temp1 == true ? "" : "banner_hidden"}`} style={{ borderRadius: "20px", boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)' }}>
                    <div className={`text ${temp1 == true ? "" : "contents_hidden"}`}>
                        <span >가게를 등록하여</span><br />
                        <span>자신의 가게를 보여주세요!</span>
                    </div>
                </div>
                <div className={`${temp1 == true ? "" : "contents_hidden"}`}>
                    <div className='notice_title'>공지사항</div>
                    <div className='notice_title_exception'>(주)재고30의 공지사항을 알려드립니다.</div>
                </div>
                <div className='notice_contents' style={{ margin: "0 auto", height: "500px" }}>
                    <table className={`notice_table ${temp1 == true ? "" : "contents_hidden"}`} style={{ borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.5)' }} >
                        <tr style={{ fontSize: "25px", backgroundColor: "rgba(0,0,0,0.1)" }}>
                            <th style={{ width: "150px", height: "40px", borderTopLeftRadius: '20px' }}>No</th>
                            <th>제목</th>
                            <th style={{ width: "150px", borderTopRightRadius: '20px' }}>등록일</th>
                        </tr>
                        {currentPosts.map((nti, index) => (
                            <tr className='notice_main_content' key={index} style={{ height: "46px", fontSize: "20px" }}>
                                <td id="notice_row">{nti.noticeIdx}</td>
                                <td id="notice_row" onClick= {()=>{
                                    navigate(`/owner_noticeview/${nti.noticeIdx}`)
                                    axios.get('/manager/notice/read',{
                                        params: {
                                            noticeIdx:nti.noticeIdx,
                                            title:nti.title
                                        }
                                    })
                                    .then(response => {
                                        const not = response.data;
                                        const noticep = `?notititle=${not.title}&notiDate=${not.noticeDate}&noticontent=${not.content}`;
                                        const popupURL = `/owner_noticeview/${nti.noticeIdx}${noticep}`;
                                        navigate(popupURL);
                                      })
                                      .catch(error => {
                                        console.error('세션 데이터를 가져오는데 실패함', error);
                                      });
                                }} style={{ textAlign: "left" }}><span>{nti.title}</span></td>
                                <td id="notice_row">{nti.noticeDate}</td>
                            </tr>
                        ))}

                    </table>
                </div>
                <div>



                    {/* 페이지 번호 표시 */}
                    <div className={`numberList ${temp1 == true ? "" : "contents_hidden"}`} >
                        {/* 이전 페이지로 이동 버튼 */}

                        <button className="prev" style={{ cursor: "pointer", margin: "0px 10px", fontSize: "20px", padding: "0px 10px", boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.5)' }} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>◀</button>
                        {pageNumbers.map(number => (
                            <a style={{ cursor: "pointer", fontSize: "20px", padding: "0px 10px", width: "100%" }} key={number} onClick={() => setCurrentPage(number)}>
                                {number}
                            </a>
                        ))}
                        {/* 다음 페이지로 이동 버튼 */}
                        <button className="next" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(noticepost.length / postsPerPage)} style={{ cursor: "pointer", margin: "0px 10px", fontSize: "20px", padding: "0px 10px", boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.5)' }}>▶️</button>
                    </div>


                </div>
                <footer id="footer" className={`${temp1 == true ? "" : "footer_hidden"}`} style={{
                    backgroundColor: 'white', // 헤더 배경색
                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)', // 그림자 효과
                    position: 'sticky', // 스크롤과 함께 고정
                    bottom: 0, // 화면 상단에 고정
                    zIndex: 1, // 다른 요소 위에 나타나도록 설정
                    borderRadius: "20px",
                    marginTop: "32px",
                    height:"85px",
                }}>
                    <div className='footer1'><a href="/"><Outlet></Outlet>재고 30</a></div>
                    <div className='footer2'>개인정보 및 보호정책 등</div>
                </footer>
                <div className={`${temp1 == true ? "popup_view_none" : "popup_view"}`} style={{top:"50%"}}>
                    <div>
                        <Avatar
                            src={Image}
                            style={{ margin: '20px' }}
                            size={150}
                            onClick={() => { fileInput.current.click() }} />
                        <div><a href='/' style={{ color: "gray", textDecorationLine: 'underline' }}>회원 정보 수정</a></div>
                        <div><h1 style={{ margin: "20px 0px 30px 30px" }}>{userInfo.nickname}
                            <a onClick={() => {
                                setTemp2(false)
                            }}><DriveFileRenameOutlineIcon fontSize="midium" className="popup_log_out" style={{ cursor: "pointer", margin: "0px 0px -5px 7px" }}></DriveFileRenameOutlineIcon></a>
                            <a href="/" onClick={() => {
                                window.alert("로그아웃되었습니다.");
                            }
                            } style={{ cursor: "pointer" }}>
                                <ExitToAppIcon fontSize="midium" className="popup_log_out" style={{ margin: "0px 0px -5px 7px" }} />
                            </a>
                        </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Owner_notice;