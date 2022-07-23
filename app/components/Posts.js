export function Posts() {
    const $posts = document.createElement("section");
    $posts.id = "posts";

    if (!location.hash.includes("#/search")) {
        $posts.classList.add("grid-fluid")        
    }
    
    return $posts;
}