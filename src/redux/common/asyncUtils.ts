/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionReducerMapBuilder, AsyncThunk } from '@reduxjs/toolkit';

// Type for the thunk
type ThunkType<Returned, Arg> = AsyncThunk<Returned, Arg, { rejectValue: string }>;

// The generic function to handle async state (loading/error)
export const handleAsyncState = <S, Returned, Arg>(
  builder: ActionReducerMapBuilder<S>,
  thunk: ThunkType<Returned, Arg>
) => {
  builder
    .addCase(thunk.pending, (state) => {
      (state as any).isLoading = true; 
      (state as any).error = null;     
    })
    .addCase(thunk.fulfilled, (state) => {
      (state as any).isLoading = false; 
      (state as any).error = null;      
    })
    .addCase(thunk.rejected, (state, action) => {
      (state as any).isLoading = false; 
      (state as any).error = action.payload ?? 'An unknown error occurred'; 
    });
};
