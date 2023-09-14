import { TextField, Button, InputAdornment } from "@mui/material";
import './../App.css';
import { useNavigate } from "react-router-dom";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import LockIcon from "@material-ui/icons/Lock";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import EmailIcon from "@material-ui/icons/Email";
import axios from "axios";
import { lazy, Suspense, createContext, useState, useEffect } from "react";

function Join() {
    let navigate = useNavigate();

    axios.get("http://localhost:8080/sign_up").then((res) => {
        console.log(res.data)
    })
        .catch(() => {  
            console.log('실패함')
        })
    const [temp, SetTemp] = useState(true);

    const [id, setId] = useState("2");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    useEffect(() => {
        console.log(id);
        console.log(password);
        console.log(email);
        console.log(name);
        console.log(number);
        sendUserData();
    }, [temp])
    return (
        <div className="wrap" style={{ backgroundColor: "rgb(209, 209, 214)" }}>

            <div className="joinWrap">
                <div className="login">
                    <p>Sign Up</p>
                    <div id="textFeild">
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start" >
                                        <PermIdentityIcon />
                                    </InputAdornment>
                                ),
                            }}
                            label="ID"
                            required
                            name="id"
                            autoComplete="id"
                            autoFocus
                            onChange={(e) => {
                                setId(e.target.value);
                            }} />
                    </div>
                    <div id="textFeild">
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon />
                                    </InputAdornment>
                                ),
                            }}
                            label="password"
                            type="password"
                            required
                            name="password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }} />
                    </div>
                    <div id="textFeild">
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PermIdentityIcon />
                                    </InputAdornment>
                                ),
                            }}
                            label="Name"
                            required
                            name="name"
                            onChange={(e) => {
                                setName(e.target.value);
                            }} />
                    </div>
                    <div id="textFeild">
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PhoneAndroidIcon />
                                    </InputAdornment>
                                ),
                            }}
                            label="Phone Number"
                            required
                            name="pn"
                            onChange={(e) => {
                                setNumber(e.target.value);
                            }} />
                    </div>
                    <div id="textFeild">
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>
                                ),
                            }}
                            label="Email address"
                            required
                            name="email"
                            autoComplete="email"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }} />
                    </div>

                    <Button onClick={() => { SetTemp(!temp) }} id="textFeild" className="btn" type="submit" Width variant="contained"><span>sign up</span></Button>

                </div>
                <div className="imgarea">
                    <div className="text">
                        <h2>제목</h2>
                        <span>환영합니다</span>
                    </div>
                </div>
            </div>
        </div>
    )
    function sendUserData(){
        return(
            axios.get('/sign_up', {
                params: {
                    id: id,
                    name:name,
                    password:password,
                    email:email,
                    number:number,
                }
            }).catch(function () {
                console.log('실패함')
            })
        )
    }
}

export default Join;