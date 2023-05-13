import { createSlice } from '@reduxjs/toolkit'

const goalSlotsSlice = createSlice({
  name: 'goalSlots',
  initialState: [],
  reducers: {
    updateData: (state, action) => {
      return [...state, ...action.payload]
    },
    addSlot: (state, action) => {
      const { id } = action.payload
      return [...state, {id: id, title: '', goals: []}]
    },
    removeSlot: (state, action) => {
      const { id } = action.payload
      return state.filter((element) => element.id !== id)
    },
    updateSlot: (state, action) => {
      const { id, inputValue } = action.payload
      const slot = state.find((slot) => slot.id === id)
      if (slot) {
        slot.title = inputValue
      }
    },
    addGoal: (state, action) => {
      const { id, goalId } = action.payload
      return state.map((slot) => {
        if (slot.id === id) {
          return {
            ...slot,
            goals: [...slot.goals, {id: goalId, checkboxValue: false, inputValue: ''}],
          }
        }
        return slot
      })
    },
    removeGoal: (state, action) => {
      const { id, slotId } = action.payload
      return state.map((slot) => {
        if (slot.id === slotId) {
          return {
            ...slot,
            goals: slot.goals.filter((goal) => goal.id !== id),
          };
        }
        return slot
      });
    },
    updateCheckboxValue: (state, action) => {
      const { slotId, id, checkboxValue } = action.payload;
      const slot = state.find((slot) => slot.id === slotId);
      const goal = slot.goals.find((goal) => goal.id === id);
      goal.checkboxValue = !checkboxValue
    },
    updateInputValue: (state, action) => {
      const { slotId, id, inputValue } = action.payload;
      const slot = state.find((slot) => slot.id === slotId);
      if (slot) {
        const goal = slot.goals.find((goal) => goal.id === id);
        if (goal) {
          goal.inputValue = inputValue;
        }
      }
    },   
  },
})

export const { updateData, addSlot, removeSlot, updateSlot, addGoal, removeGoal, updateCheckboxValue, updateInputValue } = goalSlotsSlice.actions
export const goalSlotsReducer = goalSlotsSlice.reducer

  