import React, { useState } from "react"; 
import { connect } from "react-redux";
import "../static/css/home/index.css";

import Header from "../components/includes/mobile_header.js"; 
import Cashbacknav from "../components/cashbacknav";   
import { loginSuc, add_wallet, disp_session, logOut } from "../redux";
 
function Home({ appState}) {     
 

  return   (
    <div id="body bg">   
      <>  
        <div className="mobile">
          <div className="header_footer"> 
            <Header />
          </div>

          <div>
            <div>
              <div
                style={{
                  textAlign: "center",
                  marginTop: "10px",
                  background: " #f4f6f7",
                  position: "sticky",
                  top: "0px",
                  zIndex: "1100",
                  padding: "0px",
                }}
              >  
              </div>{" "}
              <Cashbacknav /> 
            </div>
          </div>
        </div>
  
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
