import api from "./helpers/wp_api.js"
import { ajax } from "./helpers/ajax.js";
import { Loader } from "./components/Loader.js";
import { Header } from "./components/Header.js";
import { Posts } from "./components/Posts.js";
import { Router } from "./components/Router.js";
import { infinite_scroll } from "./helpers/infinite_scroll.js";

export function App() {

    document.getElementById("root").innerHTML = `<h1>Bienvenidos a mi primer SPA</h1>`;
    const d = document,
    $root = d.getElementById("root");

    $root.innerHTML = null;
    $root.appendChild(Header());
    $root.appendChild(Posts());
    $root.appendChild(Loader());

    Router();


    infinite_scroll();
    // console.log(api);

    // ajax({
    //     url: api.POSTS,
    //     cbSuccess: (posts) => {
    //         console.log(posts);
    //     }
    // });

    // ajax({
    //     url: api.CATEGORIES,
    //     cbSuccess: (categories) => {
    //         console.log(categories);
    //     }
    // });
}