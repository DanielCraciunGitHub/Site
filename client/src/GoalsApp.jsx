import { GoalsSection } from './Goals'
import { Heading } from '@chakra-ui/react'

export const GoalsApp = () => (
    <>
      <Title text='Goals app'/>      
      <GoalsSection />
    </>
)
const Title = ({ text }) => {
  return (
    <Heading textAlign='center'>{text}</Heading>
  )
}