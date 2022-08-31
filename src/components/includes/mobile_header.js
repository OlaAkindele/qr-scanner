import "../../static/css/home/index.css";
import React, { useState } from "react"; 
import { connect } from "react-redux"; 
import { useHistory, Link } from "react-router-dom"; 
import { 
  NotificationsActiveOutlined, 
} from "@material-ui/icons";   
import { 
  ListItem, 
  ListItemAvatar, 
} from "@mui/material";  
 
function Header({ appState }) { 
  let history = useHistory();

  

  const [drawerState, setDrawerState] = React.useState({
    bottom: false,
  }); 
  

  return  (
    <div> 
      <div> 
        <ListItem
          style={{
            marginTop: "10px",
            background: " ",
            position: "sticky",
            top: "0px",
            zIndex: "1000",
            padding: "15px 0px",
            color: "white",
          }}
        >
          <ListItemAvatar
            onClick={() => {
              history.push("/");
            }}
          > 
            <div
              style={{ marginLeft: "15px", fontSize: "20px", color: "#0a3d62" }}
              >
               <small style={{fontSize:"18px"}}>Welcome back,</small> <br />
             
              <b> 
                  SMART AUTH 0.1 
              </b>
            </div>
          </ListItemAvatar>{" "}
          &nbsp;&nbsp; 
          <NotificationsActiveOutlined
            onClick={() => { 
              // history.push("/notification");
            }}
            className="menu"
            style={{
              color: "#0a3d62",
              position: " absolute",
              right: "65px",
            }}
          />{" "} 
        </ListItem> 
      </div> 
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
