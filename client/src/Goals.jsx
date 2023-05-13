import { Container, Heading, Box, Button, HStack, Text, Input, VStack, Checkbox } from "@chakra-ui/react"
import { useEffect, useMemo } from "react";
import { v4 as uuid } from "uuid"
import axios from 'axios'
import { debounce } from 'lodash'
import { useSelector, useDispatch } from 'react-redux';
import { updateData, addSlot, removeSlot, updateSlot, addGoal, removeGoal, updateCheckboxValue, updateInputValue } from './reducers/goalSlots'

export const GoalsSection = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('/api');
            dispatch(updateData(response.data));
          } catch (error) {
            console.error('Error:', error);
          }
        };
        
        fetchData();
      }, [])
    const goalSlots = useSelector((state) => state.goalSlots)
    debouncedSendData('/api', goalSlots)
    
    return (
        <Box width="50%" backgroundColor="blue">
            <Box textAlign="left" p="4">
                <Heading>Goals</Heading>
            </Box>
            <AddGoalSlotButton />
            <VStack>
                <GoalSlots />
            </VStack>
        </Box>
    ) 
} 
const AddGoalSlotButton = () => {
    const dispatch = useDispatch()    
    return (
        <HStack>
            <Button onClick={() => dispatch(addSlot({id: uuid()}))} colorScheme="green">+</Button>
            <Text>ADD a slot (goal type)</Text>
        </HStack>
    )
}
const GoalSlots = () => {
    const goalSlots = useSelector((state) => state.goalSlots)
    return useMemo(() => (
        goalSlots.map((slot) => <GoalSlot key={slot.id} id={slot.id} />)
    ))
}
const GoalSlot = ({ id }) => {
    const dispatch = useDispatch()
    const slot = useSelector((state) => state.goalSlots.find((slot) => slot.id === id))
    const titleValue = slot ? slot.title : ''
    return (
        <Container border="solid yellow" p={4}>
            <HStack>
                <Input value={titleValue} onChange={(e) => dispatch(updateSlot({id, inputValue: e.target.value}))} placeholder="Title" backgroundColor="transparent" w="50%" />
                <Button onClick={() => dispatch(addGoal({id: id, goalId: uuid()}))}colorScheme="green">Add</Button>
                <Button onClick={() => dispatch(removeSlot({id: id}))} colorScheme="green">Remove</Button>
            </HStack>
            <Goals slotId={id} />
        </Container>
    )
}
const Goals = ({ slotId }) => {
    const goalSlots = useSelector((state) => state.goalSlots);
    const goals = goalSlots.find((slot) => slot.id === slotId)?.goals || [];

    return (
      <VStack p="4">
        {goals.map((goal) => (
          <Goal key={goal.id} slotId={slotId} id={goal.id} />
        ))}
      </VStack>
    );
}
const Goal = ({ slotId, id }) => {
    const dispatch = useDispatch()
    const slot = useSelector((state) => state.goalSlots.find((slot) => slot.id === slotId))
    const goal = slot.goals.find((goal) => goal.id === id)

    const checkboxValue = goal ? goal.checkboxValue : false
    const inputValue = goal ? goal.inputValue : ''
    return (
        <HStack>
            <Checkbox isChecked={checkboxValue} onChange={() => dispatch(updateCheckboxValue({id, slotId, checkboxValue}))}/>
            <Input value={inputValue} onChange={(e) => dispatch(updateInputValue({id, slotId, inputValue: e.target.value}))} placeholder="goal"/>
            <Button onClick={() => dispatch(removeGoal({id, slotId}))} colorScheme="green">-</Button>
        </HStack>
    )
}
const debouncedSendData = debounce(async (path, data) => {
    try {
        const response = await axios.post(path, data)
    }
    catch (error) {
        console.error('Error: ', error)
    }
}, 500)