import { ChakraProvider, useColorMode,  HStack, Box, Button, Heading } from '@chakra-ui/react'
import { FaMoon, FaSun } from "react-icons/fa";
import { GoalsSection } from "./Goals"
import { Stats } from "./Stats"

function App() {
  return (
    <ChakraProvider>
      <Title text='Welcome Daniel'/>      
      <HStack>
          <GoalsSection />
          <Stats />
      </HStack>
      <DarkMode />
    </ChakraProvider>
  )
}
const DarkMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box position="fixed" bottom="4" right="4">
      <Button onClick={toggleColorMode}>
        {colorMode === 'light' ? <FaMoon /> : <FaSun />}
      </Button>
    </Box>
  )
}
const Title = ({ text }) => {
  return (
    <Heading textAlign='center'>{text}</Heading>
  )
}
export default App
