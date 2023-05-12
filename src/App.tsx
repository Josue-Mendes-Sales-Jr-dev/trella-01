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
      if(columns[i]==result.source.droppableId){
        sourceColumnsItems=columns[i].items
        sourceColumnId=i
      } else if(columns[i]==result.destination.droppable){
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
    // excluir item em uma coluna
    const filterDestinationColumnsItem=destinnationColumnsItems.filter((item:any)=>(
      item.id != result.droppableId
    ))
    

    //verificação!! Se a coluna é a mesma ou não
     if(result.rource.droppableId==result.destination.droppableId){
    
    //add em nova posição
    filterSourceColumnsItem.splice(result.destination.index, 0, draggedItem)
    console.log(filterSourceColumnsItem)

    const columnsDrop=JSON.parse(JSON.stringify(columns))
    columnsDrop[sourceColumnId].items=filterSourceColumnsItem
    setColumns(columnsDrop)

     } else{
      // add em nova coluna
      filterDestinationColumnsItem.splice(result.destination.index, 0, destinnationColumnsItems)
      console.log(filterDestinationColumnsItem)

      const columnsDrop=JSON.parse(JSON.stringify(columns))
      columnsDrop[sourceColumnId].items=filterSourceColumnsItem
      columnsDrop[destinationColumnId].items=filterDestinationColumnsItem
      setColumns(columnsDrop)
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
