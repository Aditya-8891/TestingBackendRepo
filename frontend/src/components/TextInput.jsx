import {Input} from "@chakra-ui/react";

const TextInput = (props) => {
    return (
        <Input borderRadius="1000" borderWidth="2px" borderColor="gray.300" focusBorderColor="purple.400" {...props} />
    );
};

export default TextInput;
