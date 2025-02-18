import {Flex} from "@chakra-ui/react";
import {IconArrowBack, IconArrowLeft, IconArrowUp} from "@tabler/icons-react";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router";
import Button from "../components/Button";
import ChatBubble from "../components/ChatBubble";
import Loading from "../components/Loading";
import Main from "../components/Main";
import TextInput from "../components/TextInput";

const Chat = () => {
    const nav = useNavigate();
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const chatRef = useRef();
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8000/ws"); 

        ws.onopen = () => console.log("Connected to WebSocket");
        ws.onmessage = (event) => {
            setMessages((prev) => [...prev, { sender: "herta", text: event.data }]);
        };
        ws.onclose = () => console.log("WebSocket closed");

        setSocket(ws);
        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close();
            }
        };
    }, []);

    const sendMessage = async (ev) => {
        ev.preventDefault();
        if (!socket || socket.readyState !== WebSocket.OPEN) {
            console.error("WebSocket not connected");
            return;
        }
        let msgs = [
            ...messages,
            {sender: "user", text: userInput},
            {sender: "herta", text: <Loading size="sm" />}
        ];
        setMessages(msgs);
        socket.send(userInput);
        setUserInput("");
    }

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollIntoView({behavior: "smooth"});
        }
    }, [chatRef, messages]);

    return <Main p="4">
        <Button onClick={() => nav(-1)} p="0" position="fixed" top="2" left="2" variant="ghost" colorScheme="gray">
            <IconArrowLeft />
        </Button>
        <Flex direction="column" flex="1" pb="12" w="xl">
            {messages.map((msg, i) => <ChatBubble {...msg} key={i} />)}
            <Flex ref={chatRef} h="10" />
        </Flex>
        <Flex as="form" onSubmit={sendMessage} direction="row" width="xl" pt="2" pb="4" position="fixed" bottom="0"
              bg="var(--chakra-colors-chakra-body-bg)" justifyContent="center">
            <TextInput value={userInput} onChange={ev => setUserInput(ev.target.value)} borderColor="gray.500" autoFocus />
            <Button type="submit" borderRadius="1000" variant="outline" p="0" ml="2"><IconArrowUp /></Button>
        </Flex>
    </Main>;
};

export default <Chat />;
