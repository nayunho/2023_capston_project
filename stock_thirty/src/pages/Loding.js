import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Loding() {

    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get("code");
    useEffect(() => {
        axios.get('/kakao/oauth', {
            params: {
                code: code,
            }
        }).catch(function () {
            console.log('실패함')
        })
    }, [])
    let [a, setA] = useState("");
    useEffect(() => {
        axios.get("http://localhost:8080/sign_up").then((res) => {
                localStorage.setItem('Kakao_name', JSON.stringify(res.data.kakaoname));
                // navigate("/");
        }).catch(() => {
                console.log('실패함')
            })
    }, [a])
    let [temp, setTemp] = useState(true);
    useEffect(() => {
        //여기적은 코드는 컴포넌트 로드 & 업데이트 마다 실행됨
        let timer = setTimeout(() => { setTemp(false) }, 2000);
        return () => {
            clearTimeout(timer);
        }
    }, [temp])
    return (
        <div className="LoginHandeler">
            <div className="alert alert-warning">
                로딩중
            </div>
        </div>
    );
};

export default Loding;