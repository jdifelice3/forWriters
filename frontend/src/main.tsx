import React from "react";
import ReactDOM from "react-dom/client";

import SuperTokensReact from "supertokens-auth-react";
import { SuperTokensConfig } from "./supertokensConfig";  

SuperTokensReact.init(SuperTokensConfig);  // <-- MUST RUN BEFORE APP

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
