import {Box, Flex, Image} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import Loading from "./Loading";

const ChatBubble = ({text, sender}) => {
    const [style, setStyle] = useState(null);
    useEffect(() => {
        setStyle(msgStyles(sender));
    }, [sender]);

	return (
        <Flex direction="row" alignItems="end" w="full">
            {(sender === "herta") && <Image src="avatars/herta.webp" w="6" h="6" borderRadius="12" mr="2" />}
            <Box mt="4" {...style}>{text}</Box>
        </Flex>
    )
};

const msgStyles = (sender) => {
    const sharedBubbleStyles = {
        "px": 3,
        "py": 2,
        "borderRadius": "1.5em",
        "maxW": "60%",
    }
    const systemStyles = {
        "fontStyle": "italic",
        "mx": "auto",
        "my": "4",
    }

    switch (sender) {
        case "system":
            return systemStyles
        case "error":
            return {
                ...systemStyles,
                "color": "purple.600",
            }
        case "user":
            return {
                ...sharedBubbleStyles,
                "ml": "auto",
                "bg": "gray.300",
                "borderBottomRightRadius": 0,
                "color": "#1a202c"
            }
        default: // bot sender
            return {
                ...sharedBubbleStyles,
                "mr": "auto",
                "bg": "purple.300",
                "borderBottomLeftRadius": 0,
            }
    }
}

export default ChatBubble;
