import {ExitToApp, FiberManualRecord, Home, Description} from "@material-ui/icons";
import React from "react";

export const doctorMenuItems = [
    {txt: "Home", icon:  <Home/>},
    {txt: "View Records",icon: <FiberManualRecord/>},
    {txt: "Log Out" , icon: <ExitToApp/>},
]


export const patientMenuItems = [
    {txt: "My Record", icon: <Description/>},
    {txt: "Log Out" , icon: <ExitToApp/>}
];

