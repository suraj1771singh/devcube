const theme = sessionStorage.getItem("theme");
const initialTheme = {
    theme_loading:false,
    theme_error:false,
    drk_theme:(theme==="dark")?true:false,
}
export const themeReducer = (state=initialTheme,actions: { type: string; })=>{
    const {type} = actions;
switch (type) {
    case "THEME_LOADING":{
        return{...state,theme_loading:true,theme_error:false}
    }
    case "THEME_SUCCESS":{
        let theme = sessionStorage.getItem("theme");
        let setTheme;
        if(theme==="dark"){
            sessionStorage.setItem("theme","light")
            setTheme=false;
        }else{
            sessionStorage.setItem("theme","dark")
            setTheme=true;
        }
        return{...state,theme_loading:false,theme_error:false,drk_theme:setTheme}
    }
    case "THEME_ERROR":{
        return{...state}
    }
    default:{
        return{...state}
    }
}
}