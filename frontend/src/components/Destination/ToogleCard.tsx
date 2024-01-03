type ToogleCardProps = {
    title : string,
    img : string
}

function ToogleCard({ title ,img } : ToogleCardProps){
  return (
    <div className='flex flex-col gap-3 items-center w-28 border-2 border-border p-3 rounded-md cursor-pointer hover:bg-secondary'>
        <img className='w-14 h-14' src={img} alt={`${title} image`} />
        <h4 className='text-xl font-bold'>{title}</h4>
    </div>
  )
}

export default ToogleCard;