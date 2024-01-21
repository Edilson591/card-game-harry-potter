const requestApiHP = async () =>{
    const responseConverso = await fetch("https://raw.githubusercontent.com/Edilson591/card-game-harry-potter/main/harry-potter.json").then((res) => res.json())
    return await responseConverso
    // const mapName = await getJson.map(item => item.name)
  
};








