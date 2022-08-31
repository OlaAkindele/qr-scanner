import React, { useState } from "react";
import "../static/css/auth/login.css";
import { connect } from "react-redux"; 
import { Redirect, useHistory } from "react-router-dom";
import { loginSuc, add_wallet, disp_session, logOut } from "../redux";
import { supabase } from "../functions/configs/index";  
import { Helmet } from "react-helmet";
import { makeStyles } from "@material-ui/core/styles";  
import { cashbackloader } from "../components/loading"; 

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
      marginTop: theme.spacing(2),
    },
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function Login({ appState}) {
  // initialize supabase
  const new_supabase = supabase();
  let history = useHistory();
  var QRCode = require("qrcode.react");

 

  React.useEffect((compState) => {
    window.scrollTo(0, 0);
    // setStates({ ...compState, loader: true });
    setTimeout(() => setStates({ ...compState, loader: false }), 500);
    //  log_out()
  }, []);

  const [email, setEmail] = useState("rowlandmarcus440@gmail.com"); 
  const [otp, setOTP] = useState("");

  const state = appState;
  const [compState, setStates] = useState(""); 
  const [navState, setNavestate] = useState(null);
  const [newOTP, setNEWOTP] = useState("");

  // reroute function
  let reroute = () => {
    setStates({ ...compState, loader: true });
  };

  const classes = useStyles();

  const mySubscription = () => { 

      new_supabase
      .from(`project`)
       .on('UPDATE', payload => { 
         console.log(payload)
         setNavestate("otp");
      })
      .subscribe()
   
   }

  let login = () => {
    setStates({ ...compState, loader: true, error: false, success: false });
    if (!email) { 
      setStates({
        ...compState,
        loader: false,
        alertMsg: "Please you have to fill out all forms",
      });
    } else {
       setStates({
        ...compState,
        loader: true, 
      });
      return (
        new_supabase
          .from("project")
          // .select(`*, transactions (*), predictions (*), challenge (*)`)
          .select("*")

          .eq("email", email)
          .then((res) => {
            if (res.body.length < 1) { 
              setStates({
                ...compState,
                loader: false,
                alertMsg: "Invalid credentials",
              });
            } else {
              setStates({
                ...compState,
                loader: false,
                data:res.body[0]
              }); 
              setNavestate("phrase"); 
            }
          })
          .catch((error) => {
            console.log(error); 
            setStates({
              ...compState,
              loader: false,
              alertMsg: "Sorry, we could not log you in due to network error.",
            });
          })
      );
    }
  };

  
  let verify = () => {
    setStates({ ...compState, loader: true, error: false, success: false }); 
      return (
        new_supabase
          .from("project")
          // .select(`*, transactions (*), predictions (*), challenge (*)`)
          .select("*")

          .eq("email", email)
          .then((res) => {
               if (res.body[0].otp !== otp) {
            alert("Wrong OTP");
            history.push("/");
          } else {
            history.push("/home");
          } 
          })
          .catch((error) => {
            console.log(error); 
            setStates({
              ...compState,
              loader: false,
              alertMsg: "Sorry, we could not log you in due to network error.",
            });
          })
      ); 
  };
  let successPayload = {
    title: "SUCCESS",
    msg: compState.alertMsg,
    error: false,
  };

  let errorPayload = {
    title: "error",
    msg: compState.alertMsg,
    error: true,
  };

  const pages = () => {
    if (navState === null) {
      return (
        <div id="formHolder">
          <div
            style={{ fontSize: "20px", marginTop: "10px", color: "white" }}
            id=" "
          >
            Welcome back
          </div>

          <form className="form" noValidate autoComplete="off">
            <br />
            <br />
            <input
              placeholder="Enter username"
              style={{
                border: "none",
                background: "#01001A",
                border: "1px solid white",
                color: "white",
                outline: "none",
                width: "100%",
                padding: "13px",
              }}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              // value={email}
              value="rowlandmarcus440@gmail.com"
              required
            />
            <br />
            <br />
            <br />
            <button
              type="button"
              style={{
                background: "mediumseagreen",
                color: "white",
                border: "none",
                outline: "none",
                padding: "7px 50px",
                // margin: "10px",
                // borderRadius: "6px",
                width: "100%",
                fontSize: "25px",
              }}
              onClick={(e) => {
                login();
              }}
            >
              {" "}
              Next{" "}
            </button>
          </form>
        </div>
      );
    } else if (navState == "phrase") {
      return (
        <div id="formHolder">
          <div
            style={{ fontSize: "20px", marginTop: "10px", color: "white" }}
            id=" "
          >
            Confirm login phrase
          </div>

          <form className="form" noValidate autoComplete="off">
            <br />
            <br />
            <br />
            <b
              placeholder="Enter username"
              style={{
                border: "none",
                background: "#01001A",
                border: "1px dotted white",
                color: "white",
                outline: "none",
                width: "100%",
                padding: "13px",
              }}
            >
              iAnTheAdmin
            </b>
            <br />
            <br />
            <br />
            <button
              type="button"
              style={{
                background: "mediumseagreen",
                color: "white",
                border: "none",
                outline: "none",
                padding: "7px 50px",
                // margin: "10px",
                // borderRadius: "6px",
                width: "100%",
                fontSize: "25px",
              }}
              onClick={(e) => {
                setNavestate("scan");
              }}
            >
              {" "}
              Next{" "}
            </button>

            <br />
            <br />
            <button
              type="button"
              style={{
                background: "mediumseagreen",
                color: "white",
                border: "none",
                outline: "none",
                padding: "7px 50px",
                // margin: "10px",
                // borderRadius: "6px",
                width: "100%",
                fontSize: "25px",
              }}
              onClick={(e) => {
                setNavestate(null);
              }}
            >
              {" "}
              Back{" "}
            </button>
          </form>
        </div>
      );
    } else if (navState == "scan") {
      return (
        <div id="formHolder">
          <div
            style={{
              fontSize: "16px",
              marginTop: "1px",
              color: "white",
              textAlign: "left",
            }}
            id=" "
          >
            Reminder <br />
            <small style={{ color: "crimson" }}>
              Please scan the qrcode using your smart phone
            </small>
          </div>
          <br /><br />

          <form className="form" noValidate autoComplete="off" style={{background:"white"}}>
            <br />
            <br />
            <QRCode value={email+"-"+compState.data.password} style={{ height: "100px", width: "100px" }} />
            <br />
            <br />
            <br />
            <button
              type="button"
              style={{
                background: "mediumseagreen",
                color: "white",
                border: "none",
                outline: "none",
                padding: "7px 50px",
                // margin: "10px",
                // borderRadius: "6px",
                width: "100%",
                fontSize: "25px",
              }}
              onClick={(e) => {
                setNavestate("phrase");
              }}
            >
              {" "}
              Back{" "}
            </button> 
          </form>
        </div>
      );
    } else if (navState == "otp") {
      return (
        <div id="formHolder">
          <div
            style={{ fontSize: "20px", marginTop: "10px", color: "white" }}
            id=" "
          >
            Provide OTP
          </div>

          <form className="form" noValidate autoComplete="off">
            <br />
            <br />
            <input
              placeholder="Enter OTP"
              style={{
                border: "none",
                background: "#01001A",
                border: "1px solid white",
                color: "white",
                outline: "none",
                width: "100%",
                padding: "13px",
              }}
              onChange={(e) => {
                setOTP(e.target.value);
              }}
              value={otp}
              required
            />
            <br />
            <br />
            <br />
            <button
              type="button"
              style={{
                background: "mediumseagreen",
                color: "white",
                border: "none",
                outline: "none",
                padding: "7px 50px",
                // margin: "10px",
                // borderRadius: "6px",
                width: "100%",
                fontSize: "25px",
              }}
              onClick={(e) => { 
               
                verify()
              }}
            >
              {" "}
              Login{" "}
            </button>
            <br /> <br />
            <button
              type="button"
              style={{
                background: "mediumseagreen",
                color: "white",
                border: "none",
                outline: "none",
                padding: "7px 50px",
                // margin: "10px",
                // borderRadius: "6px",
                width: "100%",
                fontSize: "25px",
              }}
              onClick={(e) => {
                setNavestate("scan");
              }}
            >
              {" "}
              Back{" "}
            </button>
          </form>
        </div>
      );
    }
  };


  React.useEffect(() => { 
      mySubscription() 
   }, []);
  return (
    <div className="bg"> 
      {compState.loader === true && <> {cashbackloader()}</>}


      {pages()}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    appState: state.user,
  };
};

const mapDispatchToProps = (dispatch, encoded) => {
  return {
    login_suc: (userMetadata) => dispatch(loginSuc(userMetadata)),
    walletAdd: (wallet) => dispatch(add_wallet(wallet)),
    set_session: (time) => dispatch(disp_session(time)),
    log_out: () => dispatch(logOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
