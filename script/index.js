function showloader(){
    document.getElementById("loader").classList.remove("hidden")
    document.getElementById("video_container").classList.add("hidden")
}

function hideloader(){
    document.getElementById("loader").classList.add("hidden")
    document.getElementById("video_container").classList.remove("hidden")
}




function removebutton(){
    const activebutton=document.getElementsByClassName("active");
    for(let btn of activebutton){
        btn.classList.remove("active");
    }
}



function LoadCatagories(){
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(res=>res.json())
    .then(data=>displaycatagories(data.categories))
}


const LoadVideos=(searchtext="")=>{
    showloader()
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchtext    }`)
    .then(res=>res.json())
    .then(data=>{
        removebutton();
        document.getElementById("btn-all").classList.add("active");
        displayvideos(data.videos)})
}

const LoadCatagoriesvideo=(id)=>{
    console.log(id)
    const url=`https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    console.log(url)
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
         removebutton();
        const buttondiv=document.getElementById(`btn-${id}`)
        buttondiv.classList.add("active");
        displayvideos(data.category)})

}
const videodetailsload=(video_id)=>{
    console.log(video_id);
    const url=`https://openapi.programming-hero.com/api/phero-tube/video/${video_id}`;
    console.log(url)
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayvideodetails(data.video
))

}
const displayvideodetails=(video)=>{
    document.getElementById("video_details").showModal();
    const detailscontainer=document.getElementById("details_container");
    detailscontainer.innerHTML=`
        <div class="card w-full h-full image-full shadow-sm">
  <figure>
    <img
      src=${video.thumbnail}
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Card Title</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
   
  </div>
</div>

    `;

}

function displaycatagories(categories){
    const catagories_container=document.getElementById("catagories_container");
    for(let cat of categories){

        const catagorydiv=document.createElement("div");
        catagorydiv.innerHTML=`
          <button onclick="LoadCatagoriesvideo(${cat.category_id})" id="btn-${cat.category_id}" class="bg-[#E2DFF4] py-1 px-2 hover:bg-[#FF1F3D] cursor-pointer">${cat.category}</button>
        `
        catagories_container.appendChild(catagorydiv);
    }
}






const displayvideos=(videos)=>{
    const video_container=document.getElementById("video_container");
    video_container.innerHTML="";
    if(videos.length==0){
        return video_container.innerHTML=` <div class="col-span-full flex flex-col justify-center items-center text-center">
            <div>
                <img src="/image/Icon.png">
            </div>
            <div >
                <h2 class="text-3xl text-bold">Oops!! Sorry, There is no content here</h2>
            </div>    
        </div> `
    }
    for(let video of videos){
        // console.log(video);
        const videocard=document.createElement("div")
        videocard.innerHTML=`
        <div class="card bg-base-100  shadow-sm">
                         <figure class="relative">
                             <img class="h-48 w-full object-cover" src=${video.thumbnail}/>
                             <span class="absolute bottom-2 right-2 text-white p-1 text-sm rounded-sm bg-black">3hr 56 min ago</span>
                            </figure>
                            
                            <div class="card-body">
                                    <div class="heading flex ">
                                        <div class="profile">
                                            <div class="avatar">
                                                <div class="w-12 rounded-full">
                                                     <img src=${video.authors[0].profile_picture} />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="title flex flex-col ml-3 flex-1 min-w-0">
                                            <div class="heading ">
                                                <h5 class="font-bold text-base ">${video.title}</h5>
                                            </div>
                                            <div class="flex gap-1 ">
                                                <div class="name text-sm text-[#17171770]"><p>${video.authors[0].profile_name}</p></div>
                                                
                                                <div class="icon">${video.authors[0].verified ==true ? `<img src="image/verified.png">`:``}</div>
                                            </div>
                                            <div class="view text-sm text-[#17171770]">91K views</div>
                                        </div>
                                       
                                        
                                    </div>
                                    <button onclick="videodetailsload('${video.video_id}')" class="btn btn-block">show details</button>
                                    
                          </div>
                    </div>
        `
        video_container.appendChild(videocard);
    }
    hideloader()
}

document.getElementById("search_input").addEventListener("keyup",(e)=>{
    const input=e.target.value;
    LoadVideos(input)
})

LoadCatagories();
