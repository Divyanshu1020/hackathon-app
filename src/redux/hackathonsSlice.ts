import { hackathons } from "@/db/staticData";
import { Hackathon } from "@/types/staticData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface HackathonsState {
  hackathons: Hackathon[];
  filter: {
    level: string[];
    status: string[];
    search: string;
  };
}

const initialState: HackathonsState = {
  hackathons: hackathons,
  filter: {
    level: [],
    status: [],
    search: "",
  },
};

const hackathonsSlice = createSlice({
  name: "hackathons",
  initialState,
  reducers: {
    addHackathon: (state, action: PayloadAction<Hackathon>) => {
      state.hackathons.push(action.payload);
    },
    editHackathon: (state, action: PayloadAction<Hackathon>) => {
      state.hackathons = state.hackathons.map((hackathon) =>
        hackathon.id === action.payload.id ? action.payload : hackathon
      );
    },
    setFilter(
      state,
      action: PayloadAction<Partial<HackathonsState["filter"]>>
    ) {
      state.filter = { ...state.filter, ...action.payload };
    },
  },
});

export const { addHackathon, setFilter, editHackathon } =
  hackathonsSlice.actions;
export default hackathonsSlice.reducer;
