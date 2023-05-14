import { useColorMode, Box, Button, TabPanel, TabPanels, Tabs, Tab, TabList } from '@chakra-ui/react'
import { FaMoon, FaSun } from "react-icons/fa";
import { GoalsApp } from './GoalsApp';
import React from 'react';
function App() {
  return (
    <>
      <Tabs variant="line">
        <TabList>
          <Tab>Goals App</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <GoalsApp />
          </TabPanel>
        </TabPanels>
      </Tabs>      
      <DarkMode />
    </>
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
export default App
