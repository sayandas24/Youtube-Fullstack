import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videoFile: "",
  videoThumbnail: ""
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    addVideo: (state, action) => {
      state.videoFile = action.payload;
    },
    addThumbnail: (state, action) => {
        state.videoThumbnail = action.payload
    }
  },
});

export const { addVideo, addThumbnail } = videoSlice.actions;
export default videoSlice.reducer;
