import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { useSelector } from "react-redux";

export const ThemeContext = createContext();

// const INITIAL_STATE = { darkMode: true };

const themeReducer = (state, action) => {
  switch (action.type) {
    case "ThemeTOGGLE":
      return { ...state, darkMode: action.mode };
    default:
      return state;
  }
};

export const ThemeProvider = (props) => {
  const [state, dispatch] = useReducer(themeReducer, { darkMode: false });

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export function ThemeSave() {
  // From ReduxStore
  const themePref = useSelector(
    (state) => state?.accountPref?.accountPref?.Theme
  );
  // Value from state
  const { state, dispatch } = useContext(ThemeContext);
  const loading = useRef(false);
  const init = useRef(null);

  useEffect(() => {
    if (themePref === undefined) return;

    if (init.current === null) {
      dispatch({ type: "ThemeTOGGLE", mode: themePref });
      init.current = true;
    }
    if (themePref === state.darkMode) loading.current = false;
  });

  return null;
}
