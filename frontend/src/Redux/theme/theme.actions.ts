export const toggleTheme = ()=>async(dispatch: (arg0: { type: string }) => void)=>{
    dispatch({type:"THEME_LOADING"})
    try{
        dispatch({type:"THEME_SUCCESS"})
    }catch(err){
        dispatch({type:"THEME_ERROR"})
    }
}