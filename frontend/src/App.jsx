import {ChakraProvider} from "@chakra-ui/react";
import {BrowserRouter, Route, Routes} from "react-router";
import Chat from "./pages/Chat";
import Contribute from "./pages/Contribute";
import Error404 from "./pages/errors/error404";
import Landing from "./pages/Landing";

import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
    components: {
        Button: {
            variants: {
                outline: {
                    borderWidth: "2px"
                },
            },
        }
    },
})

function App() {
    return (
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={Landing} />
                    <Route path="/chat" element={Chat} />
                    <Route path="/contribute" element={Contribute} />
                    <Route path="*" element={Error404} />
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    )
}

export default App
