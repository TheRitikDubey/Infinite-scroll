import React, {useEffect, useState} from 'react'
import axios from 'axios'

// type Props ={}
type IAPI ={
  url: string,
  title: string
}
const GetInfiniteImage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page,setPage] = useState(0)
  const getAllImagesFromAPI = async () => {
    try {
      // setLoading(true);
      const response = await axios.get(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`,{});
      console.log(response.data);
      const ans = response.data as []
      // setImages((images) => ({...images,ans}));
      // if(images.length>0){
      //   setImages({...images,ans})
      // }
      // else{
      //   setImages(ans)
      // }
      setImages(images => [...images, ...ans]);
      // setImages({...images,ans})
      setLoading(false);
    } catch (error) {
      console.log("__ERROR__", error);
    }
  }
  useEffect(()=>{
    getAllImagesFromAPI()
  },[])

  useEffect(()=>{
    const handleScroll = () => {
      
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setPage((page) => page+1);
        getAllImagesFromAPI(); // This will run when the scroll reach the bottom.
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  },[page])
  return (
    <div className="p-4">
      <div className="text-center p-2 text-3xl font-bold">getInfiniteImage</div>
      <div>
          {
            loading === true? 'loading...':(
              <div>
                {
                  images.length >0 && images.map((value:IAPI)=>(
                    <div className='flex mt-12 flex-col justify-center align-center items-center'>
                        <img src={value.url} width={400} alt="" />
                        <div className='text-xl font-semibold'>{value.title}</div>
                    </div>
                  ))
                }
              </div>
  )
          }
      </div>
    </div>
  )
}

export default GetInfiniteImage