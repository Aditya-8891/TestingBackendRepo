import {Flex, FormControl, FormLabel, Select, Textarea} from "@chakra-ui/react";
import {IconArrowLeft, IconArrowRight} from "@tabler/icons-react";
import {useState} from "react";
import {Link} from "react-router";
import Button from "../components/Button";
import Main from "../components/Main";
import TextInput from "../components/TextInput";

const Contribute = () => {
    const [input1, setInput1] = useState("");
    const [select1, setSelect1] = useState("");
    const [selectOptions, setSelectOptions] = useState([
        {value: "option-1", text: "option 1"},
        {value: "option-2", text: "option 2"},
        {value: "option-3", text: "option 3"},
        {value: "option-4", text: "option 4"},
        {value: "option-5", text: "option 5"},
    ]);
    const [input2, setInput2] = useState("");
    const [input3, setInput3] = useState("");

    const handleInput1 = (ev) => {
        setInput1(ev.target.value);
    }

    const handleSelect = (ev) => {
        setSelect1(ev.target.value);

        setInput2(ev.target.value);
        setInput3(ev.target.value);
    }

    return (
        <Main gap="4">
            <Button onClick={() => nav(-1)} p="0" position="fixed" top="2" left="2" variant="ghost" colorScheme="gray">
                <IconArrowLeft />
            </Button>
            <Textarea
                placeholder="Type here"
                value={input1}
                onChange={handleInput1}
                borderWidth="2px"
                focusBorderColor="purple.400"
                borderColor="gray.300"
            />
            <Select
                placeholder="Select something"
                onChange={handleSelect}
                borderWidth="2px"
                focusBorderColor="purple.400"
                borderColor="gray.300"
            >
                {selectOptions.map(({value, text}, i) =>
                    <option value={value} key={i}>{text}</option>
                )}
            </Select>

            <FormControl display="flex" direction="row" alignItems="end">
                <FormLabel whiteSpace="nowrap">Input 2</FormLabel>
                <TextInput size="sm" value={input2} onChange={ev => setInput2(ev.target.value)} />
            </FormControl>
            <FormControl display="flex" direction="row">
                <FormLabel whiteSpace="nowrap">Input 3</FormLabel>
                <TextInput size="sm" value={input3} onChange={ev => setInput3(ev.target.value)} />
            </FormControl>


            <Button as={Link} to="/chat" p="2" ml="auto" mt="12">
                <IconArrowRight />
            </Button>
        </Main>
    );
};

export default <Contribute />;
