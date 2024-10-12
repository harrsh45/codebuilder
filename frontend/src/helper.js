export const ToggleEvent=(el,classname)=>{
    let elem=document.querySelector(el);
    elem.classList.toggle(classname)

}
export const removeClass=(el,classname)=>{
    let elem=document.querySelector(el);
    elem.classList.remove(classname)
}
export const api_base_url="http://localhost:3000";