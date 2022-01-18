import axios from "axios"
import { useEffect, useState } from "react"
import "./Ingredientes.css"

const Ingredientes = () => {
    const [info, setInfo] = useState([])
    const [seleccion, setSeleccion]= useState([])
    const[total, setTotal]= useState(0)
    
   
    const sumar =() =>{
        let sumarpedido =350
        seleccion.map(ing=>(
            setTotal(sumarpedido+=ing.precio)
        ))
    }
     
    
    const getInfo = async () => {
    const response = await axios.get("https://apipdtc.herokuapp.com/bulldog/ingredientes")
    setInfo(response.data)
    }

    const agregar=(ing)=>{
        setSeleccion([...seleccion, ing])
        
    }

    const eliminar= (ingre)=>{
        setSeleccion(seleccion.filter(ing=>ingre.id!==ing.id))
    }
    useEffect(() => {
        getInfo();
      }, []);

     useEffect(()=>{
    sumar()
}, [seleccion]);

    return ( 
    <div className="container">                
        {info.length>0?
                
            info.map(ingr=>(

    <div className="row " key={ingr.id}>
    <div className="col-sm-6 pb-1">
        <div className="card card1">
        <div className="card-body d-flex" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <img src={require(`../../assets/img/ingredientes/${ingr.imagen}.png`)}  alt={ingr.nombre}/>   
        <h5 className="card-title">{ingr.nombre}</h5>
        <h6 className="card-title">$ {ingr.precio}</h6>
            <button disabled ={seleccion.find(element=>element.id===ingr.id)?true:false} className="btn btn-outline-primary" onClick={()=> agregar({...ingr})}>agregar</button>
        </div>
        </div>
    </div>
    </div>   
            ))

            
              :
            <p>cargando...</p>
            }
            
            
                {seleccion.length>0?
                
                <>
                
                <p>Carne $350</p>
                {seleccion.map(agre => (
                    <div key={agre.id}>
                        <img src={require(`../../assets/img/ingredientes/${agre.imagen}.png`)}  /> 
                        {agre.nombre} ${agre.precio}
                        <button className="btn eliminar btn-danger" onClick={()=> eliminar(agre)}>x</button>     
                        
                    </div> 
                    )   )
                }
                total ${total}
                <div>
                <button className="btn btn-primary">pedir</button>
                </div>
                </>       
        :
        <p>selecciona tu hamburguesa</p> }
                   
    
    </div>)         
}  
export default Ingredientes;
