import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  trending: [],
  movie: [],
  bookmark: JSON.parse(localStorage.getItem('bookmark')) !== null ? JSON.parse(localStorage.getItem('bookmark')) : [],
  tv: [],
  upcoming: [],
  searchValue: '',
  searchItems: [],
  isLoading: false
}



export const fetchTrending = createAsyncThunk(
  'movie/fetchTrending',
  async () =>{
    const res = await axios.get('https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=e7f57cd6bd9d6cb7a454a9f694dd3e94')
    return res.data.results
  }
)
export const fetchUpcoming = createAsyncThunk(
  'movie/fetchUpcoming',
  async () => {
    const res = await axios.get('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=e7f57cd6bd9d6cb7a454a9f694dd3e94')
    return res.data.results
  }
)
export const fetchMovies = createAsyncThunk(
  'movie/fetchMovies',
  async () =>{
    const res = await axios.get('https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=e7f57cd6bd9d6cb7a454a9f694dd3e94')
    return res.data.results
  }
)

export const fetchTv = createAsyncThunk(
  'movie/fetchTv',
  async () =>{
    const res = await axios.get('https://api.themoviedb.org/3/trending/tv/day?language=en-US&api_key=e7f57cd6bd9d6cb7a454a9f694dd3e94')
    return res.data.results
  }
)

export const fetchSearch = createAsyncThunk(
  'movie/fetchSearch',
  async (state)=> {
    const res = await axios.get("https://api.themoviedb.org/3/search/multi?query="+state+"&include_adult=false&language=en-US&page=1&api_key=e7f57cd6bd9d6cb7a454a9f694dd3e94")
    return res.data.results
  }
)

/*export const fetchRecommendation = createAsyncThunk(
  'movie/fetchRecommendation',
  async () => {
    const res = await axios.get('https://api.themoviedb.org/3/tv/series_id/recommendations?language=en-US&page=1&api_key=e7f57cd6bd9d6cb7a454a9f694dd3e94')
    return res
  }
)*/


export const MovieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setSearchValue: (state,action) => {
      state.searchValue = action.payload
    },
    addToBookmark: (state,action) => {


      const findIndex = state.bookmark.findIndex(itm => itm.id == action.payload.id)


      
      if (findIndex != -1) {
        state.bookmark.filter(item => item !== action.payload)
      } else {
        state.bookmark.push({...action.payload, active: true})
        state.movie = state.movie.map(obj => obj.id == action.payload.id ? {...obj, active: true}: {...obj})
        state.tv = state.tv.map(obj => obj.id == action.payload.id ? {...obj, active: true}: {...obj})
        state.searchItems = state.searchItems.map(obj => obj.id == action.payload.id ? {...obj, active: true}: {...obj})
      }
      localStorage.setItem('bookmark', JSON.stringify(state.bookmark))
    },
    removeBookmarkItem: (state,action) => {
      const removedItem = state.bookmark.filter(item => item.id !== action.payload)

      state.bookmark = removedItem
      state.trending = state.trending.map(obj => obj.id == action.payload? {...obj, active: false}: {...obj})
      state.movie = state.movie.map(obj => obj.id == action.payload ? {...obj, active: false}: {...obj})
      state.tv = state.tv.map(obj => obj.id == action.payload ? {...obj, active: false}: {...obj})
      state.searchItems = state.searchItems.map(obj => obj.id == action.payload ? {...obj, active: false}: {...obj})
      localStorage.setItem('bookmark', JSON.stringify(state.bookmark))
    },
  },
  extraReducers: (builder)=> {
    builder.addCase(fetchTrending.pending, (state,action) => {
      state.isLoading = true
    })
    builder.addCase(fetchTrending.fulfilled, (state,action) => {
      state.trending = action.payload.map(item => ({...item, active: false}))
      state.isLoading = false
    })


    builder.addCase(fetchMovies.pending, (state,action) => {
      state.isLoading = true
    })
    builder.addCase(fetchMovies.fulfilled, (state,action) => {
      state.movie = action.payload.map(item => ({...item, active: false}))
      state.isLoading = false
    })


    builder.addCase(fetchTv.pending, (state,action) => {
      state.isLoading = true
    })
    builder.addCase(fetchTv.fulfilled, (state,action) => {
      state.isLoading = false
      state.tv = action.payload.map(item => ({...item,active: false}))
    })


    builder.addCase(fetchSearch.fulfilled, (state,action) => {
      state.searchItems = action.payload
      state.searchItems = action.payload.map(item => ({...item, active: false}))
    })

    builder.addCase(fetchUpcoming.fulfilled, (state,action) => {
      console.log(action.payload);
      state.upcoming = action.payload
      state.upcoming = action.payload.map(item => ({...item, active: false}))
    })
  }
})

export const { setSearchValue, addToBookmark, removeBookmarkItem } = MovieSlice.actions

export default MovieSlice.reducer
