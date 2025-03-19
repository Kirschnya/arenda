import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "store/store.ts";
import "../node_modules/video-react/dist/video-react.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter basename={"/arenda"}>
        <Provider store={store} >
            <App />
        </Provider>
    </BrowserRouter>
)
