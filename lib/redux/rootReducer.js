/* Instruments */
import { authSlice } from './slices/auth/authSlice'
import { commentSlice } from './slices/comment/commentSlice'
import { voteSlice } from './slices/vote/voteSlice'

export const reducer = {
  auth: authSlice.reducer,
  comment: commentSlice.reducer,
  vote: voteSlice.reducer,
}
