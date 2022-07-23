import { PostCard } from "../components/PostCard.js";
import { SearchCard } from "../components/SearchCard.js";
import { ajax } from "./ajax.js";
import api from "./wp_api.js"
export async function infinite_scroll() {
    const d = document,
    w = window;

    let query = localStorage.getItem("wpSearch"),
    apiURL,
    Components;//High Order Components

    w.addEventListener("scroll", async e =>{
        const {scrollTop,clientHeight,scrollHeight} = d.documentElement,
        {hash} = w.location;

        // console.log(scrollTop,clientHeight,scrollHeight,hash);
        if (scrollTop + clientHeight >= scrollHeight) {
            api.page++;

            if (!hash || hash === "#/") {
                apiURL = `${api.POSTS}&page=${api.page}`;
                Components = PostCard;                
            } else if(hash.includes("#/search")) {
                apiURL = `${api.SEARCH}${query}&page=${api.page}`;
                Components = SearchCard;
            }else {
                return false;
            }

            d.querySelector(".loader").style.display = "block";

            await ajax({
                url: apiURL,
                cbSuccess:(posts) =>{
                    let html = "";
                    posts.forEach((post)=>(html += Components(post)));
                    d.getElementById("posts").insertAdjacentHTML("beforeend",html);
                    d.querySelector(".loader").style.display = "none";
                }
            });
        }
            
    });
}