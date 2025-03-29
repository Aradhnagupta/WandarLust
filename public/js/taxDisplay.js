let taxToggler=document.getElementById("flexSwitchCheckDefault");
taxToggler.addEventListener("click",()=>{
let taxInfo=document.getElementsByClassName("taxInfo")
for(info of taxInfo){
    if(info.style.display !="inline"){
        info.style.display="inline";
    }
    else{
        info.style.display="none";
    }
}
})