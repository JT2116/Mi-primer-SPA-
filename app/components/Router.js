import api from "../helpers/wp_api.js"
import { ajax } from "../helpers/ajax.js"
import { PostCard } from "./PostCard.js"
import { Post } from "./Post.js";
import { SearchCard } from "./SearchCard.js";
import { ContactForm } from "./ContactForm.js";

export async function Router() {
    PostCard

    const d = document,
    w = window,
    $posts = d.getElementById("posts");

    let {hash} = location

    // console.log(hash);

    $posts.innerHTML = null;

    if (!hash || hash ==="#/") {
        await ajax({
            url: api.POSTS,
            cbSuccess:(posts) => {
                // console.log(posts);
                let html = "";
                posts.forEach(posts => (html +=PostCard(posts)));
                $posts.innerHTML = html;
            }
        });                
    } else if(hash.includes("#/search")) {
        let query = localStorage.getItem("wpSearch");
        if (!query) {
            d.querySelector(".loader").style.display = "none";
            return false;
        }

        await ajax({
            url: `${api.SEARCH}/${query}`,
            cbSuccess:(search) => {
                console.log(search);

                let html = "";

                if (search.length === 0) {

                    html = `
                    <p class = "error">
                    No existen resultados de busqueda para el termino
                    <mark>${query}</mark>
                    </p>
                    `;
                    
                } else {
                    search.forEach((post) => (html += SearchCard(post)));
                }

                $posts.innerHTML=html;
            
            }
        }); 

    } else if (hash === "#/contacto") {
        $posts.appendChild(ContactForm());
    } else {
        
        await ajax({
            url: `${api.POST}/${localStorage.getItem("wpPostId")}`,
            cbSuccess:(post) => {
                // console.log(posts);
                let html = "";                
                $posts.innerHTML = Post(post);
            }
        }); 
    }

    d.querySelector(".loader").style.display = "none";

    
}