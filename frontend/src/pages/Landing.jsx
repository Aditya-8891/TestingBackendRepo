import {Box, Flex, Heading, VStack} from "@chakra-ui/react";
import {Link} from "react-router";
import Button from "../components/Button";
import Main from "../components/Main";

const Landing = () => {
    return (
        <Main>
            <VStack >
                <Heading size="2xl">Simulated Universe</Heading>
                <Flex gap="2" w="100%">
                    <Button as={Link} to="/chat" flex="1" p="2">
                        Chat
                    </Button>
                    <Button as={Link} to="/contribute" flex="1" p="2">
                        Contribute
                    </Button>
                </Flex>
            </VStack>
        </Main>
    );
};

export default <Landing />;
