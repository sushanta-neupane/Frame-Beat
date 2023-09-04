"use client"
import {FaYoutube,FaDownload, FaEarListen, FaEarDeaf} from "react-icons/fa6";
import axios from 'axios';
import {  useState, useEffect } from 'react';
import Image from "next/image";
const Container = () => {

   
    const [clickedItem, setClickedItem] = useState("");
    const [clickedItemLink, setClickedItemLink] = useState("");
    const [query,setQuery] = useState("")
    const [itemsList,setItemsList] = useState([])
    let status = true;
 
    const previewAudio = async(e) =>
    {
            if (e.target.closest('button').value === clickedItem )
            {
                status = !status 
                if (status)
                {
                    console.log("muted")
                    setClickedItemLink("")
                }
            }

            setClickedItem(e.target.closest('button').value)
            

     
        
    }
  
        useEffect(()=>{

            const fetchLink = async() =>
            {
    
                if (clickedItem)
                {
                    const {data} = await axios.get(`https://apibeatwave.vercel.app/api/${clickedItem}`)
                    setClickedItemLink(data.audioLink)
                }
            };
            fetchLink();
        },[clickedItem])


    
    const queryUpdate = (e) =>{
        setQuery(e)
    }

    const handleSubmit = async() =>{
        if(!query){
            alert("Please enter a valid youtube link")
        }
        else{
            
            const data = await axios.get(`https://apibeatwave.vercel.app/api?q=${query}&max=5`)
            const {items} = data['data']
            setItemsList(items)
            
        }
        
    }
    return (
        <div class="results flex flex-col items-center justify-center w-[100%]">
            <div>
                <input type="text" name="srch" value={query} onChange={(e)=>queryUpdate(e.target.value)} placeholder="Search..." id="query" />
                <button type="button" onClick={()=>handleSubmit()}>
                    <FaYoutube/>
                </button>
            </div>

          <div className="flex flex-col gap-5 justify-center ">

                {
                    itemsList.map((item,index) =>(
                        
                        
                    <section key={index} className="flex gap-5 opacity-30 hover:opacity-100" id="displayData">
                      
                        <div className="min-w-[8rem]">
                            <Image
                            height={70}
                            width={100}
                            src={item.snippet.thumbnails.default.url}
                            alt="thumnail"
                            />
                        </div>
                        <div className="flex flex-col flex-1">
                            <span className="text-lg " >{item.snippet.title}</span>
                            <span>{item.snippet.channelTitle}</span>
                        </div>
                        
                        <div >
                            {/* fafilevideo  wave zip*/}
                            <button><FaDownload/></button>
                            <button value={item.id.videoId} onClick={(e)=>previewAudio(e)}>
                         
                              <FaEarListen/>  
      
                            </button>
                        </div>
                    </section>
                    ))
                }
            </div>
            <div>
                <audio  src={clickedItemLink} autoPlay ></audio>
            </div>
        </div>
    )
}

export default Container