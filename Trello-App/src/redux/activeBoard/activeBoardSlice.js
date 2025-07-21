import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_ROOT } from '~/utils/constants'
import { mapOrder } from '~/utils/sorts'
import { generatePlaceholderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'

const initialState = {
  currentActiveBoard: null,
}
export const fetchBoardDetailApi = createAsyncThunk(
    'activeBoard/fetchBoardDetailApi',
    async(boardId)=>{
        const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
        return response.data
    }
) 

export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  reducers: {
    updateCurrentActiveBoard: (state, action) => {
        const newBoard = action.payload;
        state.currentActiveBoard = newBoard;
    }   
  },
  //extra reducer: xử lý các action async
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailApi.fulfilled,(state, action) => {
        //action payload ở đây là response.data trả về ở trên
        const board = action.payload;

         // Sắp xếp thứ tự các column luôn ở đây trước khi đưa dữ liệu xuống bên dưới các component con (video 71 đã giải thích lý do ở phần Fix bug quan trọng)
              board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')
        
              board.columns.forEach((column) => {
                // Khi F5 trang web thì cần xử lý vấn đề kéo thả vào một column rỗng (Nhớ lại video 37.2, code hiện tại là video 69)
                if (isEmpty(column.cards)) {
                  column.cards = [generatePlaceholderCard(column)]
                  column.cardOrderIds = [generatePlaceholderCard(column)._id]
                } else {
                  // Sắp xếp thứ tự các column luôn ở đây trước khi đưa dữ liệu xuống bên dưới các component con (video 71 đã giải thích lý do ở phần Fix bug quan trọng)
                  column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
                }
              })

              state.currentActiveBoard = board;
    })
  }
})
export const selectCurrentActiveBoard = (state) => {
    return state.activeBoard.currentActiveBoard;
}

// Action creators are generated for each case reducer function
export const { updateCurrentActiveBoard } = activeBoardSlice.actions


export const activeBoardReducer = activeBoardSlice.reducer