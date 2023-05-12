/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import './App.css'
import { DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'

const inicialItems =[
  {id:"1", content:"conteúdo 1"},
  {id:"2", content:"conteúdo 2"},
  {id:"3", content:"conteúdo 3"},
]
 

const inicialColums=[
  {
    name:"To do",
    id:"123",
    items:inicialItems,
  },
  {
    name:"doing",
    id:"456",
    items:[],
  }
  ,
  {
    name:"done",
    id:"789",
    items:[],
  },
]
function App() {
  const [columns, setColumns] = useState(inicialColums)
  
  const onDragEnd=(result:any)=>{
    console.log(result)
    //const columnItem=columns[0].items  //coluna 
    let draggedItem:any = {}          //dentro do droppable
    let destinnationColumnsItems:any = [] //dentro do DragDropContext
    let sourceColumnsItems:any=[]    //dentro do DragDropContext
    let destinationColumnId:any=0
    let sourceColumnId:any=0


    
    for(const i in columns){
      if(columns[i].id==result.source.droppableId){
        sourceColumnsItems=columns[i].items
        sourceColumnId=i
      } else if(columns[i].id==result.destination.droppableId){
        destinnationColumnsItems=columns[i].items
        destinationColumnId=i

      }
    }

    //destino do draggeble
    for (const i in sourceColumnsItems){
      if(sourceColumnsItems[i].id==result.draggableId){
        draggedItem=sourceColumnsItems[i]
      }
    }
    //excluir item arrastado
    const filterSourceColumnsItem=sourceColumnsItems.filter((item:any)=>(
      item.id != result.draggableId
    ))
    

    //verificação!! Se a coluna é a mesma ou não
     if(result.source.droppableId==result.destination.droppableId){
    
    //add em nova posição
    filterSourceColumnsItem.splice(result.destination.index, 0, draggedItem)
    console.log(filterSourceColumnsItem)

    const columnsCopy=JSON.parse(JSON.stringify(columns))
    columnsCopy[sourceColumnId].items=filterSourceColumnsItem
    setColumns(columnsCopy)

     } else{
      // add em nova coluna
      destinnationColumnsItems.splice(result.destination.index, 0, draggedItem)
      
      const columnsCopy=JSON.parse(JSON.stringify(columns))
      columnsCopy[sourceColumnId].items=filterSourceColumnsItem
      columnsCopy[destinationColumnId].items=destinnationColumnsItems
      setColumns(columnsCopy)
     }
    

  }
 

  return (
    <>
      <div style={{display:"flex", justifyContent:"space-around", gap:50}}>
       <DragDropContext onDragEnd={onDragEnd}>
        {columns.map((column)=>(
          
          <div style={{display:"flex", flexDirection:"column"}}>
          <h1>{column.name}</h1>
          <Droppable droppableId={column.id} key={column.id} >
            {(provided)=>( 
              <div ref={provided.innerRef} style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
              
              <div style={{backgroundColor:"lightblue", width:250, height:400,padding:10, }}>
              
              {column.items.map((item,i)=>(
                <Draggable draggableId={item.id} index={i} key={item.id}>
                  {(provided)=>(
                   <div 
                     {...provided.dragHandleProps} 
                     {...provided.draggableProps}
                     ref={provided.innerRef} 
                     style={{backgroundColor:"gray", height:40,marginBottom:10,...provided.draggableProps.style}}>
                     {item.content}
                   </div>
                  )}
               
                </Draggable>
              ))}
              {provided.placeholder}
              </div>
            </div>
            )}
          
          </Droppable>
          </div>
        ))}  
      </DragDropContext>
      </div>
    </>
  )
}

export default App
