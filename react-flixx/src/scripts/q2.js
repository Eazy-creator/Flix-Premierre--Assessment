function postForm(){
    var form = new FormData();
    form.append("films", films);
    axios.post('https://api.flixpremiere.com/v1/films/filter/now_showing?limit=10',form)
      .then((response) => {
        console.log('sss',response.data.data);
        if(response.data.data){
          setData(response.data.data);
        }
    });
  }
  
  useEffect(() => {
    const timer = setInterval(() => postForm, 5000);
    return () => clearInterval(timer);
  },[]);