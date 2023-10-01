import './form.css'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import {Button, IconButton, InputAdornment, Slider, Switch, TextField,} from "@mui/material";
import KeyIcon from '@mui/icons-material/Key';
import {useState} from "react";
import axios from "axios";
const url='http://localhost:8000/'

export default function Form(){
    const [useNums,setUseNums]=useState(false);
    const [useSym,setUseSym]=useState(false);
    const [useUcase,setUcase]=useState(false);
    const [useLcase,setLcase]=useState(false);
    const [plen,setPlen]=useState(8);
    const [showOpts,setShowOpts]=useState(true);

    const [emailId,setEmailId]=useState('');
    const [password,setPassword]=useState('');



    function generatePassword() {
        let constraints={
            num:useNums,
            sym:useSym,
            lcase:useLcase,
            ucase:useUcase,
            len:plen,
        }
        axios.post(url+'genPass',constraints).then( (val)=> {
                setPassword(val.data);
            }
        ).catch((err)=>console.error(err));
    }

    function createAcc() {
        if(emailId.length && password.length){
            let creds={id:emailId,pass:password};
            axios.post(url+'createAcc',creds).then( (val)=> {
                    alert("Account Created");
                }
            ).catch(()=>alert("Invalid Credentials"));
        }
        else alert("Invalid Credentials");
    }

    function passlength(e) {
        setPlen(e.target.value)
    }

    function handleEmail(e) {
        setEmailId(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    return (
        <div className={"formWrapper"}>
            <div className="heading">SignUp</div>
            <form onSubmit={createAcc}>
                <div className="fields">
                    <div className="left">
                        <TextField fullWidth={true } className={"txtField"}
                                   label="Email Id"
                                   id="outlined-start-adornment"
                                   color={"secondary"}
                                   value={emailId}
                                   onChange={handleEmail}
                                   InputProps={{
                                       startAdornment: <InputAdornment position="start"><AlternateEmailIcon/></InputAdornment>,
                                   }}
                        />

                        <TextField fullWidth={true } className={"txtField"}
                                   label="Password"
                                   id="outlined-start-adornment"
                                   color={"secondary"}
                                   value={password}
                                   onChange={handlePassword}
                                   InputProps={{
                                       startAdornment: <InputAdornment position="start"><KeyIcon/></InputAdornment>,
                                   }}
                        />
                    </div>
                    <div className="right">
                        <IconButton aria-label="delete">
                            <ArrowCircleRightIcon className={"loginBtn"}/>
                        </IconButton>
                    </div>
                </div>

                <div className="genpass">
                    <h3 className={"passtxt"}><span onClick={()=> setShowOpts(!showOpts)}>Suggest Password?</span></h3>
                    <div className="options" hidden={showOpts}>
                        <div><span>Use Numbers</span><Switch onChange={()=>setUseNums((curr)=>!curr)}/></div>
                        <div><span>Use Symbols</span><Switch onChange={() => setUseSym((curr)=>!curr)}/></div>
                        <div><span>Use Lower Case</span><Switch onChange={() => setLcase((curr)=>!curr)}/></div>
                        <div><span>Use Upper Case</span><Switch onChange={() => setUcase((curr)=>!curr)}/></div>
                        <div><span>Password Length</span><Slider min={8} max={24} defaultValue={8} aria-label="Default" valueLabelDisplay="auto" value={plen} onChange={passlength} /></div>
                        <Button onClick={generatePassword} variant="outlined" className={"gPassBtn"}>Generate Password</Button>
                    </div>
                </div>

            </form>
        </div>
    );
}