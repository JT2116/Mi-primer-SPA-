export function Loader() {
    const $loader = document.createElement("img");

    $loader.src = "app/assets/loaders.svg";
    $loader.alt = "Cargando...";
    $loader.classList.add("loader");

    return $loader;
}